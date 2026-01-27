import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { BACKEND_URL } from '@/libs/server-actions/constants';

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

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('apex-auth');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        const token = parsed?.state?.token as string | undefined;
        if (token) {
          config.headers = config.headers ?? {
            deleteSession: async (chatId: string) => {
              const response = await api.delete(`/chat/sessions/${chatId}`);
              return response.data;
            },
          };
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch {
        // ignore invalid storage
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

    // Handle Auth Failures (401 Unauthorized, or 404 Not Found on critical auth endpoints)
    if (status === 401 || (status === 404 && url?.includes('/auth/me'))) {

      // If we are already on an auth page, do nothing (to avoid loop)
      if (typeof window !== 'undefined') {
        const isAuthPage = window.location.pathname === '/' || window.location.pathname.startsWith('/signin') || window.location.pathname.startsWith('/signup');

        if (!isAuthPage) {
          console.warn(`[Auto-Logout] Auth error (${status}) detected from URL: ${url}`);
          // Only auto-logout on 401 (invalid/expired token) or 404 on /auth/me (user deleted)
          // Do NOT logout on 403 (Forbidden) - that's a permission issue, not an auth issue.
          if (status === 401 || (status === 404 && url?.includes('/auth/me'))) {
            console.warn('Redirecting to signin due to session expiry. Status:', status, 'URL:', url);
            localStorage.removeItem('apex-auth');
            window.location.href = '/signin?session_expired=true';
          }
        } else {
          // Just plain clear if we are on auth page (e.g. login failed)
          // But don't redirect to avoid loop
          console.warn(`[Auth-Clear] Clearing session on auth page due to ${status} from ${url}`);
          if (status !== 401) { // If 401 on login, it's just wrong password, don't clear everything
            localStorage.removeItem('apex-auth');
          }
        }
      }

      // Don't auto-redirect for login endpoint itself (status 401 usually means wrong password)
      if (!url?.includes('/auth/login') && !url?.includes('/auth/signin')) {
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
