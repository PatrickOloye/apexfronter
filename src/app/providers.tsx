"use client";

import React, { useEffect } from 'react';
import { LoadingProvider } from '../components/LoadingProvider';
import { Toaster } from 'sonner';
import { useAuthStore } from '@/store/AuthStore';

function AuthSessionBootstrap() {
  useEffect(() => {
    useAuthStore.getState().initialize();

    if (!('BroadcastChannel' in window)) return;

    const channel = new BroadcastChannel('apex-session-events');
    channel.onmessage = (event) => {
      if (event.data?.type !== 'session-ended') return;

      useAuthStore.getState().clearSession(null);

      const pathname = window.location.pathname;
      const isProtectedRoute =
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/admin') ||
        pathname.startsWith('/system-admin');

      if (isProtectedRoute) {
        window.location.assign(
          `/signin?callbackUrl=${encodeURIComponent(
            `${pathname}${window.location.search}`,
          )}`,
        );
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense fallback={null}>
      <LoadingProvider>
        <AuthSessionBootstrap />
        {children}
        <Toaster position="top-right" richColors closeButton />
      </LoadingProvider>
    </React.Suspense>
  );
}
