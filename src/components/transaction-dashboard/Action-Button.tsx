import { Transaction } from '../../libs/server-actions/types';
import { Eye, Pencil, Trash2, RefreshCw  } from 'lucide-react';
import {Button}  from './button';
import { useAuthStore } from '@/store/AuthStore';




interface ActionButtonsProps {
  transaction: Transaction;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}



export const ActionButtons = ({ transaction, onView, onEdit, onDelete }: ActionButtonsProps) => {

  const { user } = useAuthStore();
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'USER';

  return (
    <div className="flex space-x-2">
      <Button
        variant="ghost"
        size="sm"
        className="text-green-600 hover:bg-green-50"
        onClick={onView}
      >
        <Eye className="h-4 w-4" />
      </Button>
      {!isAdmin && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="text-yellow-600 hover:bg-yellow-50"
            onClick={onEdit}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:bg-red-50"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
};