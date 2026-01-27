"use client";

import Link, { LinkProps } from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useLoading } from './LoadingProvider';

type AppLinkProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  loadingMessage?: string;
};

const AppLink = ({ onClick, loadingMessage, href, ...props }: AppLinkProps) => {
  const pathname = usePathname();
  const { startLoading } = useLoading();

  return (
    <Link
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (typeof href === 'string' && href === pathname) return;
        startLoading(loadingMessage);
      }}
    />
  );
};

export default AppLink;
