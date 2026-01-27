
'use client';

import { Transaction } from '../../libs/server-actions/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from './status-badge';
import { ActionButtons } from './Action-Button';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

interface TransactionTableProps {
  transactions: Transaction[];
  onView: (transaction: Transaction) => void;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
  isLoading?: boolean;
}

import { useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export const TransactionTable = ({
  transactions,
  onView,
  onEdit,
  onDelete,
  isLoading = false,
}: TransactionTableProps) => {
  const searchParams = useSearchParams();
  const highlightId = searchParams.get('highlight');
  const rowRefs = useRef<{ [key: string]: HTMLTableRowElement | HTMLDivElement | null }>({});

  useEffect(() => {
    if (highlightId && rowRefs.current[highlightId]) {
      rowRefs.current[highlightId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const element = rowRefs.current[highlightId];
      if (element) {
        element.classList.add('bg-yellow-100', 'transition-colors', 'duration-1000');
        setTimeout(() => {
           element.classList.remove('bg-yellow-100');
        }, 3000);
      }
    }
  }, [highlightId, transactions]);

  // Helper function to safely format amount
  const formatAmount = (amount: number | undefined): string => {
    if (amount === undefined || amount === null) return 'N/A';
    return amount.toLocaleString(undefined, {
      style: 'currency',
      currency: 'USD', // Default currency, adjust as needed
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Helper function to safely format date
  const formatDate = (dateString: string | Date | undefined): string => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return 'Invalid date';
    }
  };

  // Loading skeleton rows
  if (isLoading) {
    return (
      <div className="rounded-md border overflow-hidden">
         {/* ... (keep skeleton logic if needed, simplify for brevity/mobile) ... */}
         <div className="p-4 text-center">Loading transactions...</div>
      </div>
    );
  }

  return (
    <div className="rounded-md border-none sm:border overflow-hidden">
      
      {/* Desktop/Tablet Table View */}
      <div className="hidden md:block overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[50px]">S/N</TableHead>
              <TableHead className="min-w-[120px]">Reference</TableHead>
              <TableHead className="text-right min-w-[100px]">Amount</TableHead>
              <TableHead className="min-w-[80px]">Type</TableHead>
              <TableHead className="min-w-[120px]">Account</TableHead>
              <TableHead className="min-w-[100px]">Status</TableHead>
              <TableHead className="min-w-[100px]">Date</TableHead>
              <TableHead className="text-right min-w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction, index) => (
                <TableRow
                  key={transaction.id ?? `row-${index}`}
                  ref={(el) => { if(transaction.id) rowRefs.current[transaction.id] = el; }}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    {transaction.reference || 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatAmount(transaction.amount)}
                  </TableCell>
                  <TableCell className="capitalize">
                    {transaction.type?.toLowerCase() || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{transaction.accountNumber || 'N/A'}</span>
                      {transaction.accountName && (
                        <span className="text-xs text-gray-500">
                          {transaction.accountName}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={transaction.status} />
                  </TableCell>
                  <TableCell>
                    {formatDate(transaction.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <ActionButtons
                      transaction={transaction}
                      onView={() => onView(transaction)}
                      onEdit={() => onEdit(transaction)}
                      onDelete={() => onDelete(transaction)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 pb-20">
        {transactions.length === 0 ? (
           <div className="text-center py-12 text-gray-500 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
             <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📝</span>
             </div>
             <p>No transactions found</p>
           </div>
        ) : (
           transactions.map((transaction) => (
             <div 
                key={transaction.id}
                ref={(el) => { if(transaction.id) rowRefs.current[transaction.id] = el as any; }}
                className="group relative bg-white rounded-2xl p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
             >
                {/* Decorative background accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${
                    transaction.type === 'CREDIT' ? 'from-emerald-50/50 to-teal-50/50' : 'from-red-50/50 to-rose-50/50'
                } rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110`} />

                <div className="relative">
                    {/* Header: Date & Status */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Reference</span>
                            <span className="font-mono text-sm text-gray-600 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">{transaction.reference}</span>
                        </div>
                        <StatusBadge status={transaction.status} />
                    </div>
                    
                    {/* Main Amount Display */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                transaction.type === 'CREDIT' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                            }`}>
                                {transaction.type === 'CREDIT' ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                    </svg>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-2xl font-bold tracking-tight ${
                                    transaction.type === 'CREDIT' ? 'text-emerald-900' : 'text-gray-900'
                                }`}>
                                    {transaction.type === 'DEBIT' ? '-' : '+'}{formatAmount(transaction.amount)}
                                </span>
                                <span className="text-xs text-gray-400 font-medium">
                                    {formatDate(transaction.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">{transaction.type}</span>
                        <div className="flex gap-2">
                             <ActionButtons
                                transaction={transaction}
                                onView={() => onView(transaction)}
                                onEdit={() => onEdit(transaction)}
                                onDelete={() => onDelete(transaction)}
                            />
                        </div>
                    </div>
                </div>
             </div>
           ))
        )}
      </div>

    </div>
  );
};
