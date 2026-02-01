import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { BACKEND_URL } from '@/libs/server-actions/constants';
import { useAuthStore } from '@/store/AuthStore';
import { AuthService } from '@/libs/server-actions/auth';

const API_URL = BACKEND_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  },
});

const isDev = process.env.NODE_ENV !== 'production';
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;
const refreshSubscribers: Array<(token: string | null) => void> = [];

const subscribeTokenRefresh = (cb: (token: string | null) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string | null) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers.length = 0;
};

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // If Authorization header is already set (e.g. by AuthStore via defaults), respect it.
  // This bypasses the need to read from slow localStorage if we have the token in memory.
  // Check if header present on this request
  if (config.headers?.Authorization) {
    return config;
  }

  // Check axios defaults (set by store hydration/login)
  const defaultAuth = api.defaults.headers.common?.Authorization as string | undefined;
  if (defaultAuth) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = defaultAuth;
    return config;
  }

  // Check in-memory Zustand store directly (fast) before attempting localStorage.
  try {
    const memToken = useAuthStore.getState().token;
    if (memToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${memToken}`;
      return config;
    }
  } catch (e) {
    // defensive: if importing the store fails for some reason, continue to storage fallback
    // (do not throw)
  }

  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('apex-auth');
      if (raw) {
        const parsed = JSON.parse(raw);
        const token = parsed?.state?.token as string | undefined;
        if (token) {
          config.headers = config.headers ?? {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (e) {
      // Storage access failed - may be private browsing, quota exceeded, or iOS Safari issue
      if (isDev) {
        console.warn('[API] Failed to read auth from storage:', e);
      }
    }
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<any>) => {
    const status = error.response?.status;
    const url = error.config?.url;
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle Auth Failures (401 Unauthorized, or 404 Not Found on critical auth endpoints)
    if (status === 401 || (status === 404 && url?.includes('/auth/me'))) {

      // If we are already on an auth page, do nothing (to avoid loop)
      if (typeof window !== 'undefined') {
        // const isAuthPage = window.location.pathname === '/' || window.location.pathname.startsWith('/signin') || window.location.pathname.startsWith('/signup');
        // NOTE: We disabled auto-redirect to prevent loops. AuthStore will handle the state update.
        if (isDev) {
          console.warn(`[Auto-Logout] Auth error (${status}) detected from URL: ${url}. Suppressing auto-redirect to prevent loops.`);
        }

        /* 
        if (!isAuthPage) {
          if (status === 401 || (status === 404 && url?.includes('/auth/me'))) {
             // localStorage.removeItem('apex-auth');
             // window.location.href = '/signin?session_expired=true';
          }
        } 
        */
      }

      // Don't auto-redirect for login endpoint itself (status 401 usually means wrong password)
      if (!url?.includes('/auth/login') && !url?.includes('/auth/signin')) {
        // Attempt refresh once for protected requests
        if (!originalRequest?._retry && !url?.includes('/auth/refresh')) {
          originalRequest._retry = true;

          if (!isRefreshing) {
            isRefreshing = true;
            refreshPromise = AuthService.refresh()
              .then((data) => {
                const accessToken = data?.accessToken as string | undefined;
                if (accessToken) {
                  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                  useAuthStore.getState().setSession({ token: accessToken });
                  return accessToken;
                }
                return null;
              })
              .catch(() => null)
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            subscribeTokenRefresh((newToken) => {
              if (!newToken) {
                reject(error);
                return;
              }
              originalRequest.headers = originalRequest.headers ?? {};
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(api(originalRequest));
            });

            refreshPromise
              ?.then((token) => onRefreshed(token))
              .catch(() => onRefreshed(null));
          });
        }

        return Promise.reject(error);
      }
    }
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      'Request failed';

    // Attach status code to error for better handling
    const customError: any = new Error(message);
    customError.status = error.response?.status;
    customError.originalError = error;

    return Promise.reject(customError);
  }
);
