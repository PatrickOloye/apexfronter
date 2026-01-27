'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useAuthStore } from '@/store/AuthStore';
import { OTPModal } from '@/components/withdraw/OTPModal';
import { toast } from 'sonner';
import { 
  Building2, 
  CreditCard, 
  Bitcoin, 
  Wallet, 
  DollarSign, 
  Send,
  Calendar,
  User,
  Hash,
  Globe
} from 'lucide-react';

export default function WithdrawalPage() {
  const user = useAuthStore((state) => state.user);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamic fields state
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [email, setEmail] = useState('');


  const withdrawalMethods = [
    { id: 'bank_transfer', name: 'Bank Transfer', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'card', name: 'Card', icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'crypto', name: 'Crypto', icon: Bitcoin, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'paypal', name: 'PayPal', icon: Wallet, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'cash_app', name: 'Cash App', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'skrill', name: 'Skrill', icon: Globe, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error('Please enter a valid withdrawal amount');
      return;
    }
    
    if (!method) {
      toast.error('Please select a withdrawal method');
      return;
    }

    const totalBalance = user ? (user.clearedBalance + (user.openingBalance || 0)) : 0;
    if (totalBalance < Number(amount)) {
      toast.error('Insufficient funds for this withdrawal');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
        setIsModalOpen(true);
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Withdraw Funds</h1>
        <p className="text-gray-500 mt-2">Securely transfer funds to your preferred account.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-8">
          
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* 1. Method Selection */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">1. Select Method</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {withdrawalMethods.map((m) => {
                        const Icon = m.icon;
                        const isSelected = method === m.id;
                        return (
                            <button
                                key={m.id}
                                type="button"
                                onClick={() => setMethod(m.id)}
                                className={`relative p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-3 text-center ${
                                    isSelected 
                                    ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-100' 
                                    : 'border-transparent bg-gray-50 hover:bg-gray-100 hover:scale-[1.02]'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${m.bg}`}>
                                    <Icon className={`w-5 h-5 ${m.color}`} />
                                </div>
                                <span className={`text-sm font-medium ${isSelected ? 'text-blue-900' : 'text-gray-600'}`}>
                                    {m.name}
                                </span>
                                {isSelected && (
                                    <div className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 2. Transaction Details */}
            <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 ${!method ? 'opacity-50 grayscale pointer-events-none' : 'opacity-100'}`}>
               <label className="block text-sm font-semibold text-gray-700 mb-6 uppercase tracking-wider">2. Transaction Details</label>
               
               <div className="space-y-6">
                 {/* Amount */}
                 <div className="relative group">
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Amount to Withdraw</label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-lg"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                        />
                    </div>
                    {user && (() => {
                        const totalBalance = user.clearedBalance + (user.openingBalance || 0);
                        return (
                            <>
                                <div className="flex justify-between items-center mt-2 px-1">
                                    <span className="text-sm font-bold text-gray-700">Total Balance: ${totalBalance.toLocaleString()}</span>
                                    <button 
                                        type="button" 
                                        onClick={() => setAmount(totalBalance.toString())} 
                                        className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase"
                                    >
                                        Max
                                    </button>
                                </div>
                            </>
                        );
                    })()}
                 </div>

                 {/* Dynamic Fields Section */}
                 {method === 'bank_transfer' && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in slide-in-from-top-2">
                        <div className="md:col-span-2">
                             <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Account Holder Name</label>
                             <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition-all" placeholder="Enter Full Name" />
                             </div>
                        </div>
                        <div>
                             <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Bank Name</label>
                             <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input value={bankName} onChange={e => setBankName(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition-all" placeholder="e.g. Chase Bank" />
                             </div>
                        </div>
                        <div>
                             <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Account Number</label>
                             <div className="relative">
                                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input value={accountNumber} onChange={e => setAccountNumber(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition-all" placeholder="0000 0000 0000" />
                             </div>
                        </div>
                     </div>
                 )}

                 {method === 'crypto' && (
                      <div className="space-y-5 animate-in fade-in slide-in-from-top-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Wallet Address</label>
                            <div className="relative">
                                <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input value={walletAddress} onChange={e => setWalletAddress(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition-all font-mono text-sm" placeholder="0x..." />
                            </div>
                          </div>
                      </div>
                 )}
                 
                 {(method === 'paypal' || method === 'skrill' || method === 'cash_app') && (
                      <div className="space-y-5 animate-in fade-in slide-in-from-top-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Recipient ID / Email</label>
                             <div className="relative">
                                <Send className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition-all" placeholder="user@example.com" />
                             </div>
                          </div>
                      </div>
                 )}

               </div>
            </div>

            <button
                type="submit"
                disabled={!method || !amount || isSubmitting}
                className="group w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl shadow-xl shadow-gray-200 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                     <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        <span>Processing...</span>
                     </>
                ) : (
                    <>
                        <span>Submit</span>
                        <div className="bg-white/20 p-1 rounded-full group-hover:bg-white/30 transition-colors">
                             <ArrowRightIcon className="w-4 h-4" />
                        </div>
                    </>
                )}
            </button>

          </form>
        </div>

        {/* Right Column: Info Panel */}
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg shadow-blue-200">
                <div className="flex items-center gap-3 mb-4">
                     <span className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Calendar className="w-5 h-5" />
                     </span>
                     <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest opacity-70 font-semibold">Today&apos;s Date</span>
                        <span className="font-semibold text-sm">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                     </div>
                </div>
                <div className="h-px bg-white/20 my-4" />
                <p className="text-sm opacity-90 leading-relaxed">
                    Withdrawal requests are processed securely. Please double-check your destination details to avoid irreversible transfers.
                </p>
            </div>

             <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                    Transaction Limits
                </h3>
                <ul className="space-y-4">
                    <LimitItem label="Minimum Withdrawal" value="$50.00" />
                    <LimitItem label="Daily Limit" value="$50,000.00" />
                    <LimitItem label="Monthly Limit" value="$500,000.00" />
                </ul>
            </div>
        </div>
      </div>

      <OTPModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userName={user ? `${user.firstName} ${user.lastName}` : 'User'} 
      />
    </div>
  );
}

const LimitItem = ({ label, value }: { label: string, value: string }) => (
    <li className="flex justify-between items-center text-sm p-3 bg-gray-50 rounded-lg border border-gray-100/50">
        <span className="text-gray-500 font-medium">{label}</span>
        <span className="font-bold text-gray-900">{value}</span>
    </li>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
)
