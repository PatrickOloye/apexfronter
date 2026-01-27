"use client";

import { Suspense, useEffect } from "react";
import Search from "../../../components/Search";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "../../../store/AuthStore";

function UsersContent() {
  const { user, fetchCurrentUser, isLoading } = useAuthStore();
  
  
  useEffect(() => {
    // Fetch user data if not already loaded
    if (!user) {
      fetchCurrentUser();
    }
  }, [user, fetchCurrentUser]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5d57c9]"></div>
    </div>;
  }

  if (!user) {
    return <div className="p-5 bg-[var(--bgSoft)] rounded-lg mt-5 text-center">
      <p className="text-lg">No user data available. Please log in.</p>
      <Link href="/login">
        <button className="mt-4 p-2.5 bg-[#5d57c9] text-[var(--text)] border-none rounded-md cursor-pointer">
          Go to Login
        </button>
      </Link>
    </div>;
  }

  return (
    <div className="bg-[var(--bgSoft)] p-5 rounded-lg mt-5">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Suspense fallback="Loading search...">
            <Search placeholder="Search..." />
          </Suspense>
          {user.role === 'ADMIN' && (
            <Link href="/dashboard/users/add">
              <button className="p-2.5 bg-[#5d57c9] text-[var(--text)] border-none rounded-md cursor-pointer">
                Add New User
              </button>
            </Link>
          )}
        </div>
      </div>
      
      {/* User Profile Summary */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-20 w-20 rounded-full bg-[#5d57c9] flex items-center justify-center text-white text-2xl font-bold">
            {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm mt-1">
              Account: <span className="font-medium">{user.accountNumber}</span>
              {user.isVerified ? 
                <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Verified</span> : 
                <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Not Verified</span>
              }
            </p>
          </div>
        </div>
      </div>

      {/* Account Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="p-6 bg-white rounded-lg shadow-sm border-l-4 border-green-500">
          <h3 className="text-sm text-gray-500 uppercase">Available Balance</h3>
          <p className="text-3xl font-bold">${user.clearedBalance.toFixed(2)}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm border-l-4 border-blue-500">
          <h3 className="text-sm text-gray-500 uppercase">Total Credits</h3>
          <p className="text-3xl font-bold">${user.totalCredits.toFixed(2)}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm border-l-4 border-red-500">
          <h3 className="text-sm text-gray-500 uppercase">Total Debits</h3>
          <p className="text-3xl font-bold">${user.totalDebits.toFixed(2)}</p>
        </div>
      </div>
      
      {/* Pending Transactions */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Pending Transactions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm text-gray-500 mb-2">Pending Credits</h3>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold">${user.pendingCredits.toFixed(2)}</p>
              {user.pendingCredits > 0 && (
                <span className="text-sm text-yellow-600 mb-1">Processing</span>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 mb-2">Pending Debits</h3>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold">${user.pendingDebits.toFixed(2)}</p>
              {user.pendingDebits > 0 && (
                <span className="text-sm text-yellow-600 mb-1">Processing</span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* User Details */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Account Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
          <div>
            <h3 className="text-sm text-gray-500">First Name</h3>
            <p>{user.firstName || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Last Name</h3>
            <p>{user.lastName || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Username</h3>
            <p>{user.username}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Email</h3>
            <p>{user.email}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Phone Number</h3>
            <p>{user.phoneNumber || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Country</h3>
            <p>{user.country || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Department</h3>
            <p>{user.department || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Account Status</h3>
            <p>
              {user.isVerified ? 
                <span className="text-green-600">Verified</span> : 
                <span className="text-red-600">Not Verified</span>
              }
            </p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Loan Viability</h3>
            <p>
              {user.loanViability ? 
                <span className="text-green-600">Eligible</span> : 
                <span className="text-red-600">Not Eligible</span>
              }
            </p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Overdraft</h3>
            <p>
              {user.overdraft ? 
                <span className="text-green-600">Enabled</span> : 
                <span className="text-red-600">Disabled</span>
              }
            </p>
          </div>
        </div>
      </div>
      
      {/* Account Actions */}
      <div className="flex flex-wrap gap-4">
        <Link href="/dashboard/transactions/new">
          <button className="py-2 px-4 bg-[#5d57c9] text-white rounded-md hover:bg-[#4a46a8] transition-colors">
            New Transaction
          </button>
        </Link>
        <Link href="/dashboard/profile/edit">
          <button className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
            Edit Profile
          </button>
        </Link>
        {!user.isVerified && (
          <Link href="/dashboard/verify">
            <button className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Verify Account
            </button>
          </Link>
        )}
        {user.role === 'ADMIN' && (
          <Link href="/dashboard/admin">
            <button className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Admin Panel
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default function UsersPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5d57c9]"></div>
      </div>
    }>
      <UsersContent />
    </Suspense>
  );
}