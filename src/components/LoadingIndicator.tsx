"use client";
import React from 'react';
import { BRAND } from '../config/brand';

interface LoadingIndicatorProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingIndicator = ({ message = 'Loading...', fullScreen = false }: LoadingIndicatorProps) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${fullScreen ? 'min-h-screen' : ''}`}>
      {/* APEX Text Loader */}
      <div className="flex items-center justify-center gap-1">
        {['A', 'P', 'E', 'X'].map((letter, index) => (
          <span
            key={index}
            className="text-4xl font-black tracking-tighter animate-pulse"
            style={{
              color: `var(--brand-primary, ${BRAND.primaryColor})`,
              animationDelay: `${index * 150}ms`,
              textShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            {letter}
          </span>
        ))}
      </div>
      
      {/* Optional Loading Bar or Message */}
      <div className="flex flex-col items-center gap-2">
         {/* Simple loading bar below text to give movement */}
        <div className="h-1 w-24 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 animate-loading-bar"
            style={{ width: '50%' }} // Animation will handle movement
          />
        </div>
        <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">{message}</span>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default LoadingIndicator;
