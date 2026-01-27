import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AuthService } from '../libs/server-actions/auth';

interface AuthStore {
  user: any | null;
  token: string | null;
  isLoading: boolean;
  isLoggingOut: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
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
        user: null,
        token: null,
        isLoading: false,
        isLoggingOut: false,
        error: null,

        login: async (email, password) => {
          set({ isLoading: true, error: null });
          try {
            const response = await AuthService.login(email, password);
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
          set({ isLoggingOut: true });
          try {
            AuthService.logout().catch((err) => {
              console.error('Logout API error:', err);
            });
          } catch (err) {
            // Log error but don't prevent logout
            console.error('Logout API error:', err);
          } finally {
            // Always clear local state and localStorage
            set({
              user: null,
              token: null,
              error: null,
              isLoggingOut: false,
              isLoading: false
            });
            // Clear the persisted storage
            if (typeof window !== 'undefined') {
              localStorage.removeItem('apex-auth');
            }
          }
        },

        fetchCurrentUser: async () => {
          set({ isLoading: true });
          try {
            const user = await AuthService.getCurrentUser();
            set({ user, error: null });
          } catch (err: any) {
            // Clear auth state on 401/403 OR 404 (User not found)
            if (
              (err instanceof Error && (err.message.includes('401') || err.message.includes('404'))) ||
              err?.status === 401 ||
              err?.status === 404
            ) {
              set({
                user: null,
                token: null,
                error: 'Session expired or user not found. Please login again.'
              });
              console.error('[AuthStore] fetchCurrentUser failed - clearing session. Error:', err);
              // Ensure localStorage is cleared
              if (typeof window !== 'undefined') {
                localStorage.removeItem('apex-auth');
                // Optional: Redirect if needed, but api.ts handles the main redirect
              }
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
        })
      }
    )
  )
);