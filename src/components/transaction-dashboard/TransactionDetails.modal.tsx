// import React from 'react';
// import { Transaction, TransactionStatus } from '../../libs/server-actions/types';
// import { FiX } from 'react-icons/fi';

// interface TransactionDetailsModalProps {
//   transaction: Transaction | null;
//   onClose: () => void;
// }

// const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({ transaction, onClose }) => {
//   if (!transaction) return null;

//   const getStatusColor = (status: TransactionStatus) => {
//     switch (status) {
//       case TransactionStatus.PENDING:
//         return 'bg-yellow-100 text-yellow-800';
//       case TransactionStatus.CLEARED:
//         return 'bg-green-100 text-green-800';
//       case TransactionStatus.FAILED:
//         return 'bg-red-100 text-red-800';
//       case TransactionStatus.CANCELLED:
//         return 'bg-gray-100 text-gray-800';
//       default:
//         return 'bg-blue-100 text-blue-800';
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center border-b p-4">
//           <h2 className="text-xl font-semibold text-gray-800">Transaction Details</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <FiX className="h-6 w-6" />
//           </button>
//         </div>

//         <div className="p-6 space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <p className="text-sm text-gray-500">Reference</p>
//               <p className="text-sm font-medium">{transaction.reference}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Status</p>
//               <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
//                 {transaction.status.toLowerCase()}
//               </span>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Type</p>
//               <p className="text-sm font-medium capitalize">{transaction.type.toLowerCase()}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Form</p>
//               <p className="text-sm font-medium">{transaction.form.split('_').join(' ')}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Category</p>
//               <p className="text-sm font-medium capitalize">{transaction.category.toLowerCase()}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Amount</p>
//               <p className="text-sm font-medium">{transaction.amount.toFixed(2)}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Account Number</p>
//               <p className="text-sm font-medium">{transaction.accountNumber}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Account Name</p>
//               <p className="text-sm font-medium">{transaction.accountName}</p>
//             </div>
//             {transaction.bankName && (
//               <div>
//                 <p className="text-sm text-gray-500">Bank Name</p>
//                 <p className="text-sm font-medium">{transaction.bankName}</p>
//               </div>
//             )}
//             <div>
//               <p className="text-sm text-gray-500">SWIFT/IBAN Code</p>
//               <p className="text-sm font-medium">{transaction.swiftIbanCode}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Currency</p>
//               <p className="text-sm font-medium">{transaction.currency}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Exchange Rate</p>
//               <p className="text-sm font-medium">{transaction.exchangeRate}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Is Beneficiary</p>
//               <p className="text-sm font-medium">{transaction.isBeneficiary ? 'Yes' : 'No'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Is International</p>
//               <p className="text-sm font-medium">{transaction.isInternational ? 'Yes' : 'No'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Created At</p>
//               <p className="text-sm font-medium">{new Date(transaction.createdAt).toLocaleString()}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Updated At</p>
//               <p className="text-sm font-medium">{new Date(transaction.updatedAt).toLocaleString()}</p>
//             </div>
//             {transaction.clearedAt && (
//               <div>
//                 <p className="text-sm text-gray-500">Cleared At</p>
//                 <p className="text-sm font-medium">{new Date(transaction.clearedAt).toLocaleString()}</p>
//               </div>
//             )}
//           </div>

//           {transaction.description && (
//             <div>
//               <p className="text-sm text-gray-500">Description</p>
//               <p className="text-sm font-medium">{transaction.description}</p>
//             </div>
//           )}

//           {transaction.narration && (
//             <div>
//               <p className="text-sm text-gray-500">Narration</p>
//               <p className="text-sm font-medium">{transaction.narration}</p>
//             </div>
//           )}

//           {transaction.comments && (
//             <div>
//               <p className="text-sm text-gray-500">Comments</p>
//               <p className="text-sm font-medium">{transaction.comments}</p>
//             </div>
//           )}
//         </div>

//         <div className="flex justify-end p-4 border-t">
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionDetailsModal;


// components/transactions/modals/ViewTransactionModal.tsx
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from '@/components/ui/dialog';
  import { Button } from './button';
  import { Transaction } from '../../libs/server-actions/types';
  import { format } from 'date-fns';
  import { StatusBadge } from './status-badge';
  import React from 'react';
  
  interface TransactionDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: Transaction;
  }
  
  interface TransactionDetail {
    label: string;
    value: string |  React.ReactNode;
  }
  
  export const TransactionDetailsModal = ({
    isOpen,
    onClose,
    transaction,
  }: TransactionDetailsModalProps) => {
    // Create a properly typed array of transaction details
    const transactionDetails: TransactionDetail[] = [
      { label: 'Reference', value: transaction.reference },
      { label: 'Amount', value: transaction.amount.toLocaleString() },
      { label: 'Type', value: transaction.type },
      { label: 'Form', value: transaction.form },
      { label: 'Category', value: transaction.category },
      { label: 'Status', value: <StatusBadge status={transaction.status} /> },
      { label: 'Account Number', value: transaction.accountNumber },
      { label: 'Account Name', value: transaction.accountName },
      { label: 'Bank Name', value: transaction.bankName || 'N/A' },
      { label: 'Swift/Iban Code', value: transaction.swiftIbanCode },
      { label: 'Narration', value: transaction.narration },
      { label: 'Is Beneficiary', value: transaction.isBeneficiary ? 'Yes' : 'No' },
      { label: 'Is International', value: transaction.isInternational ? 'Yes' : 'No' },
      { label: 'Currency', value: transaction.currency },
      { label: 'Exchange Rate', value: transaction.exchangeRate?.toString() || '1.0' },
      { label: 'Created At', value: format(new Date(transaction.createdAt), 'MMM dd, yyyy HH:mm') },
      { label: 'Updated At', value: format(new Date(transaction.updatedAt), 'MMM dd, yyyy HH:mm') },
      ...(transaction.clearedAt ? [{
        label: 'Cleared At',
        value: format(new Date(transaction.clearedAt), 'MMM dd, yyyy HH:mm'),
      }] : []),
      { label: 'Description', value: transaction.description || 'N/A' },
    ];
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {transactionDetails.map((detail, index) => (
                <div key={index}>
                  <p className="text-sm font-medium text-gray-500">{detail.label}</p>
                  <p className="text-sm">{detail.value}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };