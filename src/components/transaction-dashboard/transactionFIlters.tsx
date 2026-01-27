// import React from 'react';
// import { useTransactionStore } from '../../store/TransactionStore';
// import { TransactionStatus, TransactionType } from '../../libs/server-actions/types';
// import { FiFilter, FiX } from 'react-icons/fi';

// const TransactionFilters: React.FC = () => {
//   const {
//     filters,
//     setFilter,
//     clearFilters,
//     sortConfig,
//     setSortConfig,
//   } = useTransactionStore();

//   const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFilter({ [name]: value === 'ALL' ? 'ALL' : value });
//   };

//   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFilter({ [name]: value || null });
//   };

//   const handleSort = (key: string) => {
//     setSortConfig(key);
//   };

//   const isFilterActive =
//     filters.status !== 'ALL' ||
//     filters.type !== 'ALL' ||
//     filters.startDate ||
//     filters.endDate;

//   return (
//     <div className="bg-white p-4 rounded-lg shadow mb-4">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-medium text-gray-700 flex items-center">
//           <FiFilter className="mr-2" />
//           Filters & Sorting
//         </h3>
//         {isFilterActive && (
//           <button
//             onClick={clearFilters}
//             className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
//           >
//             <FiX className="mr-1" />
//             Clear Filters
//           </button>
//         )}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//           <select
//             name="status"
//             value={filters.status}
//             onChange={handleFilterChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="ALL">All Statuses</option>
//             {Object.values(TransactionStatus).map((status) => (
//               <option key={status} value={status}>
//                 {status.toLowerCase()}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
//           <select
//             name="type"
//             value={filters.type}
//             onChange={handleFilterChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="ALL">All Types</option>
//             {Object.values(TransactionType).map((type) => (
//               <option key={type} value={type}>
//                 {type.toLowerCase()}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
//           <input
//             type="date"
//             name="startDate"
//             value={filters.startDate || ''}
//             onChange={handleDateChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
//           <input
//             type="date"
//             name="endDate"
//             value={filters.endDate || ''}
//             onChange={handleDateChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>

//       <div className="mt-4">
//         <h4 className="text-sm font-medium text-gray-700 mb-2">Sort By:</h4>
//         <div className="flex space-x-2">
//           <button
//             onClick={() => handleSort('createdAt')}
//             className={`px-3 py-1 text-sm rounded-md ${
//               sortConfig.key === 'createdAt'
//                 ? 'bg-blue-100 text-blue-800'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             Date {sortConfig.key === 'createdAt' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
//           </button>
//           <button
//             onClick={() => handleSort('amount')}
//             className={`px-3 py-1 text-sm rounded-md ${
//               sortConfig.key === 'amount'
//                 ? 'bg-blue-100 text-blue-800'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
//           </button>
//           <button
//             onClick={() => handleSort('status')}
//             className={`px-3 py-1 text-sm rounded-md ${
//               sortConfig.key === 'status'
//                 ? 'bg-blue-100 text-blue-800'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             Status {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionFilters;