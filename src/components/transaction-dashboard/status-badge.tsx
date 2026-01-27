import { TransactionStatus } from "@/libs/server-actions/types";
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: TransactionStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusColors = {
    [TransactionStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
    [TransactionStatus.CLEARED]: 'bg-green-100 text-green-800',
    [TransactionStatus.FAILED]: 'bg-red-100 text-red-800',
    [TransactionStatus.CANCELLED]: 'bg-gray-100 text-gray-800',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        statusColors[status],
        className
      )}
    >
      {status}
    </span>
  );
};