"use client";

import { useEffect, useState, useRef } from 'react';
import { AdminService, User, CreateAdminTransactionDto } from '../libs/server-actions/admin';
import { toast } from 'sonner';

interface AdminTransactionsPageProps {
  title: string;
  subtitle: string;
}

interface TransactionItem {
  id: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  status: string;
  createdAt: string;
  description?: string;
  currency?: string;
  User?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    accountNumber?: string;
  };
}

const AdminTransactionsPage = ({ title, subtitle }: AdminTransactionsPageProps) => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    userId: '',
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<1 | 2>(1);
  const [selectedType, setSelectedType] = useState<'CREDIT' | 'DEBIT' | null>(null);

  // Form State
  const [form, setForm] = useState<CreateAdminTransactionDto>({
    userIdentifier: '',
    amount: 0,
    type: 'CREDIT',
    balanceType: 'AVAILABLE',
    description: '',
    currency: 'USD',
  });
  
  // User Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]); // In reality, endpoint returns 1 partial match or exact, but let's assume we might get list later. API currently returns 1 user.
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchingUser, setSearchingUser] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const searchAbort = useRef<AbortController | null>(null);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await AdminService.getAllTransactions({
        page: filters.page,
        limit: filters.limit,
        userId: filters.userId || undefined,
        type: filters.type || undefined,
        status: filters.status || undefined,
      });

      const data = response?.data ?? response;
      setTransactions(data || []);
      if (response?.pagination) {
        setPagination(response.pagination);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.page, filters.limit, filters.type, filters.status]);

  // Handle User Search (Debounced)
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    // clear previously selected user when query changes
    setSelectedUser(null);

    // do not search for very short queries
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    // debounce user input
    searchTimeout.current = setTimeout(async () => {
      // cancel previous request
      if (searchAbort.current) {
        try { searchAbort.current.abort(); } catch {} 
        searchAbort.current = null;
      }

      const controller = new AbortController();
      searchAbort.current = controller;

      setSearchingUser(true);
      try {
        // If the user typed an email-like string, search immediately (no further throttle)
        const isEmail = /@/.test(query);
        if (isEmail) {
          // no-op, still calls the same API but we skip extra logic
        }

        const user = await AdminService.searchUserForTransaction(query, { signal: controller.signal });
        if (user) {
          setSearchResults([user]);
        } else {
          setSearchResults([]);
        }
      } catch (err: any) {
        if (err?.name === 'CanceledError' || err?.name === 'AbortError') {
          // request was canceled, ignore
        } else {
          // on other errors, return empty results but do not crash
          console.error('User search error:', err);
          setSearchResults([]);
        }
      } finally {
        setSearchingUser(false);
      }
    }, 500);
  };

  const submitTransaction = async () => {
    if (!selectedUser) {
        toast.error('Please select a user first');
        return;
    }
    if (form.amount <= 0) {
         toast.error('Amount must be greater than 0');
        return;
    }

    try {
      await AdminService.createAdminTransaction({
        ...form,
        userIdentifier: selectedUser.email, // Or account number, ensuring backend finds it
        type: selectedType!,
        amount: Number(form.amount)
      });
      toast.success('Transaction processed successfully');
      setIsModalOpen(false);
      resetForm();
      fetchTransactions();
    } catch (error: any) {
      toast.error(error.message || 'Transaction failed');
    }
  };

  const resetForm = () => {
      setModalStep(1);
      setSelectedType(null);
      setForm({
        userIdentifier: '',
        amount: 0,
        type: 'CREDIT',
        balanceType: 'AVAILABLE',
        description: '',
        currency: 'USD',
      });
      setSearchQuery('');
      setSelectedUser(null);
      setSearchResults([]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CLEARED': return 'bg-emerald-100 text-emerald-700';
      case 'PENDING': return 'bg-amber-100 text-amber-700';
      case 'FAILED': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="p-6 min-h-screen bg-slate-50/50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">{title}</h1>
          <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="font-medium">Initiate Transaction</span>
        </button>
      </div>

      {/* Filters & Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Filter Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-wrap gap-3">
             <select
                 value={filters.status}
                 onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value, page: 1 }))}
                 className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
             >
                 <option value="">All Statuses</option>
                 <option value="PENDING">Pending</option>
                 <option value="CLEARED">Cleared</option>
                 <option value="FAILED">Failed</option>
             </select>
             <select
                 value={filters.type}
                 onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value, page: 1 }))}
                 className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
             >
                 <option value="">All Types</option>
                 <option value="CREDIT">Credit</option>
                 <option value="DEBIT">Debit</option>
             </select>
        </div>

        {/* Table */}
        {/* Mobile Card View */}
        <div className="md:hidden">
            {loading ? (
                <div className="p-8 text-center">
                    <div className="inline-block animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                </div>
            ) : transactions.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm">No transactions found</div>
            ) : (
                <div className="divide-y divide-slate-100">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="p-4 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-bold">
                                        {tx.User?.firstName?.[0]}{tx.User?.lastName?.[0]}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">{tx.User?.firstName} {tx.User?.lastName}</p>
                                        <p className="text-xs text-slate-500">{tx.User?.email}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                                    {tx.status}
                                </span>
                            </div>

                            <div className="flex justify-between items-center pl-[52px]">
                                <div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Amount</p>
                                    <p className="font-bold text-slate-900">{tx.currency || 'USD'} {tx.amount.toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Type</p>
                                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${tx.type === 'CREDIT' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                       {tx.type}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center pl-[52px] pt-1 text-xs text-slate-400">
                                <span>{new Date(tx.createdAt).toLocaleDateString()}</span>
                                <span>{tx.description?.includes('Available') ? 'Available' : 'Standard'} Bal</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Balance Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {loading ? (
                <tr>
                   <td colSpan={6} className="px-6 py-12 text-center">
                       <div className="inline-block animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                   </td>
                </tr>
              ) : transactions.length === 0 ? (
                 <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">No transactions found</td>
                 </tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">
                           {tx.User?.firstName?.[0]}{tx.User?.lastName?.[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{tx.User?.firstName} {tx.User?.lastName}</p>
                          <p className="text-xs text-slate-500">{tx.User?.accountNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${tx.type === 'CREDIT' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                           <span className={`w-1.5 h-1.5 rounded-full ${tx.type === 'CREDIT' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                           {tx.type}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                        {tx.currency || 'USD'} {tx.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                        {/* Assuming description contains balance type for now based on backend logic */}
                        {tx.description?.includes('Available') ? 'Available' : tx.description?.includes('Opening') ? 'Opening' : 'Standard'}
                    </td>
                    <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                            {tx.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
           <span className="text-sm text-slate-500">Page {pagination.page} of {pagination.totalPages || 1}</span>
           <div className="flex gap-2">
               <button 
                  onClick={() => setFilters(p => ({...p, page: p.page - 1}))}
                  disabled={pagination.page <= 1}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm disabled:opacity-50"
               >
                   Previous
               </button>
               <button 
                  onClick={() => setFilters(p => ({...p, page: p.page + 1}))}
                  disabled={pagination.page >= pagination.totalPages}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm disabled:opacity-50"
               >
                   Next
               </button>
           </div>
        </div>
      </div>

      {/* CREATE TRANSACTION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in">
             
             {/* Modal Header */}
             <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                 <div>
                    <h2 className="text-lg font-bold text-slate-900">
                        {modalStep === 1 ? 'Select Transaction Type' : `Create ${selectedType} Transaction`}
                    </h2>
                    <p className="text-xs text-slate-500">Step {modalStep} of 2</p>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>
             </div>

             {/* Modal Body */}
             <div className="p-6">
                {modalStep === 1 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button 
                           onClick={() => { setSelectedType('CREDIT'); setModalStep(2); }}
                           className="group flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50/10 transition-all duration-200"
                        >
                            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-slate-800">Credit Account</h3>
                                <p className="text-sm text-slate-500 mt-1">Add funds to a user&apos;s balance</p>
                            </div>
                        </button>

                        <button 
                           onClick={() => { setSelectedType('DEBIT'); setModalStep(2); }}
                           className="group flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 border-slate-100 hover:border-rose-500 hover:bg-rose-50/10 transition-all duration-200"
                        >
                            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-slate-800">Debit Account</h3>
                                <p className="text-sm text-slate-500 mt-1">Deduct funds from a user&apos;s balance</p>
                            </div>
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        
                        {/* 1. Account Selection */}
                        <div className="space-y-2">
                             <label className="text-sm font-semibold text-slate-700 block">
                                Account to {selectedType === 'CREDIT' ? 'Credit' : 'Debit'}
                             </label>
                             
                             {selectedUser ? (
                                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                            {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{selectedUser.firstName} {selectedUser.lastName}</p>
                                            <p className="text-xs text-slate-500">{selectedUser.email} • {selectedUser.accountNumber}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => { setSelectedUser(null); setSearchQuery(''); }} className="text-xs font-bold text-blue-600 hover:underline">Change</button>
                                </div>
                             ) : (
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input 
                                        type="text"
                                        placeholder="Search by Email or Account Number..."
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        value={searchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />
                                    {searchingUser && (
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                                        </div>
                                    )}
                                    
                                    {/* Search Results Dropdown */}
                                    {searchResults.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 max-h-48 overflow-y-auto z-10">
                                            {searchResults.map((user) => (
                                                <div 
                                                    key={user.id}
                                                    onClick={() => { setSelectedUser(user); setSearchResults([]); }}
                                                    className="p-3 hover:bg-slate-50 cursor-pointer flex items-center gap-3 border-b border-slate-50 last:border-0"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                                        {user.firstName[0]}{user.lastName[0]}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-slate-800">{user.firstName} {user.lastName}</p>
                                                        <p className="text-xs text-slate-500">{user.email}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                             )}
                        </div>

                        {/* 2. Balance Type & Amount */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                 <label className="text-sm font-semibold text-slate-700 block">Balance Type</label>
                                 <div className="relative">
                                     <select
                                         value={form.balanceType}
                                         onChange={(e) => setForm(f => ({...f, balanceType: e.target.value as any}))}
                                         className="w-full p-3 pl-10 appearance-none rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                     >
                                         <option value="AVAILABLE">Available Balance</option>
                                         <option value="OPENING">Opening Balance</option>
                                         <option value="UNCLEARED">Uncleared Balance</option>
                                     </select>
                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                         <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                         </svg>
                                     </div>
                                 </div>
                             </div>
                             
                             <div className="space-y-2">
                                 <label className="text-sm font-semibold text-slate-700 block">Amount</label>
                                 <div className="flex rounded-xl border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500">
                                     <div className="bg-slate-50 px-3 py-3 text-slate-500 font-medium text-sm border-r border-slate-200">
                                         USD
                                     </div>
                                     <input 
                                        type="number" 
                                        min="0.01"
                                        step="0.01"
                                        value={form.amount || ''}
                                        onChange={(e) => setForm(f => ({...f, amount: Number(e.target.value)}))}
                                        className="w-full px-3 py-3 outline-none"
                                        placeholder="0.00"
                                     />
                                 </div>
                             </div>
                        </div>

                        {/* 3. Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 block">Description (Optional)</label>
                            <textarea 
                                rows={3}
                                value={form.description}
                                onChange={(e) => setForm(f => ({...f, description: e.target.value}))}
                                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                placeholder="Enter transaction details..."
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4 border-t border-slate-100">
                            <button 
                                onClick={resetForm}
                                className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={submitTransaction}
                                className={`flex-1 px-4 py-3 text-white font-semibold rounded-xl shadow-lg transition-all active:scale-95 ${
                                    selectedType === 'CREDIT' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/20'
                                }`}
                            >
                                Process {selectedType}
                            </button>
                        </div>
                    </div>
                )}
             </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTransactionsPage;
