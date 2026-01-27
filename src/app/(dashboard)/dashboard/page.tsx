"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../../store/AuthStore';

import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  History, 
  AlertCircle, 
  CreditCard, 
  Landmark, 
  BarChart3, 
  User 
} from 'lucide-react';

const Dashboard = () => {
  const user = useAuthStore(state => state.user);
  const fetchCurrentUser = useAuthStore(state => state.fetchCurrentUser);
  const isLoading = useAuthStore(state => state.isLoading);
  
  useEffect(() => {
    // Always fetch latest user data to ensure balance is fresh
    fetchCurrentUser();
  }, [fetchCurrentUser]);
  
  // Calculate percentage for animation (based on balance percentage of 200)
  const maxValue = 200; // Maximum expected balance value for animation
  const percentage = user ? (user.clearedBalance / maxValue) * 100 : 0;

  const quickActions = [
    { 
      name: "Transactions", 
      path: "/dashboard/transactions",
      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
      description: "View & manage your transactions"
    },
    { 
      name: "Loans", 
      path: "/dashboard/loans",
      icon: <Landmark className="w-8 h-8 text-purple-600" />,
      description: "Apply for loans & view status"
    },
    { 
      name: "Forex", 
      path: "/dashboard/forex",
      icon: <BarChart3 className="w-8 h-8 text-emerald-600" />,
      description: "Currency exchange rates"
    },
    { 
      name: "Profile", 
      path: "/dashboard/profile",
      icon: <User className="w-8 h-8 text-indigo-600" />,
      description: "Manage your account details"
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative mb-4">
              <div className="text-5xl font-bold tracking-widest text-blue-600 animate-pulse">
                <span className="inline-block animate-bounce" style={{ animationDelay: '0ms' }}>A</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '100ms' }}>P</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '200ms' }}>E</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '300ms' }}>X</span>
              </div>
              <div className="absolute inset-0 text-5xl font-bold tracking-widest text-blue-600 blur-lg opacity-70 animate-pulse">
                APEX
              </div>
            </div>
            <p className="text-slate-500 mt-2">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (

    <div className="min-h-full pb-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Welcome back, <span className="text-blue-600">{user?.firstName || 'User'}!</span>
        </h1>
        <p className="text-slate-600">Here&apos;s what&apos;s happening with your account today.</p>
      </div>

      {/* Account Overview Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Account Overview</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            user?.isVerified 
              ? 'bg-emerald-100 text-emerald-700' 
              : 'bg-amber-100 text-amber-700'
          }`}>
            {user?.isVerified ? '✓ Verified' : '⏳ Pending Verification'}
          </span>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Balance with circular animation */}
          <div className="flex-shrink-0 flex items-center gap-6">
            <div className="relative w-32 h-32">
              {/* Background circle */}
              <div className="absolute inset-0 rounded-full border-8 border-slate-100"></div>
              
              {/* Animated circle */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="42%"
                  strokeWidth="8"
                  stroke="url(#gradient)"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray="263.89"
                  strokeDashoffset={263.89 - (Math.min(percentage, 100) / 100) * 263.89}
                  initial={{ strokeDashoffset: 263.89 }}
                  animate={{ strokeDashoffset: 263.89 - (Math.min(percentage, 100) / 100) * 263.89 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center text-blue-600">
                <Wallet className="w-10 h-10" />
              </div>
            </div>
            
            <div>
              <p className="text-sm text-slate-500 mb-1">Total Assets</p>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                ${((user?.clearedBalance || 0) + Math.max((user?.pendingCredits || 0) - (user?.pendingDebits || 0), 0) + (user?.openingBalance || 0)).toFixed(2)}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Account: {user?.accountNumber || 'N/A'}</p>
            </div>
          </div>
          
          {/* Right side - Detailed Balances */}
          <div className="flex-grow grid grid-cols-2 gap-4">
            {/* Cleared Balance */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-blue-600 font-medium whitespace-nowrap">Cleared Balance</p>
              </div>
              <p className="text-2xl font-bold text-blue-700">${user?.clearedBalance?.toFixed(2) || "0.00"}</p>
              <p className="text-xs text-blue-400 mt-1">Available to withdraw</p>
            </div>

            {/* Opening Balance */}
            <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
              <div className="flex items-center gap-2 mb-2">
                 <History className="w-5 h-5 text-emerald-600" />
                <p className="text-sm text-emerald-600 font-medium whitespace-nowrap">Opening Balance</p>
              </div>
              <p className="text-2xl font-bold text-emerald-700">${user?.openingBalance?.toFixed(2) || "0.00"}</p>
              <p className="text-xs text-emerald-600/60 mt-1">Locked until verification</p>
            </div>

            {/* Uncleared Balance */}
             <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <p className="text-sm text-amber-600 font-medium whitespace-nowrap">Uncleared / Pending</p>
              </div>
              <p className="text-2xl font-bold text-amber-700">${Math.max((user?.pendingCredits || 0) - (user?.pendingDebits || 0), 0).toFixed(2)}</p>
               <p className="text-xs text-amber-600/60 mt-1">Processing...</p>
            </div>
            
             {/* Total Debits (Keeping this as it was useful context, replacing Overdraft or filling 4th slot) */}
            <div className="p-4 bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-slate-600" />
                <p className="text-sm text-slate-600 font-medium whitespace-nowrap">Total Debits</p>
              </div>
              <p className="text-2xl font-bold text-slate-700">${user?.totalDebits?.toFixed(2) || "0.00"}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((item, index) => (
            <Link href={item.path} key={index}>
              <motion.div 
                className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 cursor-pointer group hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center h-full"
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="mb-3 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-slate-500">{item.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Account Info Footer */}
      <div className="mt-8 p-4 bg-slate-100 rounded-xl text-center">
        <p className="text-sm text-slate-500">
          Need help? Contact our support team at <a href="mailto:support@apexbank.com" className="text-blue-600 hover:underline">support@apexbank.com</a>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;