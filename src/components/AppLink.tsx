"use client";

import Link, { LinkProps } from 'next/link';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLoading } from './LoadingProvider';
import { useAuthStore } from '@/store/AuthStore';

type AppLinkProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  loadingMessage?: string;
};

const AppLink = ({ onClick, loadingMessage, href, ...props }: AppLinkProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { startLoading } = useLoading();

  const handleClick = (event: any) => {
    // Log initial click context
    try {
      const mem = useAuthStore.getState();
      // console.log('[AppLink] click', { href, pathname, tokenPresent: !!mem?.token, time: new Date().toISOString() });
    } catch (e) {
      // console.log('[AppLink] click - failed to read store', { href, pathname });
    }

    // Prevent default anchor navigation immediately so state changes in onClick
    // (for example, closing a dropdown) cannot interrupt SPA navigation.
    try {
      event?.preventDefault?.();
    } catch (e) {
      // ignore
    }

    if (typeof href === 'string') {
      if (href === pathname) {
        // Still call the provided onClick to allow parent to close menus
        try { onClick?.(event); } catch (e) {}
        return;
      }

      // Start loading UI
      startLoading(loadingMessage);

      // Navigate first, then call the caller onClick which may unmount this link
      try {
        // console.log('[AppLink] router.push start', { href, time: new Date().toISOString() });
        // router.push returns a promise - await it to capture completion
        Promise.resolve(router.push(href as any)).then(() => {
          // console.log('[AppLink] router.push finished', { href, time: new Date().toISOString() });
        }).catch((err) => {
          console.error('[AppLink] router.push error', err);
        });
      } catch (e) {
        console.error('[AppLink] router.push threw', e);
        // Fallback: let Link handle it
      }

      try {
        // console.log('[AppLink] calling caller onClick', { href, time: new Date().toISOString() });
        onClick?.(event);
      } catch (e) {
        // ignore caller errors
      }

      return;
    }

    // If href is not a string, fall back to default behavior but still call onClick
    startLoading(loadingMessage);
    try { onClick?.(event); } catch (e) {}
  };

  return (
    <Link
      href={href}
      {...props}
      onClick={handleClick}
    />
  );
};

export default AppLink;
