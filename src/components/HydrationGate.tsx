"use client";

import { useEffect, useState } from 'react';

/**
 * Hook to track when the app has hydrated on the client side.
 */
export function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasHydrated(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);
  
  return hasHydrated;
}

interface HydrationGateProps {
  children: React.ReactNode;
  skeleton?: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Gate component that prevents rendering until the app has hydrated.
 */
export function HydrationGate({ 
  children, 
  skeleton,
  fallback 
}: HydrationGateProps) {
  const hasHydrated = useHasHydrated();
  
  if (!hasHydrated) {
    return <>{skeleton || fallback || null}</>;
  }
  
  return <>{children}</>;
}

export default HydrationGate;
