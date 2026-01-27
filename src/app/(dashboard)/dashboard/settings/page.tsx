"use client";
import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '../../../../store/AuthStore';

const SettingsPage = () => {
  const user = useAuthStore(state => state.user);
  
  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account settings and preferences</p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Coming Soon</h2>
          
          {/* Description */}
          <p className="text-slate-500 max-w-md mx-auto mb-6">
            We&apos;re working hard to bring you a comprehensive settings experience. 
            Stay tuned for account preferences, notification settings, security options, and more!
          </p>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-2xl mb-2 block">🔔</span>
              <p className="text-sm font-medium text-slate-700">Notifications</p>
              <p className="text-xs text-slate-500">Email & push settings</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-2xl mb-2 block">🔒</span>
              <p className="text-sm font-medium text-slate-700">Security</p>
              <p className="text-xs text-slate-500">2FA & login history</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-2xl mb-2 block">🎨</span>
              <p className="text-sm font-medium text-slate-700">Appearance</p>
              <p className="text-xs text-slate-500">Theme & display</p>
            </div>
          </div>

          {/* Back Button */}
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
