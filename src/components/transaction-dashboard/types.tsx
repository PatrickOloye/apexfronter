// app/components/transaction-dashboard/TransactionTypeModal.tsx
import React, { useState } from 'react';
import { X, CreditCard, ArrowUpRight, BanknoteIcon, RefreshCw } from 'lucide-react';
import { CreateTransactionModal } from '@/components/transaction-dashboard/CreateTransaction.modal';
import { TransactionForm, TransactionType } from '@/libs/server-actions/types';

interface TransactionTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * TransactionTypeModal component that allows users to select a transaction type
 * and then opens the appropriate transaction form
 */
const TransactionTypeModal: React.FC<TransactionTypeModalProps> = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState<{
    transactionType: TransactionType;
    form: TransactionForm;
    label: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleTypeSelect = (transactionType: TransactionType, form: TransactionForm, label: string) => {
    setSelectedType({ transactionType, form, label });
  };

  const handleClose = () => {
    setSelectedType(null);
    onClose();
  };

  // Handle dummy submission for the modal within the type selection
  const handleDummySubmit = async (formData: any) => {
    console.log('Transaction data:', formData);
    setSelectedType(null);
  };

  const transactionTypes = [
    {
      transactionType: 'CREDIT' as TransactionType,
      form: 'WIRE_DEPOSIT' as TransactionForm,
      label: 'Wire Deposit',
      description: 'Receive funds via wire transfer',
      icon: <CreditCard className="h-8 w-8 text-green-700" />
    },
    {
      transactionType: 'DEBIT' as TransactionType,
      form: 'WIRE_TRANSFER' as TransactionForm,
      label: 'Wire Transfer',
      description: 'Send funds via wire transfer',
      icon: <ArrowUpRight className="h-8 w-8 text-red-700" />
    },
    {
      transactionType: 'CREDIT' as TransactionType,
      form: 'ONLINE_TRANSACTION' as TransactionForm,
      label: 'Online Deposit',
      description: 'Deposit funds online',
      icon: <BanknoteIcon className="h-8 w-8 text-blue-700" />
    },
    {
      transactionType: 'DEBIT' as TransactionType,
      form: 'ONLINE_TRANSACTION' as TransactionForm,
      label: 'Online Payment',
      description: 'Make an online payment',
      icon: <RefreshCw className="h-8 w-8 text-purple-700" />
    }
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={handleClose}></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-11/12 max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Select Transaction Type</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {transactionTypes.map((item, index) => (
            <div
              key={index}
              onClick={() => handleTypeSelect(item.transactionType, item.form, item.label)}
              className="p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-colors"
            >
              <div className="flex flex-col items-center">
                {item.icon}
                <h3 className="mt-2 font-medium">{item.label}</h3>
                <p className="text-sm text-gray-500 text-center mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed: Added the required onSubmit prop */}
      {selectedType && (
        <CreateTransactionModal
          isOpen={!!selectedType}
          onClose={() => setSelectedType(null)}
          transactionType={selectedType.transactionType}
          transactionForm={selectedType.form}
          transactionLabel={selectedType.label}
          onSubmit={handleDummySubmit}
        />
      )}
    </>
  );
};

export default TransactionTypeModal;