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
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        // 1. Regular Check
        const checkAuth = () => {
            // Only run on auth pages (signin, signup, forgot-password)
            if (typeof window !== 'undefined') {
                const pathname = window.location.pathname;
                const isAuthPage = pathname === '/signin' || pathname === '/signup' || pathname.startsWith('/forgot-password');
                
                if (!isAuthPage) return; // Don't redirect if not on auth page
            }
            
            // Check cookies (frontend auth flag or backend tokens)
            const hasCookie = typeof document !== 'undefined' && (
                document.cookie.includes('is_authenticated=true') ||
                document.cookie.includes('apex_token=') ||
                document.cookie.includes('refresh_token=')
            );
            
            const isAuth = !!user || !!token || hasCookie;

            if (isAuth) {
                const role = user?.role ?? useAuthStore.getState().user?.role;
                const redirectPath = getRoleBasedRedirect(role);
                
                // Use hard navigation for better compatibility with iOS Safari
                window.location.href = redirectPath;
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
    }, [user, token, router]);
}
