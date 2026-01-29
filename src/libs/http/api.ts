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
  // If Authorization header is already set (e.g. by AuthStore via defaults), respect it.
  // This bypasses the need to read from slow localStorage if we have the token in memory.
  if (config.headers?.Authorization) {
    return config;
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
      console.warn('[API] Failed to read auth from storage:', e);
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
        // const isAuthPage = window.location.pathname === '/' || window.location.pathname.startsWith('/signin') || window.location.pathname.startsWith('/signup');
        // NOTE: We disabled auto-redirect to prevent loops. AuthStore will handle the state update.
        console.warn(`[Auto-Logout] Auth error (${status}) detected from URL: ${url}. Suppressing auto-redirect to prevent loops.`);

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
