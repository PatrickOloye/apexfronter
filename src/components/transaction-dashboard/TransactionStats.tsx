// import React from 'react';
// import { TransactionStatus } from '../../libs/server-actions/types';

// interface TransactionStatsProps {
//   totalTransactions: number;
//   statusCounts: Record<TransactionStatus, number>;
// }

// const TransactionStats: React.FC<TransactionStatsProps> = ({ totalTransactions, statusCounts }) => {
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
//     <div className="bg-white rounded-lg shadow p-6 mb-6">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction Overview</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//         <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
//           <p className="text-sm text-blue-600 font-medium">Total Transactions</p>
//           <p className="text-2xl font-bold text-blue-800">{totalTransactions}</p>
//         </div>
        
//         {Object.entries(statusCounts).map(([status, count]) => (
//           <div key={status} className={`p-4 rounded-lg border ${getStatusColor(status as TransactionStatus)}`}>
//             <p className="text-sm font-medium capitalize">{status.toLowerCase()}</p>
//             <p className="text-2xl font-bold">{count}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TransactionStats;





import { Card, CardContent, CardHeader, CardTitle } from './card';



interface TransactionStats  {
  totalTransactions: number;
  PENDING: number;
  CLEARED: number;
  FAILED: number;
  CANCELLED: number;
  // setLoading: boolean
};


interface TransactionStatsProps {
  stats: TransactionStats;
}

export const TransactionStats = ({ stats }: TransactionStatsProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Transaction Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Total Transactions"
            value={stats.totalTransactions}
            className="bg-blue-50 text-blue-600"
          />
          <StatCard
            title="Pending"
            value={stats.PENDING}
            className="bg-yellow-50 text-yellow-600"
          />
          <StatCard
            title="Cleared"
            value={stats.CLEARED}
            className="bg-green-50 text-green-600"
          />
          <StatCard
            title="Failed"
            value={stats.FAILED}
            className="bg-red-50 text-red-600"
          />
          <StatCard
            title="Cancelled"
            value={stats.CLEARED}
            className="bg-gray-50 text-gray-600"
          />
        </div>
      </CardContent>
    </Card>
  );
};

const StatCard = ({
  title,
  value,
  className,
}: {
  title: string;
  value: number;
  className?: string;
}) => {
  return (
    <div className={`p-4 rounded-lg ${className}`}>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};