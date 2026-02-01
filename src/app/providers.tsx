"use client";

import React, { useEffect, useState, useRef } from 'react';
import { LoadingProvider } from '../components/LoadingProvider';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { BACKEND_URL } from '@/libs/server-actions/constants';
import { useAuthStore } from '@/store/AuthStore';
import { io } from 'socket.io-client';

function ClientSessionManager() {
  const router = useRouter();
  const logout = useAuthStore(state => state.logout);
  const token = useAuthStore(state => state.token);
  const currentUser = useAuthStore(state => state.user);
  const fetchCurrentUser = useAuthStore(state => state.fetchCurrentUser);
  const socketRef = useRef<any>(null);

  // Validate session on mount (handles DB resets/server restarts)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      });
    }

    // Only attempt to validate session if we have a persisted token or an auth cookie.
    // This avoids making an unauthenticated call too early (before zustand persist hydration)
    try {
      let hasLocal = false;
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('apex-auth');
        if (stored) {
          const parsed = JSON.parse(stored);
          hasLocal = !!parsed?.state?.token;
        }
      }
      const hasCookie = typeof window !== 'undefined' && document.cookie.split('; ').some(c => c.startsWith('apex_token=') || c.startsWith('refresh_token='));
      if (hasLocal || hasCookie) {
        fetchCurrentUser().catch(() => {
          // Error handling is done inside the store (clears user if 401/404)
        });
      }
    } catch (e) {
      // If accessing storage fails for any reason, skip validation to avoid accidental logout
    }
  }, [fetchCurrentUser]);

  const handleServerVersionChange = (newVersion: string, currentVersion: string | null) => {
    if (!currentVersion) {
      sessionStorage.setItem('apex-server-start', newVersion);
      return;
    }

    if (currentVersion !== newVersion) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`Server restart detected: ${currentVersion} -> ${newVersion}`);
      }
      sessionStorage.setItem('apex-server-start', newVersion);
      
      const path = window.location.pathname || '/';
      const isAuthRoute = path.startsWith('/signup') || path.startsWith('/signin') || path.includes('/auth');
      
      const lastReloadStr = sessionStorage.getItem('apex-last-reload');
      const lastReloadTime = lastReloadStr ? parseInt(lastReloadStr, 10) : 0;
      const now = Date.now();
      const timeSinceReload = now - lastReloadTime;
      const shouldAutoReload = timeSinceReload > 10000; // 10s cooldown

      if (isAuthRoute) {
         toast('Server updated — please refresh to ensure latest features.', { duration: 6000 });
      } else if (shouldAutoReload) {
         toast('Updating system...', { duration: 2000 });
         sessionStorage.setItem('apex-last-reload', now.toString());
         window.location.reload();
      }
    }
  };

  // Socket listener for immediate updates
  useEffect(() => {
    const base = BACKEND_URL.replace(/\/$/, '');
    const namespace = '/chat';
    const SOCKET_URL = `${base}${namespace}`;
    try {
      const socket = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
        withCredentials: true,
        reconnection: true,
        auth: {
          token: token || undefined,
        },
      });
      socketRef.current = socket;

      const onConnect = () => {
        // read server version cookie set by backend
        try {
          const cookie = document.cookie.split('; ').find(c => c.startsWith('apex_server_start='));
          const serverStart = cookie ? cookie.split('=')[1] : null;
          const current = sessionStorage.getItem('apex-server-start');
          if (!current && serverStart) sessionStorage.setItem('apex-server-start', serverStart);
          if (current && serverStart && current !== serverStart) {
            handleServerVersionChange(serverStart, current);
          }
        } catch (e) {
          // ignore
        }
      };

      const onServerRestart = (data: any) => {
        if (data?.timestamp) {
          const current = sessionStorage.getItem('apex-server-start');
          handleServerVersionChange(data.timestamp, current);
        }
      };

      const onDisconnect = (reason: any) => {
        if (process.env.NODE_ENV !== 'production') {
          console.log('Socket disconnected:', reason);
        }
        // Do not auto-logout on disconnect. Let Reconnection logic handle it.
        // potentially show a toast if it persists, but silent is better for short interruptions.
      };

      socket.on('connect', onConnect);
      socket.on('server_restart', onServerRestart);
      socket.on('disconnect', onDisconnect);

      return () => {
        try { socket.off('connect', onConnect); } catch {}
        try { socket.off('server_restart', onServerRestart); } catch {}
        try { socket.off('disconnect', onDisconnect); } catch {}
        try { socket.disconnect(); } catch {}
      };
    } catch (e) {
      // ignore socket errors
    }
  }, [logout, token]);
  

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense fallback={null}>
      <LoadingProvider>
        <ClientSessionManager />
        {children}
        <Toaster position="top-right" richColors closeButton />
      </LoadingProvider>
    </React.Suspense>
  );
}
