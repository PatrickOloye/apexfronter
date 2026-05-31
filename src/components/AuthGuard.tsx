"use client";

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/AuthStore';
import { DashboardSkeleton } from './skeletons';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useAuthStore((state) => state.currentUser);
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (isInitializing || currentUser) return;

    router.replace(
      `/signin?callbackUrl=${encodeURIComponent(pathname || '/dashboard')}`,
    );
  }, [currentUser, isInitializing, pathname, router]);

  if (isInitializing || !currentUser) {
    return <DashboardSkeleton />;
  }

  return <>{children}</>;
}
