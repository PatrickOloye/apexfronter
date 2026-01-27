import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export const OTPModal = ({ isOpen, onClose, userName }: OTPModalProps) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setOtp('');
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;

    setIsLoading(true);
    
    // Simulate network delay and always return Invalid OTP
    setTimeout(() => {
      setIsLoading(false);
      toast.error('Invalid OTP');
    }, 3000); 
  };

  const handleReturn = () => {
    onClose();
    router.push('/dashboard/transactions');
  };

  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4 text-white relative">
          <h2 className="text-xl font-bold">Account Verification</h2>
          <p className="text-blue-100 text-sm mt-1">Security Check</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 text-white/80 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Verify It&apos;s You</h3>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                  Hello <span className="font-bold text-gray-900">{userName}</span>, OTP is required to activate transfer/withdrawal. Please contact support.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enter One-Time Password (OTP)</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    onPaste={(e) => {
                      e.preventDefault();
                      toast.error('Pasting is not allowed for security reasons');
                    }}
                    placeholder="• • • • • •"
                    className="w-full text-center text-2xl tracking-[0.5em] font-bold py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 outline-none transition-all placeholder:text-gray-300"
                    maxLength={6}
                    disabled={isLoading}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading || otp.length < 4}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-200 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        Verifying...
                      </>
                    ) : (
                      'Submit Verification'
                    )}
                  </button>
                  <div className="mt-4 text-center">
                      <button
                        type="button"
                        onClick={handleReturn}
                        className="text-sm text-gray-500 hover:text-gray-800 underline transition-colors"
                      >
                        Return to Transactions
                      </button>
                  </div>
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  );
};
