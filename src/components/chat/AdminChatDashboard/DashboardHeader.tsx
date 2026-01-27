'use client';

import React from 'react';
import { User as UserIcon } from 'lucide-react';
import styles from './ChatHeader.module.css'; // Reusing header styles or creating specific ones? 
// Let's use inline utility classes for now as per the "Fixed" admin view which uses Tailwind mostly
// But wait, the previous ChatHeader used CSS modules. 
// The plan says "Extract Header logic from admin/chats/page.tsx". 
// The admin/chats/page.tsx uses Tailwind. 
// I should stick to Tailwind for consistency with the page I'm extracting from, 
// or follow the pattern of other components in this dir which use CSS modules.
// The user "Fixed" alignment implies they want what's in admin/chats/page.tsx.
// So I will use Tailwind to replicate exactly what is there.

interface DashboardHeaderProps {
  userRole?: string;
  isConnected: boolean;
  onToggleConnection: () => void;
  stats: {
    open: number;
    locked: number;
    closed: number;
  } | null;
}

export function DashboardHeader({
  userRole,
  isConnected,
  onToggleConnection,
  stats,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-6 py-3 md:py-4 bg-white/80 backdrop-blur-md border-b border-slate-200 z-10 shrink-0 gap-3 md:gap-0">
      <div className="flex items-center justify-between w-full md:w-auto gap-4">
        <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">Support Chats</h1>
        {userRole?.toUpperCase() === 'SYSTEM_ADMIN' && (
          <button
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
              isConnected
                ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
                : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
            }`}
            onClick={onToggleConnection}
          >
            <span
              className={`w-2 h-2 rounded-full shadow-sm ${
                isConnected ? 'bg-emerald-500' : 'bg-red-500'
              }`}
            />
            {isConnected ? 'LIVE' : 'OFFLINE'}
          </button>
        )}
      </div>

      {stats && (
        <div className="flex w-full md:w-auto overflow-x-auto gap-2 p-1 bg-white border border-slate-200 rounded-xl md:rounded-full shadow-sm text-xs md:text-sm no-scrollbar">
          <span className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg md:rounded-full font-medium whitespace-nowrap">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            {stats.open} Open
          </span>
          <span className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg md:rounded-full font-medium whitespace-nowrap">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
            {stats.locked} Active
          </span>
          <span className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg md:rounded-full font-medium whitespace-nowrap">
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
            {stats.closed} Closed
          </span>
        </div>
      )}
    </div>
  );
}
