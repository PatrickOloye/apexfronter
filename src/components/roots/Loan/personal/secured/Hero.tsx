'use client';

import { useEffect, useState } from 'react';

const phrases = [
  "Debt Consolidation",
  "Home Improvements",
  "Vehicle Purchases",
  "Credit Building",
  "Emergency Expenses"
];

export default function SecuredLoanHero() {
  // For typewriter effect
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Animation for the benefits badges
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setVisible(true);
    
    // Typewriter effect logic
    const typeWriterEffect = () => {
      const current = phrases[currentIndex];
      
      if (isDeleting) {
        setCurrentPhrase(current.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        setTypingSpeed(50); // Faster when deleting
      } else {
        setCurrentPhrase(current.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        setTypingSpeed(150); // Normal typing speed
      }
      
      // Handle transitions between typing and deleting
      if (!isDeleting && charIndex === current.length) {
        setTimeout(() => setIsDeleting(true), 1500); // Pause at the end
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCurrentIndex((currentIndex + 1) % phrases.length);
        setTypingSpeed(150);
      }
    };
    
    const timer = setTimeout(typeWriterEffect, typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, currentIndex, isDeleting, typingSpeed]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-tr from-blue-900 via-blue-800 to-blue-700 text-white">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 -left-24 w-80 h-80 bg-indigo-400 rounded-full opacity-20 animate-pulse delay-700"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600 rounded-full opacity-15 animate-pulse delay-1000"></div>
        
        {/* Abstract geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-indigo-300 border-opacity-20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 border-2 border-purple-400 border-opacity-20 rounded-full animate-pulse delay-500"></div>
      </div>
      
      {/* Main hero content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Apex Finance Logo - redesigned as text only */}
          <div className="flex items-center justify-center md:justify-start mb-8">
            <div className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
              APEX FINANCE
            </div>
          </div>
          
          {/* Main heading with reveal animation */}
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-1000 transform ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            Unlock Your Financial Potential with Secured Personal Loans
          </h1>
          
          {/* Subheading with typewriter effect */}
          <div className="mb-10 h-12">
            <p className="text-xl md:text-2xl text-indigo-100">
              Perfect for <span className="text-white font-semibold border-b-2 border-purple-400">{currentPhrase}</span>
              <span className="animate-pulse">|</span>
            </p>
          </div>
          
          {/* Benefits section with staggered animation - redesigned */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "💰", text: "Lower Interest Rates" },
              { icon: "✅", text: "Easier Approval" },
              { icon: "💼", text: "Higher Loan Amounts" }
            ].map((benefit, index) => (
              <div 
                key={index}
                className="backdrop-blur rounded-xl border border-indigo-400 border-opacity-30 p-5 flex items-center transform transition-all duration-700"
                style={{ 
                  transitionDelay: `${index * 300}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.2))'
                }}
              >
                <div className="text-3xl mr-4">{benefit.icon}</div>
                <div className="font-medium text-lg">{benefit.text}</div>
              </div>
            ))}
          </div>
          
          {/* CTA buttons - redesigned */}
          <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-700 transform ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-purple-500/20">
              Apply Now
            </button>
            <button className="bg-transparent backdrop-blur border border-indigo-300 border-opacity-40 text-white px-8 py-4 rounded-xl font-medium hover:bg-indigo-700 hover:bg-opacity-20 transition-colors duration-300">
              Calculate Your Rate
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating graphic element - redesigned */}
      <div className="hidden lg:block absolute right-10 top-1/2 transform -translate-y-1/2">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl animate-pulse blur-xl opacity-30 transform scale-150"></div>
          <div className="relative backdrop-blur rounded-2xl border border-indigo-400 border-opacity-30 shadow-2xl" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.25))'}}>
            <div className="p-6 rounded-xl">
              <div className="text-3xl font-bold mb-2">Get up to</div>
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 mb-3">$50,000</div>
              <div className="text-indigo-100 mb-6">Based on your collateral value</div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                <div className="text-sm">Instant pre-approval</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}