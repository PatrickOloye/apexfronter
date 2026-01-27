'use client';

import { useState, useEffect } from 'react';
import { TransactionStats } from '../../../components/transaction-dashboard/TransactionStats';
import { TransactionTable } from '../../../components/transaction-dashboard/TransactionTable';
import TransactionTypeModal from '../../../components/transaction-dashboard/types';
import { TransactionSummaryModal } from '../../../components/transaction-dashboard/TransactionSummary';
import { TransactionDetailsModal } from '../../../components/transaction-dashboard/TransactionDetails.modal';
import { UpdateTransactionModal } from '../../../components/transaction-dashboard/UpdateTransaction.modal';
import { DeleteConfirmationModal } from '../../../components/transaction-dashboard/DeleteConfirmation.modal';
import { Button } from '../../../components/transaction-dashboard/button';
import { Plus, RefreshCw } from 'lucide-react';
import { Transaction, TransactionForm, TransactionType } from '../../../libs/server-actions/types';
import { toast } from 'sonner';
import { useTransactionStore } from '../../../store/TransactionStore';
import { TransactionChoiceModal } from '../../../components/transaction-dashboard/TransactionChoiceModal';
import { DepositRestrictedModal } from '../../../components/transaction-dashboard/DepositRestrictedModal';
import { useRouter } from 'next/navigation';

export default function TransactionsPage() {
  // Use the store
  const { 
    transactions, 
    stats, 
    isLoading, 
    error, 
    fetchTransactions, 
    createTransaction, 
    updateTransaction, 
    deleteTransaction,
    setLoading
  } = useTransactionStore();

  const router = useRouter();

  // Local state for UI controls
  const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);
  const [isRestrictedModalOpen, setIsRestrictedModalOpen] = useState(false);
  
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false); // Deprecated but kept for safe ref
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [newTransactionData, setNewTransactionData] = useState<any>(null);
  

  // Load data on component mount
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Show error toast if fetch fails
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleCreateTransaction = async (formData: any) => {
    setNewTransactionData(formData);
    setIsSummaryModalOpen(true);
  };

  const handleConfirmCreate = async () => {
    try {
      await createTransaction(newTransactionData);
      setIsSummaryModalOpen(false);
      toast.success('Transaction created successfully');
    } catch (error) {
      toast.error('Failed to create transaction');
      console.error(error);
    }
  };

  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailsModalOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateTransaction = async (updateData: any) => {
    try {
      if (!selectedTransaction) return;
      setLoading(true);
      await updateTransaction(selectedTransaction.id, updateData);
      await fetchTransactions();
      setIsUpdateModalOpen(false);
      toast.success('Transaction updated successfully');
    } catch (error) {
      toast.error('Failed to update transaction');
      console.error(error);
    }
  };

  const handleDeleteTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!selectedTransaction) return;
      await deleteTransaction(selectedTransaction.id);
      setIsDeleteModalOpen(false);
      toast.success('Transaction deleted successfully');
    } catch (error) {
      toast.error('Failed to delete transaction');
      console.error(error);
    }
  };

  return (
    <div className="h-full overflow-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Transactions</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={() => fetchTransactions()} disabled={isLoading} className="w-full sm:w-auto">
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => setIsChoiceModalOpen(true)} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
            <Plus className="mr-2 h-4 w-4" />
            New Transaction
          </Button>
        </div>
      </div>

      <TransactionStats stats={stats} />
      
      {isLoading && transactions.length === 0 ? (
        <div className="flex justify-center items-center p-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-600"></div>
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No transactions found. Create a new transaction to get started.</p>
        </div>
      ) : (
        <TransactionTable
          transactions={transactions}
          onView={handleViewTransaction}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
      )}

      {/* Use the TransactionChoiceModal component instead */}
      {/* <TransactionTypeModal
        isOpen={isTypeModalOpen}
        onClose={() => setIsTypeModalOpen(false)}
      /> */}

      <TransactionChoiceModal
        isOpen={isChoiceModalOpen}
        onClose={() => setIsChoiceModalOpen(false)}
        onSelectDeposit={() => {
            setIsChoiceModalOpen(false);
            setIsRestrictedModalOpen(true);
        }}
        onSelectWithdraw={() => {
            setIsChoiceModalOpen(false);
            router.push('/dashboard/withdraw');
        }}
      />

      <DepositRestrictedModal
        isOpen={isRestrictedModalOpen}
        onClose={() => setIsRestrictedModalOpen(false)}
      />

      <TransactionSummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        onConfirm={handleConfirmCreate}
        transactionData={newTransactionData}
        isLoading={isLoading}
      />

      {selectedTransaction && (
        <>
          <TransactionDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            transaction={selectedTransaction}
          />

          <UpdateTransactionModal
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            onSubmit={handleUpdateTransaction}
            transaction={selectedTransaction}
            isLoading={isLoading}
          />

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
    </div>
  );
}