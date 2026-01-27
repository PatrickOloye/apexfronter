// import React, { useState } from 'react';
// import { Transaction, TransactionStatus, UpdateTransactionDto } from '../../libs/server-actions/types';
// import { FiX } from 'react-icons/fi';
// import DeleteConfirmationModal from './DeleteConfirmation.modal';

// interface UpdateTransactionModalProps {
//   transaction: Transaction | null;
//   onClose: () => void;
//   onUpdate: (id: string, data: UpdateTransactionDto) => Promise<void>;
// }

// const UpdateTransactionModal: React.FC<UpdateTransactionModalProps> = ({ 
//   transaction, 
//   onClose, 
//   onUpdate 
// }) => {
//   const [formData, setFormData] = useState<UpdateTransactionDto>({
//     status: transaction?.status || TransactionStatus.PENDING,
//     comments: transaction?.comments || '',
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setShowConfirm(true);
//   };

//   const handleConfirm = async () => {
//     if (!transaction) return;
    
//     setIsLoading(true);
//     try {
//       await onUpdate(transaction.id, formData);
//       onClose();
//     } finally {
//       setIsLoading(false);
//       setShowConfirm(false);
//     }
//   };

//   if (!transaction) return null;

//   return (
//     <>
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//           <div className="flex justify-between items-center border-b p-4">
//             <h2 className="text-xl font-semibold text-gray-800">Update Transaction</h2>
//             <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//               <FiX className="h-6 w-6" />
//             </button>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="p-6 space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Reference</p>
//                   <p className="text-sm font-medium">{transaction.reference}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Amount</p>
//                   <p className="text-sm font-medium">{transaction.amount.toFixed(2)}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Type</p>
//                   <p className="text-sm font-medium capitalize">{transaction.type.toLowerCase()}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Form</p>
//                   <p className="text-sm font-medium">{transaction.form.split('_').join(' ')}</p>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 >
//                   {Object.values(TransactionStatus).map(status => (
//                     <option key={status} value={status}>
//                       {status.toLowerCase()}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
//                 <textarea
//                   name="comments"
//                   value={formData.comments || ''}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                   rows={3}
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end space-x-3 p-4 border-t">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
//               >
//                 Update
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {showConfirm && (
//         <DeleteConfirmationModal
//           isOpen={showConfirm}
//           onClose={() => setShowConfirm(false)}
//           onConfirm={handleConfirm}
//           title="Confirm Update"
//           message="Are you sure you want to update this transaction?"
//           confirmText="Update"
//           isLoading={isLoading}
//         />
//       )}
//     </>
//   );
// };

// export default UpdateTransactionModal;


import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from './button';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Transaction, TransactionStatus } from '../../libs/server-actions/types';

interface UpdateTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  transaction: Transaction;
  isLoading?: boolean;
}

export const UpdateTransactionModal = ({
  isOpen,
  onClose,
  onSubmit,
  transaction,
  isLoading
}: UpdateTransactionModalProps) => {
  const [formData, setFormData] = useState({
    status: transaction.status,
    description: transaction.description || '',
    comments: '',
  });

  const handleStatusChange = (value: TransactionStatus) => {
    setFormData({
      ...formData,
      status: value,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={isLoading ? undefined : onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={handleStatusChange}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(TransactionStatus).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="comments">Comments</Label>
              <Input
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                placeholder="Enter any additional comments"
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
