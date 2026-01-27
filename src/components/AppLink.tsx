"use client";

import Link, { LinkProps } from 'next/link';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLoading } from './LoadingProvider';

type AppLinkProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  loadingMessage?: string;
};

const AppLink = ({ onClick, loadingMessage, href, ...props }: AppLinkProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { startLoading } = useLoading();

  const handleClick = (event: any) => {
    try {
      onClick?.(event);
    } catch (e) {
      // ignore caller errors
    }
    if (event?.defaultPrevented) return;

    if (typeof href === 'string') {
      if (href === pathname) return;
      // Start loading UI
      startLoading(loadingMessage);
      // Navigate programmatically to avoid issues when parent unmounts the link
      try {
        // Prevent default anchor navigation since we'll push
        event?.preventDefault?.();
        router.push(href);
      } catch (e) {
        // Fallback: let Link handle it
      }
      return;
    }

    // If href is not a string, fall back to default behavior
    startLoading(loadingMessage);
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
