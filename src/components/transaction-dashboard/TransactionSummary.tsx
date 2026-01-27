import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from '@/components/ui/dialog';
  import { Button } from './button';
//   import { Transaction } from '../../libs/server-actions/types';

interface TransactionSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  transactionData: any; // You can make this more specific if needed
  onModify?: () => void;
  isLoading?: boolean;
}
  
  export const TransactionSummaryModal = ({
  isOpen,
  onClose,
  onConfirm,
  transactionData,
  onModify,
  isLoading
}: TransactionSummaryModalProps) => {
  if (!transactionData) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={isLoading ? undefined : onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Transaction Summary</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(transactionData).map(([key, value]) => (
              <div key={key} className="border-b pb-2">
                <p className="text-sm font-medium text-gray-500 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-sm font-semibold">
                  {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
                </p>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onModify} disabled={isLoading}>
            Modify
          </Button>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? (
               <>
                 <span className="animate-spin mr-2">⏳</span> Processing...
               </>
            ) : 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};