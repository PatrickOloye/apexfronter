"use client";

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoadingIndicator from './LoadingIndicator';

interface LoadingContextValue {
  isLoading: boolean;
  message: string;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);

export const useLoading = () => {
  const ctx = useContext(LoadingContext);
  if (!ctx) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return ctx;
};

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Loading...');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pendingRef = useRef(false);

  const startLoading = (nextMessage?: string) => {
    pendingRef.current = true;
    if (nextMessage) setMessage(nextMessage);
    setIsLoading(true);
  };

  const stopLoading = () => {
    pendingRef.current = false;
    setIsLoading(false);
    setMessage('Loading...');
  };

  const searchParamsString = searchParams?.toString();

  useEffect(() => {
    if (!pendingRef.current && !isLoading) return;
    
    // Navigation finish detection
    const timer = setTimeout(() => {
      stopLoading();
    }, 250);
    return () => clearTimeout(timer);
  }, [pathname, searchParamsString, isLoading]);

  // Safety timeout in case navigation fails or stays on same page
  useEffect(() => {
    if (isLoading) {
        const safety = setTimeout(() => {
            stopLoading();
        }, 8000); // 8 seconds max loading
        return () => clearTimeout(safety);
    }
  }, [isLoading]);

  const value = useMemo(() => ({ isLoading, message, startLoading, stopLoading }), [isLoading, message]);

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] bg-white/95 backdrop-blur-xl flex items-center justify-center">
          <LoadingIndicator message={message} />
        </div>
      )}
    </LoadingContext.Provider>
  );
};
