import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthService } from '../libs/server-actions/auth';
import { setUnauthorizedHandler } from '@/libs/http/api';

export type AuthUser = Record<string, any>;

interface AuthStore {
  currentUser: AuthUser | null;
  isInitializing: boolean;
  isAuthenticated: boolean;
  isUnauthenticated: boolean;
  isLoading: boolean;
  isLoggingOut: boolean;
  error: string | null;
  initialize: () => Promise<AuthUser | null>;
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<AuthUser>;
  clearSession: (message?: string | null) => void;
  clearError: () => void;
}

export const normalizeRole = (role?: string): string | undefined => {
  if (!role) return undefined;
  return role.toString().trim().toUpperCase().replace(/[\s-]+/g, '_');
};

export const ROLE_ROUTES: Record<string, string> = {
  SYSTEM_ADMIN: '/system-admin',
  ADMIN: '/admin',
  USER: '/dashboard',
};

export const getRoleBasePath = (role?: string): string => {
  const normalized = normalizeRole(role);
  if (!normalized) return '/dashboard';
  return ROLE_ROUTES[normalized] || '/dashboard';
};

export const getRoleBasedRedirect = (role: string | undefined): string => {
  return getRoleBasePath(role);
};

const toAuthState = (currentUser: AuthUser | null) => ({
  currentUser,
  isAuthenticated: !!currentUser,
  isUnauthenticated: !currentUser,
});

let initializePromise: Promise<AuthUser | null> | null = null;

const redirectToSignin = () => {
  if (typeof window === 'undefined') return;

  const path = `${window.location.pathname}${window.location.search}`;
  const isProtectedRoute =
    window.location.pathname.startsWith('/dashboard') ||
    window.location.pathname.startsWith('/admin') ||
    window.location.pathname.startsWith('/system-admin');

  if (!isProtectedRoute) return;

  window.location.assign(
    `/signin?callbackUrl=${encodeURIComponent(path || '/dashboard')}`,
  );
};

const broadcastSessionEnded = () => {
  if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return;

  const channel = new BroadcastChannel('apex-session-events');
  channel.postMessage({ type: 'session-ended' });
  channel.close();
};

export const useAuthStore = create<AuthStore>()(
  devtools((set, get) => ({
    currentUser: null,
    isInitializing: true,
    isAuthenticated: false,
    isUnauthenticated: false,
    isLoading: false,
    isLoggingOut: false,
    error: null,

    initialize: async () => {
      if (initializePromise) return initializePromise;

      set({ isInitializing: true, error: null });
      initializePromise = get()
        .fetchCurrentUser()
        .then((user) => user)
        .catch(() => null)
        .finally(() => {
          initializePromise = null;
          set({ isInitializing: false });
        });

      return initializePromise;
    },

    login: async (email, password) => {
      set({ isLoading: true, error: null });
      try {
        await AuthService.login(email, password);
        const currentUser = await AuthService.getCurrentUser();
        set({
          ...toAuthState(currentUser),
          isInitializing: false,
          error: null,
        });
        return currentUser;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Login failed';
        set({
          ...toAuthState(null),
          isInitializing: false,
          error: message,
        });
        throw err;
      } finally {
        set({ isLoading: false });
      }
    },

    logout: async () => {
      set({ isLoggingOut: true });
      try {
        await AuthService.logout();
      } finally {
        set({
          ...toAuthState(null),
          error: null,
          isLoggingOut: false,
          isLoading: false,
          isInitializing: false,
        });
        broadcastSessionEnded();
      }
    },

    fetchCurrentUser: async () => {
      set({ isLoading: true, error: null });
      try {
        const currentUser = await AuthService.getCurrentUser();
        set({
          ...toAuthState(currentUser),
          error: null,
          isInitializing: false,
        });
        return currentUser;
      } catch (err: any) {
        if (err?.status === 401 || err?.status === 403 || err?.status === 404) {
          set({
            ...toAuthState(null),
            error: null,
            isInitializing: false,
          });
        } else {
          set({
            error:
              err instanceof Error ? err.message : 'Unable to verify session',
          });
        }
        throw err;
      } finally {
        set({ isLoading: false });
      }
    },

    clearSession: (message = null) => {
      set({
        ...toAuthState(null),
        error: message,
        isInitializing: false,
        isLoading: false,
        isLoggingOut: false,
      });
    },

    clearError: () => set({ error: null }),
  })),
);

setUnauthorizedHandler(() => {
  useAuthStore.getState().clearSession(null);
  broadcastSessionEnded();
  redirectToSignin();
});
