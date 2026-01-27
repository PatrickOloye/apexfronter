'use client';

import React from 'react';
import { useAuthStore } from '@/store/AuthStore';
import { usePathname } from 'next/navigation';
import { ChatWidget } from './ChatWidget';

export function UserChatWidget() {
  const { user } = useAuthStore();
  const pathname = usePathname();

  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SYSTEM_ADMIN';
  const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/system-admin');

  if (isAdmin || isAdminRoute) {
    return null;
  }

  return <ChatWidget />;
}
