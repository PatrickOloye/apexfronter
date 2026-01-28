import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, getRoleBasedRedirect } from '../store/AuthStore';

/**
 * Hook to strictly enforce that authenticated users are redirected away from auth pages.
 * Handles "Back" button navigation (BF Cache) using the `pageshow` event.
 */
export function useAuthRedirect() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        // 1. Regular Check
        const checkAuth = () => {
            // Check store state OR client-side cookie
            const hasCookie = typeof document !== 'undefined' && document.cookie.includes('is_authenticated=true');
            const isAuth = !!user || hasCookie;

            if (isAuth) {
                const role = user?.role ?? useAuthStore.getState().user?.role;
                const redirectPath = getRoleBasedRedirect(role);
                router.replace(redirectPath);
            }
        };

        checkAuth();

        // 2. BF Cache Check (Back Button)
        const handlePageShow = (event: PageTransitionEvent) => {
            if (event.persisted) {
                // Page was restored from cache, re-run auth check
                window.location.reload(); // Force reload to trigger middleware
            }
        };

        window.addEventListener('pageshow', handlePageShow);
        return () => {
            window.removeEventListener('pageshow', handlePageShow);
        };
    }, [user, router]);
}
