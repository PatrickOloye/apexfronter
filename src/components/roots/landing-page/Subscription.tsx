'use client';
import { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

const Toast = ({ message, type = 'success', onClose }: ToastProps) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center animate-fade-in">
      <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2`}>
        {type === 'success' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )}
        <span>{message}</span>
        <button 
          onClick={onClose}
          className="ml-4 hover:text-gray-200 focus:outline-none"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (!email.trim()) {
      setIsValidEmail(false);
      setToastMessage('Please enter your email address');
      setToastType('error');
      setShowToast(true);
      return;
    }
    
    if (!validateEmail(email)) {
      setIsValidEmail(false);
      setToastMessage('Please enter a valid email address');
      setToastType('error');
      setShowToast(true);
      return;
    }
    
    setIsValidEmail(true);
    setToastMessage('Thank you for subscribing to APEX Banking updates!');
    setToastType('success');
    setShowToast(true);
    setEmail('');
    
    console.log('Subscribed email:', email);
  };
  
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showToast]);
  
  return (
    <div className="w-full bg-gradient-to-b from-blue-600 to-blue-800 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Stay Informed</h2>
        <p className="text-lg text-blue-100 mb-2">
          Get the latest financial insights and banking updates from APEX
        </p>
        <p className="text-blue-200 mb-8">
          We&apos;ll send you valuable content once or twice a month. <span className="text-blue-300">No spam, ever.</span>
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
          <div className="flex-grow">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsValidEmail(true);
              }}
              className={`w-full px-4 py-3 rounded-lg bg-blue-900/50 text-white placeholder-blue-300 border ${
                isValidEmail ? 'border-blue-700' : 'border-red-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {!isValidEmail && (
              <p className="text-red-400 text-sm mt-1 text-left">
                Please enter a valid email address
              </p>
            )}
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg transition-colors duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-blue-50"
          >
            Subscribe
          </button>
        </form>
      </div>
      
      {showToast && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
}