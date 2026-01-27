import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface TransactionChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDeposit: () => void;
  onSelectWithdraw: () => void;
}

export const TransactionChoiceModal = ({ isOpen, onClose, onSelectDeposit, onSelectWithdraw }: TransactionChoiceModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="p-8 pb-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Select Transaction Type</h2>
            <p className="text-slate-500">Choose how you would like to move funds today.</p>
        </div>

        <div className="p-8 pt-0 grid gap-4 grid-cols-1 sm:grid-cols-2">
            {/* Deposit Button */}
            <button 
                onClick={onSelectDeposit}
                className="group relative flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 border-slate-100 bg-white hover:border-emerald-500 hover:bg-emerald-50/30 transition-all duration-300"
            >
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <ArrowDownLeft className="w-8 h-8" />
                </div>
                <div className="text-center">
                    <h3 className="font-bold text-lg text-slate-800">Deposit</h3>
                    <p className="text-xs text-slate-400 mt-1">Add funds to account</p>
                </div>
            </button>

            {/* Withdraw Button */}
            <button 
                onClick={onSelectWithdraw}
                className="group relative flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 border-slate-100 bg-white hover:border-rose-500 hover:bg-rose-50/30 transition-all duration-300"
            >
                <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <ArrowUpRight className="w-8 h-8" />
                </div>
                <div className="text-center">
                    <h3 className="font-bold text-lg text-slate-800">Withdraw</h3>
                    <p className="text-xs text-slate-400 mt-1">Cash out funds</p>
                </div>
            </button>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
             <button onClick={onClose} className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
                 Cancel and Close
             </button>
        </div>

      </div>
    </div>
  );
};
