import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, getRoleBasedRedirect } from '../store/AuthStore';

export function useAuthRedirect() {
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.currentUser);
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (typeof window === 'undefined' || isInitializing || !currentUser) return;

    const pathname = window.location.pathname;
    const isAuthPage =
      pathname === '/signin' ||
      pathname === '/signup' ||
      pathname === '/forgot-password' ||
      pathname === '/reset-password';

    if (isAuthPage) {
      router.replace(getRoleBasedRedirect(currentUser.role));
    }
  }, [currentUser, isInitializing, router]);
}
