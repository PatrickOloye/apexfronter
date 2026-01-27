'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import AppLink from '@/components/AppLink';
import { api } from '@/libs/http/api';
import { Settings, Power, RefreshCw, Shield, Ban, CheckCircle, Smartphone, UserPlus, Trash2, Key, Crown, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Admin {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'SYSTEM_ADMIN';
  isActive: boolean;
  createdAt: string;
  permissions: { id: string; key: string; name: string }[];
}

interface Permission {
  id: string;
  key: string;
  name: string;
  description: string;
  category: string;
  isSystemAdmin: boolean;
}

export default function AdminManagement() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [systemAdminCount, setSystemAdminCount] = useState({ current: 0, max: 2, canCreateMore: false });
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    isSystemAdmin: false,
    permissionIds: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [adminsRes, permissionsRes, countRes] = await Promise.all([
        api.get('/admin/admins'),
        api.get('/admin/permissions'),
        api.get('/admin/system-admin-count'),
      ]);

      setAdmins(adminsRes.data?.data || adminsRes.data || []);
      setPermissions(permissionsRes.data?.data || permissionsRes.data || []);
      setSystemAdminCount(countRes.data?.data || countRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      // Fallback/Mock
      setAdmins([
        { id: '1', email: 'admin@apex.com', firstName: 'John', lastName: 'Admin', role: 'ADMIN', isActive: true, createdAt: new Date().toISOString(), permissions: [{ id: '1', key: 'manage_users', name: 'Manage Users' }] },
        { id: '2', email: 'super@apex.com', firstName: 'Super', lastName: 'Admin', role: 'SYSTEM_ADMIN', isActive: true, createdAt: new Date().toISOString(), permissions: [] },
      ]);
      setPermissions([
        { id: '1', key: 'manage_users', name: 'Manage Users', description: 'View and edit users', category: 'users', isSystemAdmin: false },
        // ...
      ]);
      setSystemAdminCount({ current: 1, max: 2, canCreateMore: true });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const endpoint = formData.isSystemAdmin ? 'system-admins' : 'admins';
      await api.post(`/admin/${endpoint}`, {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        permissionIds: formData.isSystemAdmin ? [] : formData.permissionIds,
      });

      toast.success('Admin created successfully!');
      setShowCreateModal(false);
      setFormData({ email: '', firstName: '', lastName: '', password: '', isSystemAdmin: false, permissionIds: [] });
      fetchData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePermissions = async () => {
    if (!selectedAdmin) return;
    setIsSubmitting(true);
    setError('');

    try {
      await api.put(`/admin/admins/${selectedAdmin.id}/permissions`, {
        permissionIds: formData.permissionIds,
      });

      toast.success('Permissions updated successfully!');
      setShowPermissionModal(false);
      fetchData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (admin: Admin) => {
    const endpoint = admin.isActive ? 'deactivate' : 'reactivate';
    
    try {
      if (admin.isActive) {
        await api.delete(`/admin/admins/${admin.id}`);
      } else {
        await api.post(`/admin/admins/${admin.id}/reactivate`);
      }

      toast.success(`Admin ${endpoint}d successfully!`);
      fetchData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const openPermissionModal = (admin: Admin) => {
    setSelectedAdmin(admin);
    setFormData(prev => ({
      ...prev,
      permissionIds: admin.permissions.map(p => p.id),
    }));
    setShowPermissionModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-10 space-y-8 font-sans text-slate-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
             <Link href="/system-admin" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
             <span>/</span>
             <span className="text-slate-800 font-medium">Admins</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Management</h1>
          <p className="text-slate-500 text-lg">Control access levels and system administrators.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCreateModal(true)}
          disabled={!systemAdminCount.canCreateMore && formData.isSystemAdmin}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium shadow-lg shadow-slate-900/10 disabled:opacity-50 transition-all"
        >
          <UserPlus className="w-5 h-5" />
          <span>Create Admin</span>
        </motion.button>
      </div>

      {/* System Admin Limit Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200">
           <div className="flex items-start justify-between">
              <div>
                <p className="text-indigo-100 font-medium mb-1">System Admins</p>
                <h3 className="text-3xl font-bold">{systemAdminCount.current} / {systemAdminCount.max}</h3>
              </div>
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Crown className="w-6 h-6 text-yellow-300" />
              </div>
           </div>
           <div className="mt-4 text-xs font-medium px-3 py-1 bg-black/20 rounded-full inline-block">
             {systemAdminCount.canCreateMore ? 'Slots available' : 'Max limit reached'}
           </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center justify-between">
           <div>
             <p className="text-slate-500 font-medium mb-1">Total Admins</p>
             <h3 className="text-3xl font-bold text-slate-900">{admins.length}</h3>
           </div>
           <div className="p-3 bg-slate-50 rounded-xl">
             <Shield className="w-6 h-6 text-slate-600" />
           </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center justify-between">
           <div>
             <p className="text-slate-500 font-medium mb-1">Active Roles</p>
             <h3 className="text-3xl font-bold text-slate-900">{permissions.length}</h3>
           </div>
           <div className="p-3 bg-slate-50 rounded-xl">
             <Key className="w-6 h-6 text-slate-600" />
           </div>
        </div>
      </div>

      {/* Admin List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        {loading ? (
             <div className="flex flex-col items-center justify-center py-20">
             <div className="w-12 h-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mb-4" />
             <p className="text-slate-500 font-medium animate-pulse">Loading admins...</p>
           </div>
        ) : (
            <table className="w-full">
            <thead className="bg-slate-50/80 border-b border-slate-100">
                <tr>
                <th className="text-left px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Admin Profile</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Role</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Permissions</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {admins.map((admin, index) => (
                <motion.tr 
                    key={admin.id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-slate-50/50 transition-colors"
                >
                    <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${
                            admin.role === 'SYSTEM_ADMIN' 
                             ? 'bg-gradient-to-br from-amber-300 to-yellow-500 text-white shadow-amber-200'
                             : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-indigo-200'
                        }`}>
                        {admin.role === 'SYSTEM_ADMIN' ? <Crown className="w-5 h-5" /> : (admin.firstName?.[0] || admin.email[0].toUpperCase())}
                        </div>
                        <div>
                        <p className="font-semibold text-slate-900">{admin.firstName} {admin.lastName}</p>
                        <p className="text-sm text-slate-500">{admin.email}</p>
                        </div>
                    </div>
                    </td>
                    <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        admin.role === 'SYSTEM_ADMIN' 
                        ? 'bg-amber-50 text-amber-700 border-amber-100' 
                        : 'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                        {admin.role === 'SYSTEM_ADMIN' ? 'System Admin' : 'Admin'}
                    </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                    {admin.role === 'SYSTEM_ADMIN' ? (
                        <span className="text-xs text-slate-400 italic flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> All Permissions Granted
                        </span>
                    ) : (
                        <div className="flex flex-wrap gap-1.5">
                        {admin.permissions.slice(0, 2).map((p) => (
                            <span key={p.id} className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] text-slate-600 font-medium">
                            {p.name}
                            </span>
                        ))}
                        {admin.permissions.length > 2 && (
                            <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] text-slate-500">
                            +{admin.permissions.length - 2}
                            </span>
                        )}
                        {admin.permissions.length === 0 && (
                            <span className="text-xs text-slate-400">No specific permissions</span>
                        )}
                        </div>
                    )}
                    </td>
                    <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        admin.isActive 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                        : 'bg-rose-50 text-rose-700 border-rose-100'
                    }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${admin.isActive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        {admin.isActive ? 'Active' : 'Inactive'}
                    </span>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {admin.role !== 'SYSTEM_ADMIN' && (
                            <button
                                onClick={() => openPermissionModal(admin)}
                                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                title="Edit Permissions"
                            >
                                <Settings className="w-4 h-4" />
                            </button>
                            )}
                            <button
                                onClick={() => handleToggleActive(admin)}
                                className={`p-2 rounded-lg transition-all ${
                                    admin.isActive
                                    ? 'text-slate-500 hover:text-rose-600 hover:bg-rose-50'
                                    : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50'
                                }`}
                                title={admin.isActive ? "Deactivate" : "Reactivate"}
                            >
                                {admin.isActive ? <Power className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
                            </button>
                        </div>
                    </td>
                </motion.tr>
                ))}
            </tbody>
            </table>
        )}
      </div>

      {/* Create Admin Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">New Admin Account</h2>
                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                    <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleCreateAdmin} className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">First Name</label>
                        <input
                            type="text"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            required
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Last Name</label>
                        <input
                            type="text"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            required
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                    <input
                        type="email"
                        placeholder="john.doe@apex.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        minLength={8}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                </div>
                
                <div 
                    onClick={() => systemAdminCount.canCreateMore && setFormData({ ...formData, isSystemAdmin: !formData.isSystemAdmin })}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        formData.isSystemAdmin 
                            ? 'border-indigo-500 bg-indigo-50/50' 
                            : 'border-slate-100 bg-slate-50 hover:border-slate-300'
                    } ${!systemAdminCount.canCreateMore ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                      formData.isSystemAdmin ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white'
                  }`}>
                      {formData.isSystemAdmin && <CheckCircle className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                        System Administrator 
                        <Crown className="w-4 h-4 text-amber-500" />
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">
                        Full access to all system features and settings.
                        {!systemAdminCount.canCreateMore && <span className="text-rose-600 block mt-1">Maximum limit reached.</span>}
                    </p>
                  </div>
                </div>

                {!formData.isSystemAdmin && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700 block">Access Permissions</label>
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                      {permissions.filter(p => !p.isSystemAdmin).map((perm) => (
                        <label key={perm.id} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-indigo-300 transition-colors">
                          <input
                            type="checkbox"
                            checked={formData.permissionIds.includes(perm.id)}
                            onChange={(e) => {
                              const ids = e.target.checked
                                ? [...formData.permissionIds, perm.id]
                                : formData.permissionIds.filter(id => id !== perm.id);
                              setFormData({ ...formData, permissionIds: ids });
                            }}
                            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                          />
                          <span className="text-sm text-slate-700">{perm.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 disabled:opacity-70 transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"/> : <UserPlus className="w-4 h-4" />}
                    Create Admin
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Permission Edit Modal */}
      <AnimatePresence>
        {showPermissionModal && selectedAdmin && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-900">Edit Permissions</h2>
                <p className="text-sm text-slate-500 mt-1">For {selectedAdmin.firstName} {selectedAdmin.lastName}</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {permissions.filter(p => !p.isSystemAdmin).map((perm) => (
                    <label key={perm.id} className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-indigo-300 hover:shadow-sm transition-all">
                      <input
                        type="checkbox"
                        checked={formData.permissionIds.includes(perm.id)}
                        onChange={(e) => {
                          const ids = e.target.checked
                            ? [...formData.permissionIds, perm.id]
                            : formData.permissionIds.filter(id => id !== perm.id);
                          setFormData({ ...formData, permissionIds: ids });
                        }}
                        className="w-5 h-5 mt-0.5 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <div>
                        <p className="font-medium text-slate-800">{perm.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{perm.description}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowPermissionModal(false)}
                    className="flex-1 px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdatePermissions}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 disabled:opacity-70 transition-colors"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Permissions'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
