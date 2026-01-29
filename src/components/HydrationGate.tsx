"use client";

import { useEffect, useState } from 'react';

/**
 * Hook to track when the app has hydrated on the client side.
 * This ensures components don't render auth-dependent UI until Zustand has rehydrated from localStorage.
 */
export function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState(false);
  
  useEffect(() => {
    // We're on the client side
    // Small delay to ensure Zustand persist middleware has completed rehydration
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
 * Use this to wrap components that depend on auth state to prevent flash of wrong UI.
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
