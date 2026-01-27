"use client";
import React, { useEffect } from 'react';
import { useAuthStore } from '../../../../store/AuthStore';

const ProfilePage = () => {
  const user = useAuthStore(state => state.user);
  const fetchCurrentUser = useAuthStore(state => state.fetchCurrentUser);
  const isLoading = useAuthStore(state => state.isLoading);
  
  useEffect(() => {
    if (!user) {
      fetchCurrentUser();
    }
  }, [user, fetchCurrentUser]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-blue-200 rounded w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  const getStatusColor = (verified: boolean) => {
    return verified 
      ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
      : 'bg-amber-100 text-amber-700 border-amber-200';
  };

  const getRoleBadge = () => {
    switch (user?.role) {
      case 'SYSTEM_ADMIN':
        return { text: 'System Admin', color: 'bg-purple-100 text-purple-700 border-purple-200' };
      case 'ADMIN':
        return { text: 'Administrator', color: 'bg-blue-100 text-blue-700 border-blue-200' };
      default:
        return { text: 'User', color: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  const roleBadge = getRoleBadge();
  
  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>
        <p className="text-slate-500 mt-1">Manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            {/* Avatar */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {user?.firstName?.[0]?.toUpperCase()}{user?.lastName?.[0]?.toUpperCase()}
              </div>
              <h2 className="text-xl font-bold text-slate-800 mt-4">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-slate-500 text-sm">{user?.email}</p>
              
              {/* Role Badge */}
              <div className="mt-3 flex justify-center">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${roleBadge.color}`}>
                  {roleBadge.text}
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-600 text-sm">Account Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user?.isVerified || false)}`}>
                  {user?.isVerified ? '✓ Verified' : '⏳ Pending'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-600 text-sm">Overdraft</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user?.overdraft 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {user?.overdraft ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Account Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider">First Name</label>
                  <p className="text-slate-800 font-medium mt-1">{user?.firstName || '-'}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider">Last Name</label>
                  <p className="text-slate-800 font-medium mt-1">{user?.lastName || '-'}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider">Email Address</label>
                  <p className="text-slate-800 font-medium mt-1">{user?.email || '-'}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider">Username</label>
                  <p className="text-slate-800 font-medium mt-1 font-mono">{user?.username || '-'}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider">Account Number</label>
                  <p className="text-slate-800 font-medium mt-1 font-mono text-lg">{user?.accountNumber || '-'}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider">Phone Number</label>
                  <p className="text-slate-800 font-medium mt-1">{user?.phoneNumber || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider">Country</label>
                  <p className="text-slate-800 font-medium mt-1">{user?.country || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider">Referral Code</label>
                  <p className="text-slate-800 font-medium mt-1 font-mono bg-slate-50 px-3 py-1 rounded inline-block">
                    {user?.referralCode || '-'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 mt-6">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Financial Summary</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <p className="text-xs text-blue-600 font-medium mb-1">Cleared Balance</p>
                <p className="text-2xl font-bold text-blue-700">${user?.clearedBalance?.toFixed(2) || '0.00'}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                <p className="text-xs text-emerald-600 font-medium mb-1">Total Credits</p>
                <p className="text-2xl font-bold text-emerald-700">${user?.totalCredits?.toFixed(2) || '0.00'}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-100">
                <p className="text-xs text-red-600 font-medium mb-1">Total Debits</p>
                <p className="text-2xl font-bold text-red-700">${user?.totalDebits?.toFixed(2) || '0.00'}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                <p className="text-xs text-purple-600 font-medium mb-1">Opening Balance</p>
                <p className="text-2xl font-bold text-purple-700">${user?.openingBalance?.toFixed(2) || '0.00'}</p>
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 mt-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Account Security</h3>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-medium text-slate-800">Password</p>
                <p className="text-sm text-slate-500">Last changed: Unknown</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
