'use client';

import { motion } from 'framer-motion';

const CheckingAccountSummary = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-blue-900 to-blue-800">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.01 }}
          className="bg-slate-800/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-slate-700/50 shadow-lg"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-400">
            The Modern Checking Experience
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-blue-500 mx-auto my-6 rounded-full"></div>
          <p className="text-lg md:text-xl text-slate-300 mb-6">
            Apex Finance&apos;s Standard Checking Account is designed for today&apos;s financial needs. 
            With unlimited transactions, instant debit card access, and award-winning digital banking, 
            it&apos;s the perfect foundation for managing your daily finances.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full border border-blue-700/50">
              No minimum balance
            </div>
            <div className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full border border-blue-700/50">
              Mobile check deposit
            </div>
            <div className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full border border-blue-700/50">
              Bill pay included
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckingAccountSummary;