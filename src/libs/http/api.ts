import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { BACKEND_URL } from '@/libs/server-actions/constants';

const API_URL = BACKEND_URL;

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let unauthorizedHandler: (() => void) | null = null;
let refreshPromise: Promise<boolean> | null = null;

export const setUnauthorizedHandler = (handler: () => void) => {
  unauthorizedHandler = handler;
};

const notifyUnauthorized = () => {
  unauthorizedHandler?.();
};

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    Pragma: 'no-cache',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('apex_token');
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

const refreshSession = async (): Promise<boolean> => {
  if (!refreshPromise) {
    let refreshToken: string | null = null;
    if (typeof window !== 'undefined') {
      refreshToken = localStorage.getItem('refresh_token');
    }
    
    refreshPromise = axios
      .post(`${API_URL}/auth/refresh`, { refreshToken }, { withCredentials: true })
      .then((res) => {
        if (typeof window !== 'undefined') {
          const data = res.data?.data;
          if (data?.accessToken) {
            localStorage.setItem('apex_token', data.accessToken);
          }
          if (data?.refreshToken) {
            localStorage.setItem('refresh_token', data.refreshToken);
          }
        }
        return true;
      })
      .catch(() => false)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

const shouldAttemptRefresh = (
  status: number | undefined,
  request: RetriableRequestConfig | undefined,
) => {
  if (status !== 401 || !request || request._retry) return false;

  const url = request.url || '';
  return (
    !url.includes('/auth/signin') &&
    !url.includes('/auth/refresh') &&
    !url.includes('/auth/logout') &&
    !url.includes('/auth/forgot-password') &&
    !url.includes('/auth/reset-password')
  );
};

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<any>) => {
    const status = error.response?.status;
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (shouldAttemptRefresh(status, originalRequest)) {
      originalRequest!._retry = true;
      const refreshed = await refreshSession();

      if (refreshed) {
        return api(originalRequest!);
      }
    }

    if (status === 401) {
      notifyUnauthorized();
    }

    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      'Request failed';

    const customError: any = new Error(message);
    customError.status = status;
    customError.originalError = error;

    return Promise.reject(customError);
  },
);
