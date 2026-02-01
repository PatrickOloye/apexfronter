import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AuthService } from '../libs/server-actions/auth';
import { api } from '../libs/http/api';

interface AuthStore {
  user: any | null;
  token: string | null;
  isLoading: boolean;
  isLoggingOut: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  setSession: (data: { token?: string; user?: any | null }) => void;
  clearError: () => void;
}

export const normalizeRole = (role?: string): string | undefined => {
  if (!role) return undefined;
  return role.toString().trim().toUpperCase().replace(/[\s-]+/g, '_');
};

// Role-based redirect routes
export const ROLE_ROUTES: Record<string, string> = {
  SYSTEM_ADMIN: '/system-admin',
  ADMIN: '/admin',
  USER: '/dashboard'
};

export const getRoleBasePath = (role?: string): string => {
  const normalized = normalizeRole(role);
  if (!normalized) return '/dashboard';
  return ROLE_ROUTES[normalized] || '/dashboard';
};

// Helper to get redirect URL based on user role
export const getRoleBasedRedirect = (role: string | undefined): string => {
  return getRoleBasePath(role);
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        setSession: ({ token, user }) => {
          if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          }
          set((state) => ({
            token: token ?? state.token,
            user: typeof user !== 'undefined' ? user : state.user,
          }));
        },
        user: null,
        token: null,
        isLoading: false,
        isLoggingOut: false,
        error: null,

        login: async (email, password) => {
          set({ isLoading: true, error: null });
          try {
            const response = await AuthService.login(email, password);

            // Set client-side cookie for middleware
            if (typeof document !== 'undefined') {
              document.cookie = `is_authenticated=true; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
            }

            // Set global axios header for immediate use (bypasses localStorage race condition)
            if (response?.accessToken) {
              api.defaults.headers.common['Authorization'] = `Bearer ${response.accessToken}`;
            }

            set({
              user: response?.user ?? null,
              token: response?.accessToken ?? null,
              error: null
            });
            return response;
          } catch (err) {
            set({
              error: err instanceof Error ? err.message : 'Login failed',
              user: null,
              token: null
            });
            throw err;
          } finally {
            set({ isLoading: false });
          }
        },

        logout: async () => {
          // Set a transient logging-out flag
          set({ isLoggingOut: true });

          // Clear client-side cookie
          if (typeof document !== 'undefined') {
            document.cookie = 'is_authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          }

          // Immediately clear client state and persisted storage for snappy UX
          set({
            user: null,
            token: null,
            error: null,
            isLoggingOut: false,
            isLoading: false,
          });

          if (typeof window !== 'undefined') {
            try {
              localStorage.removeItem('apex-auth');
              // Clear chat session data on logout
              sessionStorage.removeItem('chat-session-id');
              sessionStorage.removeItem('chat-user-info');
              sessionStorage.removeItem('chat-draft');
            } catch (e) {
              // ignore
            }
          }

          // Fire-and-forget server logout to invalidate refresh token(s).
          // Do not await so the UI can redirect immediately.
          try {
            AuthService.logout().catch((err) => {
              console.error('Logout API error (background):', err);
            });
          } catch (err) {
            console.error('Logout API call failed (background):', err);
          }
        },

        fetchCurrentUser: async () => {
          set({ isLoading: true });
          try {
            const user = await AuthService.getCurrentUser();

            // Ensure cookie is synced if we successfully fetched user
            if (typeof document !== 'undefined') {
              document.cookie = `is_authenticated=true; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
            }

            set({ user, error: null });
          } catch (err: any) {
            // Clear auth state on 401/403 OR 404 (User not found)
            if (
              (err instanceof Error && (err.message.includes('401') || err.message.includes('404'))) ||
              err?.status === 401 ||
              err?.status === 404
            ) {

              // CRITICAL FIX: Do NOT wipe the session immediately on a single 401.
              // This prevents race conditions (e.g. one failed notification request) from killing the whole app.
              // Instead, we set the error state and let the UI handle it (e.g. show "Session Expired" badge).

              /* 
              if (typeof document !== 'undefined') {
                document.cookie = 'is_authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
              }
              */

              if (process.env.NODE_ENV !== 'production') {
                console.warn('[AuthStore] fetchCurrentUser 401/404 encountered. Keeping session state for resilience. Error:', err);
              }

              // Also log current persisted storage token for debugging (best-effort)
              try {
                const stored = typeof window !== 'undefined' ? localStorage.getItem('apex-auth') : null;
                if (process.env.NODE_ENV !== 'production') {
                  console.log('[AuthStore] fetchCurrentUser -> localStorage apex-auth:', stored);
                }
              } catch (e) {
                if (process.env.NODE_ENV !== 'production') {
                  console.warn('[AuthStore] fetchCurrentUser -> failed to read localStorage', e);
                }
              }

              set({
                // user: null,  <-- ENABLE logic to keep user in store
                // token: null, <-- ENABLE logic to keep token in store
                error: 'Session expired. Please refresh or login again.'
              });

              if (process.env.NODE_ENV !== 'production') {
                console.warn('[AuthStore] fetchCurrentUser handled 401/404. State preserved to avoid auto-wipe.');
              }

              /*
              // Ensure localStorage is cleared
              if (typeof window !== 'undefined') {
                localStorage.removeItem('apex-auth');
              }
              */
            } else {
              set({ error: err instanceof Error ? err.message : 'An unknown error occurred' });
            }
          } finally {
            set({ isLoading: false });
          }
        },

        clearError: () => set({ error: null })
      }),
      {
        name: 'apex-auth',
        partialize: (state) => ({
          user: state.user,
          token: state.token
        }),
        onRehydrateStorage: () => (state) => {
          if (state?.token) {
            // Immediately set the default header upon hydration.
            // This ensures api.ts doesn't rely solely on localStorage read.
            api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
            // Also sync cookie just in case
            if (typeof document !== 'undefined') {
              document.cookie = `is_authenticated=true; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
            }
            // Debug logging for hydration
            try {
              if (process.env.NODE_ENV !== 'production') {
                console.log('[AuthStore] Rehydrated token present; setting axios default Authorization. tokenExists=true');
              }
            } catch (e) { }
          }
        }
      }
    )
  )
);