// Login Error Modal Component
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface LoginErrorModalProps {
  error: string | null;
  onClose?: () => void;
}

export default function LoginErrorModal({ error, onClose }: LoginErrorModalProps) {
  const [isOpen, setIsOpen] = useState(!!error);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (error) {
      setIsOpen(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsOpen(false), 300);
    }
  }, [error]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsOpen(false);
      if (onClose) onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className={`bg-white rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden transform transition-all duration-300 ${
          isAnimating ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
        }`}
      >
        {/* Decorative top banner */}
        <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 h-2" />
        
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          <X size={18} />
        </button>
        
        {/* Modal header */}
        <div className="p-6 pb-2">
          <h3 className="text-2xl font-bold text-gray-800">Authentication Error</h3>
        </div>
        
        {/* Modal body */}
        <div className="p-6 pt-2">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-gray-700 font-medium">Login failed</p>
          </div>
          
          <p className="text-gray-600 mb-4">
            {error || "There was a problem processing your login. Please try again."}
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm">
            <p className="font-medium mb-2">Common issues:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Check your email and password</li>
              <li>Verify the server is online</li>
              <li>Check your network connection</li>
            </ul>
          </div>
        </div>
        
        {/* Modal footer */}
        <div className="p-6 pt-0 flex justify-end">
          <button 
            onClick={handleClose}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md"
          >
            Close
          </button>
        </div>
        
        {/* Decorative bottom accent */}
        <div className="h-1 bg-gray-100"></div>
      </div>
    </div>
  );
}