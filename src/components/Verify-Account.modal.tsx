import { useState, useEffect } from 'react';
import { X, Home, LayoutDashboard, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface AwesomeModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export default function AwesomeModal({ isOpen = false, onClose }: AwesomeModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle animation states when isOpen prop changes
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the modal is in the DOM before animating
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  // Handle close with animation
  const handleClose = () => {
    setIsAnimating(false);
    // Delay the actual closing to allow the animation to complete
    setTimeout(() => onClose(), 300);
  };

  // If not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Modal Content */}
      <div 
        className={`bg-white rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden transform transition-all duration-300 ${
          isAnimating ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
        }`}
      >
        {/* Decorative top banner */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2" />
        
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>
        
        {/* Modal header */}
        <div className="p-6 pb-0">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="mr-2">✨</span> 
            Hello APEXIAN!
            <span className="ml-2">✨</span>
          </h3>
        </div>
        
        {/* Modal body */}
        <div className="p-6 pt-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-gray-700 font-medium flex items-start">
              <AlertCircle size={20} className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                Your account needs verification! Please contact your Virtual Agent or visit an 
                <span className="font-semibold text-amber-700"> APEX Hall </span> 
                to complete this process.
              </span>
            </p>
          </div>
          
          {/* Working animation */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center p-2">
              <div className="w-full h-full rounded-full bg-blue-400 flex items-center justify-center animate-pulse">
                <svg className="w-10 h-10 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modal footer with buttons */}
        <div className="p-6 pt-0 grid grid-cols-2 gap-4">
          <button 
            onClick={handleClose} 
            className="w-full flex items-center justify-center gap-2 py-3 bg-gray-400 text-black rounded-lg hover:bg-gray-300 transition-colors duration-200 shadow-md font-medium"
          >
            <X size={18} />
            <span>Close</span>
          </button>
          <Link href="/dashboard" className="w-full">
            <button 
              className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium"
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>
          </Link>
        </div>
        
        {/* Decorative bottom accents */}
        <div className="flex">
          <div className="w-1/3 h-1 bg-indigo-500"></div>
          <div className="w-1/3 h-1 bg-purple-500"></div>
          <div className="w-1/3 h-1 bg-pink-500"></div>
        </div>
      </div>
    </div>
  );
}