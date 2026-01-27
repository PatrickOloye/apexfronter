import { api } from '../http/api';

import { Transaction, TransactionStats } from './types';

export const TransactionService = {
  async fetchTransactions(): Promise<Transaction[]> {
    try {
      const { data } = await api.get('/transactions/user-transactions');
      const payload = data?.data ?? data;
      return Array.isArray(payload) ? payload : [];
    } catch (error) {
      console.error('Transaction fetch error:', error);
      return [];
    }
  },

  async fetchTransactionStats(): Promise<TransactionStats> {
    try {
      const transactions = await this.fetchTransactions();
      return this.calculateTransactionStats(transactions);
    } catch (error) {
      console.error('Failed to calculate transaction stats:', error);
      return {
        totalTransactions: 0,
        PENDING: 0,
        CLEARED: 0,
        FAILED: 0,
        CANCELLED: 0
      };
    }
  },

  async createTransaction(transactionData: {
    amount: number;
    type: 'CREDIT' | 'DEBIT';
    description?: string;
    currency?: string;
  }): Promise<Transaction> {
    const { data } = await api.post('/transactions/create', transactionData);
    return data?.data ?? data;
  },

  async updateTransaction(id: string, updateData: Partial<Transaction>): Promise<Transaction> {
    const { data } = await api.patch(`/transactions/${id}`, updateData);
    return data?.data ?? data;
  },

  async deleteTransaction(id: string): Promise<void> {
    await api.delete(`/transactions/${id}`);
  },

  calculateTransactionStats(transactions: Transaction[]): TransactionStats {
    const stats: TransactionStats = {
      totalTransactions: transactions.length,
      PENDING: 0,
      CLEARED: 0,
      FAILED: 0,
      CANCELLED: 0
    };

    transactions.forEach(transaction => {
      if (transaction.status in stats) {
        (stats as any)[transaction.status]++;
      }
    });

    return stats;
  }
};

// Also export individual functions for backward compatibility
export const fetchTransactions = TransactionService.fetchTransactions.bind(TransactionService);
export const fetchTransactionStats = TransactionService.fetchTransactionStats.bind(TransactionService);
export const createTransaction = TransactionService.createTransaction.bind(TransactionService);
export const updateTransaction = TransactionService.updateTransaction.bind(TransactionService);
export const deleteTransaction = TransactionService.deleteTransaction.bind(TransactionService);
export const calculateTransactionStats = TransactionService.calculateTransactionStats.bind(TransactionService);
