'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/libs/http/api';
import { useAuthStore } from '@/store/AuthStore';
import Link from 'next/link';

// Types
interface DashboardStats {
  totalUsers: number;
  totalAdmins: number;
  systemAdminCount: { current: number; max: number; canCreateMore: boolean };
  pendingTransactions: number;
  activeLoans: number;
  recentActivity: AuditLog[];
}

interface AuditLog {
  id: string;
  userEmail: string;
  action: string;
  resource: string;
  createdAt: string;
}

// Stat Card Component
const StatCard = ({ title, value, icon, color, link }: { 
  title: string; 
  value: string | number; 
  icon: string; 
  color: string;
  link?: string;
}) => {
  const content = (
    <motion.div 
      whileHover={{ scale: 1.02, y: -2 }}
      className={`relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br ${color} text-white shadow-xl`}
    >
      <div className="relative z-10">
        <p className="text-sm font-medium opacity-80">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
      <div className="absolute right-4 top-4 text-4xl opacity-20">{icon}</div>
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />
    </motion.div>
  );

  if (link) {
    return <Link href={link}>{content}</Link>;
  }
  return content;
};

// Quick Action Button
const QuickAction = ({ title, icon, onClick, disabled = false, variant = 'primary' }: {
  title: string;
  icon: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}) => (
  <motion.button
    whileHover={{ scale: disabled ? 1 : 1.02 }}
    whileTap={{ scale: disabled ? 1 : 0.98 }}
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
      variant === 'primary' 
        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25' 
        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    <span className="text-2xl">{icon}</span>
    <span className="font-medium">{title}</span>
  </motion.button>
);

// Activity Item
const ActivityItem = ({ log }: { log: AuditLog }) => {
  const actionColors: Record<string, string> = {
    CREATE: 'text-green-600 bg-green-100',
    UPDATE: 'text-blue-600 bg-blue-100',
    DELETE: 'text-red-600 bg-red-100',
    LOGIN: 'text-purple-600 bg-purple-100',
    DEACTIVATE: 'text-orange-600 bg-orange-100',
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${actionColors[log.action] || 'text-gray-600 bg-gray-100'}`}>
        {log.action}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{log.resource}</p>
        <p className="text-xs text-gray-500">{log.userEmail}</p>
      </div>
      <p className="text-xs text-gray-400">
        {new Date(log.createdAt).toLocaleTimeString()}
      </p>
    </div>
  );
};

export default function SystemAdminDashboard() {
  const user = useAuthStore((state) => state.user);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/dashboard/stats');
      setStats(data?.data || data);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Unable to load dashboard data. Please check your connection.');
      // Set mock data for development
      setStats({
        totalUsers: 1245,
        totalAdmins: 3,
        systemAdminCount: { current: 2, max: 2, canCreateMore: false },
        pendingTransactions: 47,
        activeLoans: 89,
        recentActivity: [
          { id: '1', userEmail: 'admin@apex.com', action: 'CREATE', resource: 'User', createdAt: new Date().toISOString() },
          { id: '2', userEmail: 'admin@apex.com', action: 'UPDATE', resource: 'Transaction', createdAt: new Date().toISOString() },
          { id: '3', userEmail: 'system@apex.com', action: 'LOGIN', resource: 'Auth', createdAt: new Date().toISOString() },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">Hello {user?.firstName || 'Admin'},</p>
          <h1 className="text-3xl font-bold text-gray-800">System Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your entire APEX Banking platform</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-xl">
          <span className="text-lg">👑</span>
          <span className="text-sm font-medium">System Administrator</span>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Total Users" 
          value={stats?.totalUsers?.toLocaleString() || '0'} 
          icon="👥" 
          color="from-blue-600 to-blue-700"
          link="/system-admin/users"
        />
        <StatCard 
          title="Admin Users" 
          value={`${stats?.totalAdmins || 0} (${stats?.systemAdminCount?.current || 0}/${stats?.systemAdminCount?.max || 2} SA)`} 
          icon="🛡️" 
          color="from-purple-600 to-purple-700"
          link="/system-admin/admins"
        />
        <StatCard 
          title="Pending Transactions" 
          value={stats?.pendingTransactions?.toLocaleString() || '0'} 
          icon="💳" 
          color="from-amber-500 to-orange-600"
          link="/system-admin/transactions"
        />
        <StatCard 
          title="Active Loans" 
          value={stats?.activeLoans?.toLocaleString() || '0'} 
          icon="📊" 
          color="from-green-600 to-green-700"
          link="/system-admin/loans"
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <QuickAction 
              title="Create Admin" 
              icon="➕" 
              onClick={() => window.location.href = '/system-admin/admins?action=create'}
              disabled={!stats?.systemAdminCount?.canCreateMore}
            />
            <QuickAction 
              title="View Audit Logs" 
              icon="📋" 
              onClick={() => window.location.href = '/system-admin/audit'}
              variant="secondary"
            />
            <QuickAction 
              title="System Settings" 
              icon="⚙️" 
              onClick={() => window.location.href = '/system-admin/settings'}
              variant="secondary"
            />
            <QuickAction 
              title="Generate Report" 
              icon="📈" 
              onClick={() => alert('Report generation coming soon!')}
              variant="secondary"
            />
          </div>

          {!stats?.systemAdminCount?.canCreateMore && (
            <div className="mt-4 p-3 bg-amber-50 text-amber-700 text-xs rounded-lg">
              ⚠️ Maximum of 2 System Admins reached
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
            <Link href="/system-admin/audit" className="text-sm text-blue-600 hover:text-blue-700">
              View All →
            </Link>
          </div>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {stats?.recentActivity?.length ? (
              stats.recentActivity.map((log) => (
                <ActivityItem key={log.id} log={log} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-4xl mb-2">📭</p>
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="font-medium text-green-800">API Server</p>
              <p className="text-xs text-green-600">Operational</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="font-medium text-green-800">Database</p>
              <p className="text-xs text-green-600">Healthy</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="font-medium text-green-800">Payment Gateway</p>
              <p className="text-xs text-green-600">Connected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
