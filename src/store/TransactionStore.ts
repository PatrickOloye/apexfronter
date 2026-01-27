import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Transaction, TransactionStats } from '../libs/server-actions/types';
import { 
  fetchTransactions as fetchTransactionsAction, 
  createTransaction as createTransactionAction,
  updateTransaction as updateTransactionAction,
  deleteTransaction as deleteTransactionAction,
  calculateTransactionStats
} from '@/libs/server-actions/transaction';

interface TransactionState {
  transactions: Transaction[];
  stats: TransactionStats;
  isLoading: boolean;
  error: string | null;
  setLoading: (isLoading: boolean) => void;
  // Actions
  fetchTransactions: () => Promise<void>;
  createTransaction: (data: any) => Promise<Transaction>;
  updateTransaction: (id: string, data: any) => Promise<Transaction>;
  deleteTransaction: (id: string) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>()(
  devtools(
    (set, get) => ({
      transactions: [],
      stats: {
        totalTransactions: 0,
        PENDING: 0,
        CLEARED: 0,
        FAILED: 0,
        CANCELLED: 0
      },
      isLoading: false,
      error: null,
      setLoading: (isLoading) => set({ isLoading }),
      fetchTransactions: async () => {
        try {
          set({ isLoading: true, error: null });
          const transactions = await fetchTransactionsAction();
          const stats = await calculateTransactionStats(transactions);
          set({ transactions, stats, isLoading: false });
        } catch (error) {
          console.error('Error fetching transactions:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch transactions', 
            isLoading: false 
          });
        }
      },
      
      createTransaction: async (data) => {
        try {
          set({ isLoading: true, error: null });
          const result = await createTransactionAction(data);
          const transactions = [...get().transactions, result];
          const stats = await calculateTransactionStats(transactions);
          set({ transactions, stats, isLoading: false });
          return result;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to create transaction';
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },
      
      updateTransaction: async (id, data) => {
        try {
          set({ isLoading: true, error: null });
          const updatedTransaction = await updateTransactionAction(id, data);
          const transactions = get().transactions.map(t => 
            t.id === id ? updatedTransaction : t
          );
          const stats = await calculateTransactionStats(transactions);
          set({ transactions, stats, isLoading: false });
          return updatedTransaction;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to update transaction';
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },
      
      deleteTransaction: async (id) => {
        try {
          set({ isLoading: true, error: null });
          await deleteTransactionAction(id);
          const transactions = get().transactions.filter(t => t.id !== id);
          const stats = await calculateTransactionStats(transactions);
          set({ transactions, stats, isLoading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to delete transaction';
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      }
    })
  )
);