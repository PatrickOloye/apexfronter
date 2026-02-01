"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/AuthStore';
import LoadingIndicator from './LoadingIndicator';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore(state => state.token);
  const user = useAuthStore(state => state.user);
  const fetchCurrentUser = useAuthStore(state => state.fetchCurrentUser);
  
  const [checking, setChecking] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    
    const ensureAuth = async () => {
      // If we have a user object, we assume we are authenticated.
      // We rely on background API calls to trigger 401s if the session is actually dead.
      if (user) return;

      const hasCookie = typeof document !== 'undefined' && (
        document.cookie.includes('apex_token=') || document.cookie.includes('refresh_token=')
      );

      // If no token and no auth cookies, strictly no auth.
      if (!token && !hasCookie) {
        return; 
      }

      // If token exists but no user (e.g. fresh load or lost state), verify session.
      setChecking(true);
      setErrorState(null);

      // Create a timeout promise to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 5000)
      );

      try {
        // Race between fetch and timeout
        await Promise.race([
          fetchCurrentUser(),
          timeoutPromise
        ]);
        
        // After fetch, check store state again
        const currentState = useAuthStore.getState();
        if (!currentState.user && mounted) {
           // Failed to get user (likely 401 handled by store, which clears user)
           // If error in store is explicitly 401-related, we redirect.
           // If it's a generic error, we might want to show it.
           if (currentState.error?.includes('Session expired') || currentState.error?.includes('401')) {
              toast.error('Session expired. Please sign in again.');
              router.replace('/');
           } else if (currentState.error) {
             // System/Network error - Don't redirect, let user see error
             setErrorState(currentState.error || 'Failed to verify session');
           } else {
             // No error but no user? weird. Redirect.
             router.replace('/');
           }
        }
      } catch (err: any) {
         if (!mounted) return;
        if (process.env.NODE_ENV !== 'production') {
          console.error('Session check failed:', err);
        }
         
         // If timeout or network error, show UI instead of redirecting
         if (err.message === 'Connection timeout' || err.message === 'Network Error' || err.code === 'ERR_NETWORK') {
           setErrorState('Unable to connect to server. It might be restarting.');
         } else {
           // Unknown error - could be backend 500 or just random.
           // Better to show error than white screen.
           setErrorState('An unexpected error occurred. Please try again.');
         }
      } finally {
        if (mounted) setChecking(false);
      }
    };

    ensureAuth();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user, pathname]);

  // Show Loading
  if (checking) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <LoadingIndicator message="Verifying session..." />
      </div>
    );
  }

  // Show Error State (e.g. Server down) with Retry
  if (errorState && !user) {
     return (
       <div className="w-full h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
         <div className="mb-4 text-red-500 text-5xl">⚠️</div>
         <h2 className="text-xl font-bold text-gray-800 mb-2">Connection Issue</h2>
         <p className="text-gray-600 mb-6">{errorState}</p>
         <div className="flex gap-4">
           <button 
             onClick={() => window.location.reload()}
             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
           >
             Retry Connection
           </button>
           <button 
             onClick={() => router.replace('/')}
             className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
           >
             Go to Home
           </button>
         </div>
       </div>
     );
  }

  // If no token and no user after check, show a recovery UI instead of a blank page.
  // This addresses the case where a server-side cookie (middleware) routed the browser
  // to a protected route before the client fully hydrated (common on iOS/Safari).
  const hasAuthCookie = typeof document !== 'undefined' && (
    document.cookie.includes('apex_token=') || document.cookie.includes('refresh_token=')
  );

  if (!token && !user && !hasAuthCookie) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
        <div className="mb-4 text-yellow-500 text-5xl">⚠️</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Session unavailable</h2>
        <p className="text-gray-600 mb-6">Your session appears to be incomplete. This can happen when the app was redirected to a protected page before authentication finished loading.</p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              // Force a hard reload which will clear inconsistent client state and re-run middleware checks
              window.location.reload();
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Reload page
          </button>
          <button
            onClick={() => {
              // Navigate back to sign in to allow explicit re-authentication
              router.replace('/signin');
            }}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
