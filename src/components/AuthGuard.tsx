"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/AuthStore';
import { DashboardSkeleton } from './skeletons';
import { toast } from 'sonner';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = useAuthStore(state => state.token);
  const user = useAuthStore(state => state.user);
  const fetchCurrentUser = useAuthStore(state => state.fetchCurrentUser);
  
  const [hasInitialized, setHasInitialized] = useState(false);
  const [criticalError, setCriticalError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    
    // CRITICAL: Immediately redirect if user explicitly logs out (both user AND token are null)
    // This prevents flash of protected content after logout
    if (mounted && user === null && token === null) {
      // Only redirect if we're on a protected page (not public routes)
      if (typeof window !== 'undefined') {
        const pathname = window.location.pathname;
        const isProtectedRoute = pathname.startsWith('/dashboard') || 
                                 pathname.startsWith('/admin') ||
                                 pathname.startsWith('/profile') ||
                                 pathname.startsWith('/settings');
        
        if (isProtectedRoute) {
          router.replace('/');
        }
      }
      return;
    }
    
    const ensureAuth = async () => {
      // If we already have a user, session is valid
      if (user) {
        if (mounted) setHasInitialized(true);
        return;
      }

      // Check for auth cookies (only reliable auth indicator on first load)
      const hasCookie = typeof document !== 'undefined' && (
        document.cookie.includes('apex_token=') || document.cookie.includes('refresh_token=')
      );

      // No cookies and no token means user is genuinely not authenticated - middleware will redirect
      if (!token && !hasCookie) {
        if (mounted) setHasInitialized(true);
        return; 
      }

      // We have a cookie or token but no user object, so validate session silently with timeout
      try {
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Server connection timeout')), 5000)
        );

        await Promise.race([
          fetchCurrentUser(),
          timeoutPromise
        ]);

        // Success - user is now loaded
        if (mounted) setHasInitialized(true);
      } catch (err: any) {
        if (!mounted) return;

        // Check if it's a timeout or network error
        const isTimeout = err?.message?.includes('timeout');
        const isNetworkError = err?.message?.includes('Network') || err?.code === 'ERR_NETWORK';

        if (isTimeout || isNetworkError) {
          // Transient error - show toast notification but let skeleton persist
          // Backend might be restarting
          if (process.env.NODE_ENV !== 'production') {
            console.warn('AuthGuard connection timeout/network error, showing skeleton');
          }
          toast.error('Connection issue - retrying...', { duration: 3000 });
        } else {
          // Unknown error - log but still show skeleton
          if (process.env.NODE_ENV !== 'production') {
            console.error('Session validation error:', err?.message);
          }
        }

        // Mark initialized so skeleton can still render
        // Store will handle any 401 errors and redirect automatically
        if (mounted) setHasInitialized(true);
      }
    };

    ensureAuth();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user, router]);

  // While session is initializing, show skeleton instead of error modal
  if (!hasInitialized || (!user && token)) {
    return <DashboardSkeleton />;
  }

  // If there's a critical error with no user, still show skeleton and let store redirect
  // (Better UX than showing error modal during normal flows)
  if (criticalError && !user) {
    return <DashboardSkeleton />;
  }

  return <>{children}</>;
}
