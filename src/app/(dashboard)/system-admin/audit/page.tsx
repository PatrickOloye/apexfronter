'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { api } from '@/libs/http/api';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/AuthStore';

interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  userRole: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ChatDbStats {
  sessions: number;
  messages: number;
  locks: number;
}

const ACTION_COLORS: Record<string, { bg: string; text: string }> = {
  CREATE: { bg: 'bg-green-100', text: 'text-green-700' },
  UPDATE: { bg: 'bg-blue-100', text: 'text-blue-700' },
  DELETE: { bg: 'bg-red-100', text: 'text-red-700' },
  LOGIN: { bg: 'bg-purple-100', text: 'text-purple-700' },
  LOGOUT: { bg: 'bg-gray-100', text: 'text-gray-700' },
  DEACTIVATE: { bg: 'bg-orange-100', text: 'text-orange-700' },
  REACTIVATE: { bg: 'bg-teal-100', text: 'text-teal-700' },
};

export default function AuditLogs() {
  const { user } = useAuthStore();
  const isSystemAdmin = user?.role === 'SYSTEM_ADMIN';
  
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    action: '',
    resource: '',
    startDate: '',
    endDate: '',
  });

  // DB Management State (SYSTEM_ADMIN only)
  const [dbStats, setDbStats] = useState<ChatDbStats | null>(null);
  const [dbStatsLoading, setDbStatsLoading] = useState(false);
  const [cleanupDays, setCleanupDays] = useState(30);
  const [cleanupLoading, setCleanupLoading] = useState(false);
  const [showDbManagement, setShowDbManagement] = useState(true);

  // Fetch DB Stats
  const fetchDbStats = async () => {
    setDbStatsLoading(true);
    try {
      const result = await api.get('/chat/db-stats');
      setDbStats(result.data);
    } catch (err) {
      console.error('Error fetching DB stats:', err);
      toast.error('Failed to fetch database stats');
    } finally {
      setDbStatsLoading(false);
    }
  };

  // Run Cleanup
  const runCleanup = async () => {
    if (!confirm(`This will permanently delete all closed chat sessions older than ${cleanupDays} days and their messages. Continue?`)) {
      return;
    }
    
    setCleanupLoading(true);
    try {
      const result = await api.post('/chat/cleanup', { daysOld: cleanupDays });
      toast.success(`Cleanup complete: ${result.data.deletedSessions} sessions, ${result.data.deletedMessages} messages deleted`);
      fetchDbStats(); // Refresh stats
    } catch (err) {
      console.error('Error running cleanup:', err);
      toast.error('Failed to run cleanup');
    } finally {
      setCleanupLoading(false);
    }
  };

  // Fetch DB stats on mount (SYSTEM_ADMIN only)
  useEffect(() => {
    if (isSystemAdmin) {
      fetchDbStats();
    }
  }, [isSystemAdmin]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: pagination.page.toString(),
          limit: pagination.limit.toString(),
        });
        if (filters.action) params.append('action', filters.action);
        if (filters.resource) params.append('resource', filters.resource);
        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);

        const result = await api.get(`/admin/audit-logs?${params.toString()}`);
        setLogs(result.data?.data?.data || result.data?.data || []);
        setPagination(prev => ({ ...prev, ...result.data?.data?.pagination, ...(result.data?.pagination || {}) }));
      } catch (err) {
        console.error('Error fetching logs:', err);
        // Mock data for development
        setLogs([
          { id: '1', userId: '1', userEmail: 'admin@apex.com', userRole: 'ADMIN', action: 'CREATE', resource: 'User', createdAt: new Date().toISOString(), details: '{"email":"newuser@test.com"}' },
          { id: '2', userId: '1', userEmail: 'admin@apex.com', userRole: 'ADMIN', action: 'UPDATE', resource: 'Transaction', resourceId: 'txn-123', createdAt: new Date(Date.now() - 3600000).toISOString() },
          { id: '3', userId: '2', userEmail: 'superadmin@apex.com', userRole: 'SYSTEM_ADMIN', action: 'LOGIN', resource: 'Auth', createdAt: new Date(Date.now() - 7200000).toISOString() },
          { id: '4', userId: '1', userEmail: 'admin@apex.com', userRole: 'ADMIN', action: 'DELETE', resource: 'User', resourceId: 'usr-456', createdAt: new Date(Date.now() - 86400000).toISOString() },
          { id: '5', userId: '2', userEmail: 'superadmin@apex.com', userRole: 'SYSTEM_ADMIN', action: 'DEACTIVATE', resource: 'Admin', resourceId: 'adm-789', createdAt: new Date(Date.now() - 172800000).toISOString() },
        ]);
        setPagination({ page: 1, limit: 20, total: 5, totalPages: 1 });
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [pagination.page, pagination.limit, filters]);



  const exportToCSV = () => {
    const headers = ['Timestamp', 'User', 'Role', 'Action', 'Resource', 'Resource ID', 'Details'];
    const rows = logs.map(log => [
      new Date(log.createdAt).toLocaleString(),
      log.userEmail,
      log.userRole,
      log.action,
      log.resource,
      log.resourceId || '',
      log.details || '',
    ]);
    
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/system-admin" className="hover:text-blue-600">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-800">Audit Logs</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Audit Logs</h1>
          <p className="text-gray-500 mt-1">Track all admin actions across the system</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={exportToCSV}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium shadow-lg shadow-green-500/25"
        >
          📥 Export CSV
        </motion.button>
      </div>

      {/* DB Management Section - SYSTEM_ADMIN only */}
      {isSystemAdmin && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 shadow-lg border border-indigo-100/50"
        >
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowDbManagement(!showDbManagement)}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl sm:text-3xl">🗄️</span>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Chat Database Management</h2>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Monitor and manage chat storage for free tier optimization</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: showDbManagement ? 180 : 0 }}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500"
            >
              ▼
            </motion.div>
          </div>

          {showDbManagement && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 sm:mt-6"
            >
              {/* Stats Cards - Responsive Grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-3 sm:p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl sm:text-2xl">💬</span>
                    </div>
                    {dbStatsLoading ? (
                      <div className="animate-pulse bg-gray-200 h-6 sm:h-8 w-12 sm:w-16 rounded" />
                    ) : (
                      <span className="text-xl sm:text-3xl font-bold text-indigo-600">{dbStats?.sessions || 0}</span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">Sessions</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-3 sm:p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl sm:text-2xl">📝</span>
                    </div>
                    {dbStatsLoading ? (
                      <div className="animate-pulse bg-gray-200 h-6 sm:h-8 w-12 sm:w-16 rounded" />
                    ) : (
                      <span className="text-xl sm:text-3xl font-bold text-purple-600">{dbStats?.messages || 0}</span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">Messages</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-3 sm:p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl sm:text-2xl">🔒</span>
                    </div>
                    {dbStatsLoading ? (
                      <div className="animate-pulse bg-gray-200 h-6 sm:h-8 w-12 sm:w-16 rounded" />
                    ) : (
                      <span className="text-xl sm:text-3xl font-bold text-amber-600">{dbStats?.locks || 0}</span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">Locks</p>
                </motion.div>
              </div>

              {/* Cleanup Controls - Mobile Optimized */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-100">
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base flex items-center gap-2">
                      <span className="text-red-500">🗑️</span>
                      Cleanup Old Sessions
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">Permanently delete closed sessions older than selected period</p>
                  </div>
                  
                  {/* Mobile-friendly action row */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                      <label className="text-sm text-gray-600 whitespace-nowrap">Older than:</label>
                      <select
                        value={cleanupDays}
                        onChange={(e) => setCleanupDays(Number(e.target.value))}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm bg-white"
                      >
                        <option value={7}>7 days</option>
                        <option value={14}>14 days</option>
                        <option value={30}>30 days</option>
                        <option value={60}>60 days</option>
                        <option value={90}>90 days</option>
                      </select>
                    </div>
                    
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={runCleanup}
                        disabled={cleanupLoading}
                        className="flex-1 sm:flex-none px-4 sm:px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold text-sm shadow-md shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {cleanupLoading ? (
                          <>
                            <span className="animate-spin">⏳</span>
                            <span className="hidden sm:inline">Cleaning...</span>
                          </>
                        ) : (
                          <>
                            <span>🗑️</span>
                            <span>Run Cleanup</span>
                          </>
                        )}
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={fetchDbStats}
                        disabled={dbStatsLoading}
                        className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-lg shadow-sm"
                        title="Refresh Stats"
                      >
                        🔄
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filters.action}
            onChange={(e) => setFilters({ ...filters, action: e.target.value })}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          >
            <option value="">All Actions</option>
            <option value="CREATE">Create</option>
            <option value="UPDATE">Update</option>
            <option value="DELETE">Delete</option>
            <option value="LOGIN">Login</option>
            <option value="LOGOUT">Logout</option>
            <option value="DEACTIVATE">Deactivate</option>
            <option value="REACTIVATE">Reactivate</option>
          </select>
          <select
            value={filters.resource}
            onChange={(e) => setFilters({ ...filters, resource: e.target.value })}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          >
            <option value="">All Resources</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Transaction">Transaction</option>
            <option value="Loan">Loan</option>
            <option value="Auth">Auth</option>
            <option value="Settings">Settings</option>
          </select>
          <input
            type="date"
            placeholder="Start Date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
          <input
            type="date"
            placeholder="End Date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => { setFilters({ action: '', resource: '', startDate: '', endDate: '' }); }}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Logs List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-5xl mb-4">📋</p>
            <p className="text-lg">No audit logs found</p>
            <p className="text-sm mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {logs.map((log) => {
              const colors = ACTION_COLORS[log.action] || { bg: 'bg-gray-100', text: 'text-gray-700' };
              return (
                <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`px-3 py-1.5 rounded-lg ${colors.bg} ${colors.text} text-xs font-bold shrink-0`}>
                      {log.action}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-gray-800">{log.resource}</span>
                        {log.resourceId && (
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            ID: {log.resourceId.substring(0, 8)}...
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        by <span className="font-medium">{log.userEmail}</span>
                        <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                          log.userRole === 'SYSTEM_ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {log.userRole.replace('_', ' ')}
                        </span>
                      </p>
                      {log.details && (
                        <details className="mt-2">
                          <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                            View details
                          </summary>
                          <pre className="mt-2 p-3 bg-gray-100 rounded-lg text-xs overflow-x-auto">
                            {JSON.stringify(JSON.parse(log.details), null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm text-gray-500">{formatDate(log.createdAt)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                disabled={pagination.page === 1}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                disabled={pagination.page === pagination.totalPages}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
