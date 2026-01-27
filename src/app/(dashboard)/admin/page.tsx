"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminService } from '../../../libs/server-actions/admin';

interface DashboardStats {
  totalUsers: number;
  blockedUsers: number;
  pendingTransactions: number;
  totalTransactions: number;
}

interface TransactionItem {
  id: string;
  amount: number;
  type: string;
  status: string;
  createdAt: string;
  currency?: string;
  User?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

const AdminPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<TransactionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersRes, blockedRes, pendingRes, totalTxRes, recentRes] = await Promise.all([
        AdminService.getAllUsers({ page: 1, limit: 1 }),
        AdminService.getAllUsers({ page: 1, limit: 1, status: 'BLOCKED' }),
        AdminService.getAllTransactions({ page: 1, limit: 1, status: 'PENDING' }),
        AdminService.getAllTransactions({ page: 1, limit: 1 }),
        AdminService.getAllTransactions({ page: 1, limit: 5 }),
      ]);

      const usersPagination = usersRes?.pagination;
      const blockedPagination = blockedRes?.pagination;
      const pendingPagination = pendingRes?.pagination;
      const totalTxPagination = totalTxRes?.pagination;

      setStats({
        totalUsers: usersPagination?.total ?? 0,
        blockedUsers: blockedPagination?.total ?? 0,
        pendingTransactions: pendingPagination?.total ?? 0,
        totalTransactions: totalTxPagination?.total ?? 0,
      });

      const recent = recentRes?.data ?? [];
      setRecentTransactions(recent);
    } catch (err: any) {
      setError(err.message || 'Failed to load admin dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Monitor users and transactions you manage</p>
        </div>
      </div>
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
          <p className="text-sm text-slate-500">Total Users</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">{stats?.totalUsers ?? 0}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
          <p className="text-sm text-slate-500">Blocked Users</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{stats?.blockedUsers ?? 0}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
          <p className="text-sm text-slate-500">Pending Transactions</p>
          <p className="text-3xl font-bold text-amber-600 mt-2">{stats?.pendingTransactions ?? 0}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
          <p className="text-sm text-slate-500">Total Transactions</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats?.totalTransactions ?? 0}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">Recent Transactions</h2>
          <Link href="/admin/transactions" className="text-sm text-blue-600 hover:text-blue-700">
            View all
          </Link>
        </div>
        {recentTransactions.length === 0 ? (
          <div className="text-center py-8 text-slate-500">No transactions found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">User</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {tx.User?.firstName} {tx.User?.lastName}
                      <div className="text-xs text-slate-400">{tx.User?.email}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{tx.type}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {tx.currency || 'USD'} {tx.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{tx.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
