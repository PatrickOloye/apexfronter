"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminService, User } from '../../../../libs/server-actions/admin';
import { CreateUserModal } from '../../../../components/users/CreateUserModal';
import { EditUserModal } from '../../../../components/users/EditUserModal';
import { ConfirmationModal } from '../../../../components/ui/ConfirmationModal';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '../../../../components/ui/tooltip';
import { toast } from 'sonner';
import { 
  Search, 
  Filter, 
  RefreshCw, 
  UserPlus, 
  MoreVertical, 
  Shield, 
  Ban, 
  Archive, 
  Trash2, 
  CheckCircle,
  XCircle,
  Mail,
  Smartphone,
  Globe,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreHorizontal
} from 'lucide-react';

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  
  // Confirmation Modal State
  const [confirmation, setConfirmation] = useState<{
    isOpen: boolean;
    type: 'block' | 'unblock' | 'archive' | 'unarchive' | 'delete' | null;
    user: User | null;
  }>({
    isOpen: false,
    type: null,
    user: null,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Fetch users
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await AdminService.getAllUsers({
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm || undefined,
        status: statusFilter || undefined,
        role: roleFilter || undefined,
      });

      if (Array.isArray(response)) {
        setUsers(response);
      } else if (response?.data) {
        setUsers(response.data);
        if (response.pagination) {
          setPagination(prev => ({ ...prev, ...response.pagination }));
        }
      } else {
        setUsers([]);
      }
    } catch (err: any) {
      console.error('Failed to fetch users:', err);
      toast.error(err.message || 'Failed to load users');
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.limit, searchTerm, statusFilter, roleFilter]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchUsers();
    }, 300);
    return () => clearTimeout(debounce);
  }, [fetchUsers]);

  const initiateAction = (user: User, type: 'block' | 'unblock' | 'archive' | 'unarchive' | 'delete') => {
    setConfirmation({
      isOpen: true,
      type,
      user,
    });
  };

  const handleConfirmAction = async () => {
    const { user, type } = confirmation;
    if (!user || !type) return;

    setActionLoading(user.id);
    
    try {
      switch (type) {
        case 'block':
          await AdminService.blockUser(user.id, 'Admin action');
          toast.success(`User ${user.firstName} blocked successfully`);
          break;
        case 'unblock':
          await AdminService.unblockUser(user.id);
          toast.success(`User ${user.firstName} unblocked successfully`);
          break;
        case 'archive':
          await AdminService.archiveUser(user.id);
          toast.success(`User ${user.firstName} archived successfully`);
          break;
        case 'unarchive':
          await AdminService.unarchiveUser(user.id);
          toast.success(`User ${user.firstName} restored from archive`);
          break;
        case 'delete':
          await AdminService.deleteUser(user.id);
          toast.success(`User ${user.firstName} deleted permanently`);
          break;
      }
      fetchUsers();
      closeConfirmation();
    } catch (err: any) {
      console.error(`Failed to ${type} user:`, err);
      toast.error(err.message || `Failed to ${type} user`);
    } finally {
      setActionLoading(null);
    }
  };

  const closeConfirmation = () => {
    setConfirmation({ isOpen: false, type: null, user: null });
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'BLOCKED':
        return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'ARCHIVED':
        return 'text-slate-600 bg-slate-50 border-slate-100';
      default:
        return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'SYSTEM_ADMIN':
        return 'text-purple-600 bg-purple-50 border-purple-100';
      case 'ADMIN':
        return 'text-blue-600 bg-blue-50 border-blue-100';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  // Helper to get modal texts
  const getConfirmationDetails = () => {
    const { type, user } = confirmation;
    if (!type || !user) return { title: '', description: '', confirmLabel: '', variant: 'default' as const };

    const name = `${user.firstName} ${user.lastName}`;

    switch (type) {
      case 'block':
        return {
          title: 'Block User?',
          description: `Are you sure you want to block ${name}? They will not be able to login until unblocked.`,
          confirmLabel: 'Block Access',
          variant: 'destructive' as const
        };
      case 'unblock':
        return {
          title: 'Unblock User?',
          description: `Are you sure you want to unblock ${name}? They will regain access to their account.`,
          confirmLabel: 'Restore Access',
          variant: 'default' as const
        };
      case 'archive':
        return {
          title: 'Archive User?',
          description: `Are you sure you want to archive ${name}? Their data will be preserved but hidden from active lists.`,
          confirmLabel: 'Archive User',
          variant: 'default' as const
        };
      case 'unarchive':
        return {
          title: 'Unarchive User?',
          description: `Are you sure you want to unarchive ${name}? They will be restored to the active user list.`,
          confirmLabel: 'Restore User',
          variant: 'default' as const
        };
      case 'delete':
        return {
          title: 'Delete User Permanently?',
          description: `WARNING: This action cannot be undone. Are you sure you want to strictly delete ${name} and all associated data?`,
          confirmLabel: 'Delete Permanently',
          variant: 'destructive' as const
        };
      default:
        return { title: 'Confirm Action', description: 'Are you sure?', confirmLabel: 'Confirm', variant: 'default' as const };
    }
  };

  const modalDetails = getConfirmationDetails();

  return (
    <TooltipProvider delayDuration={300}>
      <div className="min-h-screen bg-slate-50/50 p-6 lg:p-10 space-y-8 font-sans text-slate-900">
        
        {/* Page Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              User Management
            </h1>
            <p className="text-slate-500 text-lg">
              Manage accounts, permissions, and security.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={fetchUsers}
              className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
            >
              <UserPlus className="w-5 h-5" />
              <span>Add User</span>
            </motion.button>
          </div>
        </header>

        {/* Filters & Search */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl shadow-slate-200/40 rounded-2xl p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-1 md:pb-0">
              <div className="relative min-w-[140px]">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full appearance-none px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                >
                  <option value="">All Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="BLOCKED">Blocked</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
                <Filter className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative min-w-[140px]">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full appearance-none px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                >
                  <option value="">All Roles</option>
                  <option value="USER">Users</option>
                  <option value="ADMIN">Admins</option>
                </select>
                <Shield className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-slate-500 font-medium animate-pulse">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">No users found</h3>
              <p className="text-slate-500 mt-1 max-w-sm text-center">
                We couldn&apos;t find any users matching your criteria. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-100">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">User Profile</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Balance</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {users.map((user, index) => (
                      <motion.tr 
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group hover:bg-indigo-50/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-500/20">
                              {user.firstName?.[0]}{user.lastName?.[0]}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-sm text-slate-500 flex items-center gap-2">
                                <Mail className="w-3 h-3" />
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1 items-start">
                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                              {user.status === 'ACTIVE' && <CheckCircle className="w-3 h-3 mr-1" />}
                              {user.status === 'BLOCKED' && <Ban className="w-3 h-3 mr-1" />}
                              {user.status === 'ARCHIVED' && <Archive className="w-3 h-3 mr-1" />}
                              {user.status || 'ACTIVE'}
                            </span>
                            {user.isVerified ? (
                               <span className="inline-flex items-center text-[10px] text-emerald-600 font-medium">
                                 <CheckCircle className="w-3 h-3 mr-1" /> Verified
                               </span>
                            ) : (
                              <span className="inline-flex items-center text-[10px] text-amber-600 font-medium">
                                <XCircle className="w-3 h-3 mr-1" /> Unverified
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                            {user.role?.replace('_', ' ')}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                           <div className="flex items-center gap-2 text-slate-700 font-medium font-mono">
                             <span className="text-slate-400">$</span>
                             {(user.availableBalance ?? user.clearedBalance ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                           </div>
                           <div className="text-[10px] text-slate-400 mt-0.5">
                             Acc: {user.accountNumber || 'N/A'}
                           </div>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {user.role !== 'SYSTEM_ADMIN' ? (
                              <>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button 
                                      onClick={() => openEditModal(user)}
                                      className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                    >
                                      <MoreVertical className="w-4 h-4" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent>Detailed Actions</TooltipContent>
                                </Tooltip>
                                
                                <div className="h-4 w-px bg-slate-200 mx-1" />

                                {(user.status === 'ACTIVE' || !user.status) && (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button 
                                        onClick={() => initiateAction(user, 'block')}
                                        className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                                      >
                                        <Ban className="w-4 h-4" />
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent>Block User</TooltipContent>
                                  </Tooltip>
                                )}
                                
                                {user.status === 'BLOCKED' && (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button 
                                        onClick={() => initiateAction(user, 'unblock')}
                                        className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                      >
                                        <CheckCircle className="w-4 h-4" />
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent>Unblock User</TooltipContent>
                                  </Tooltip>
                                )}

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button 
                                        onClick={() => initiateAction(user, 'delete')}
                                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent>Delete User</TooltipContent>
                                  </Tooltip>
                              </>
                            ) : (
                              <span className="text-xs text-slate-400 italic px-2 py-1 bg-slate-50 rounded">System Protected</span>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden flex flex-col divide-y divide-slate-100">
                {users.map((user, index) => (
                  <motion.div 
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-500/20">
                          {user.firstName?.[0]}{user.lastName?.[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            <span className="truncate max-w-[150px]">{user.email}</span>
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => openEditModal(user)}
                        className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"
                      >
                         <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full border ${getStatusColor(user.status)}`}>
                            {user.status || 'ACTIVE'}
                        </span>
                         <span className={`inline-flex px-2 py-0.5 rounded-full border ${getRoleColor(user.role)}`}>
                            {user.role?.replace('_', ' ')}
                          </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-50 mt-2">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Balance</span>
                            <span className="font-mono font-bold text-slate-700">
                                ${(user.availableBalance ?? user.clearedBalance ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                         <div className="flex gap-1">
                            {user.role !== 'SYSTEM_ADMIN' && (
                                <>
                                    {(user.status === 'ACTIVE' || !user.status) && (
                                        <button 
                                            onClick={() => initiateAction(user, 'block')}
                                            className="p-2 bg-amber-50 text-amber-600 rounded-lg"
                                            title="Block"
                                        >
                                            <Ban className="w-4 h-4" />
                                        </button>
                                    )}
                                    {user.status === 'BLOCKED' && (
                                        <button 
                                            onClick={() => initiateAction(user, 'unblock')}
                                            className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"
                                            title="Unblock"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                        </button>
                                    )}
                                     <button 
                                        onClick={() => initiateAction(user, 'delete')}
                                        className="p-2 bg-rose-50 text-rose-600 rounded-lg"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-sm text-slate-500">
                    Showing <span className="font-semibold text-slate-900">{((pagination.page - 1) * pagination.limit) + 1}</span> to <span className="font-semibold text-slate-900">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of <span className="font-semibold text-slate-900">{pagination.total}</span> users
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                      disabled={pagination.page === 1}
                      className="p-2 rounded-lg border border-slate-200 text-slate-500 disabled:opacity-50 hover:bg-white hover:text-indigo-600 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      // Logic for windowing pages can be added here if needed
                      let p = i + 1;
                      if (pagination.totalPages > 5 && pagination.page > 3) {
                         p = pagination.page - 2 + i;
                         if (p > pagination.totalPages) p = pagination.totalPages - (4 - i);
                      }
                      
                      return (
                        <button
                          key={p}
                          onClick={() => setPagination(prev => ({ ...prev, page: p }))}
                          className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                            pagination.page === p
                              ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20'
                              : 'text-slate-500 hover:bg-white hover:text-indigo-600'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                      disabled={pagination.page >= pagination.totalPages}
                      className="p-2 rounded-lg border border-slate-200 text-slate-500 disabled:opacity-50 hover:bg-white hover:text-indigo-600 transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <CreateUserModal 
          isOpen={showCreateModal} 
          onClose={() => setShowCreateModal(false)} 
          onSuccess={fetchUsers} 
        />

        <EditUserModal 
          isOpen={showEditModal} 
          onClose={() => setShowEditModal(false)} 
          onSuccess={fetchUsers} 
          user={selectedUser}
        />

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={confirmation.isOpen}
          onClose={closeConfirmation}
          onConfirm={handleConfirmAction}
          title={modalDetails.title}
          description={modalDetails.description}
          confirmLabel={modalDetails.confirmLabel}
          variant={modalDetails.variant}
          isLoading={!!actionLoading} 
        />
      </div>
    </TooltipProvider>
  );
};

export default UserManagementPage;
