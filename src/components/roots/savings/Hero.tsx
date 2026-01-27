'use client';
import { useState, useEffect, useRef } from 'react';
import { CreditCard } from 'lucide-react';

const typewriterWords = ["reward", "perfect", "secure", "flexible"];

const SavingsHero = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const delayBetweenWords = 1000;
  
  const typewriterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = typewriterWords[loopNum % typewriterWords.length];
      
      if (isDeleting) {
        setTypewriterText(currentWord.substring(0, typewriterText.length - 1));
      } else {
        setTypewriterText(currentWord.substring(0, typewriterText.length + 1));
      }

      if (!isDeleting && typewriterText === currentWord) {
        setTimeout(() => setIsDeleting(true), delayBetweenWords);
      } else if (isDeleting && typewriterText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [typewriterText, isDeleting, loopNum]);

  return (
    <div className="flex flex-wrap bg-gradient-to-br from-blue-900 to-blue-800 text-white py-10">
      {/* Left side content */}
      <div className="w-full sm:w-8/12 mb-10">
        <div className="container mx-auto h-full sm:p-10">
          <nav className="flex px-4 justify-between items-center">
            <div></div>
            <div>
              <CreditCard className="w-8 h-8 text-blue-300" />
            </div>
          </nav>
          <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
            <div className="w-full">
              <h1 className="text-4xl lg:text-6xl font-bold">
                Find your{" "}
                <span 
                  ref={typewriterRef}
                  className="text-blue-300 relative"
                >
                  {typewriterText}
                  <span className="opacity-100">|</span>
                  <span className="absolute inset-0 bg-blue-600/20 backdrop-blur-sm rounded-lg -z-10"></span>
                </span>{" "}
                savings account
              </h1>
              <div className="w-20 h-2 bg-blue-300 my-4"></div>
              <p className="text-xl mb-10 text-blue-100">
                Unlock your financial potential with Apex Finance&apos;s premium savings solutions. 
                Enjoy industry-leading interest rates, zero maintenance fees, and 24/7 secure 
                access to your growing funds. Start building your future today.
              </p>
              <button className="bg-blue-500 hover:bg-blue-400 text-white text-2xl font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Open Account
              </button>
            </div>
          </header>
        </div>
      </div>
      
      {/* Right side with images matching your sketch with minimal overlap */}
      <div className="w-full h-200 sm:h-screen sm:w-4/12 relative flex items-center justify-center overflow-hidden">
        {/* Main container for images */}
        <div className="relative w-full h-full max-w-md">
          {/* Image 1 - Top right */}
          <div className="absolute top-8 right-6 w-64 h-56 bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-400/30 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="h-full flex flex-col items-center justify-center p-4">
              <h3 className="text-lg font-bold text-white mb-1">Premium Savings</h3>
              <p className="text-blue-200 mb-2">Up to 4.5% Interest Rate</p>
              {/* Content for Image 1 */}
            </div>
          </div>
          
          {/* Image 3 - Middle left, positioned to minimize overlap */}
          <div className="absolute top-1/3 left-2 w-56 h-48 bg-blue-700/30 backdrop-blur-sm rounded-xl border border-blue-300/30 shadow-lg overflow-hidden">
            <div className="h-full flex flex-col items-center justify-center p-3 relative">
              <p className="text-blue-100 font-medium">24/7 Access</p>
              <p className="text-white text-sm">Zero Fees</p>
              {/* Shine animation effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-shimmer"></div>
            </div>
          </div>
          
          {/* Image 2 - Bottom right, positioned to avoid overlap with other images */}
          <div className="absolute bottom-16 right-8 w-64 h-52 bg-blue-600/40 backdrop-blur-sm rounded-xl border border-blue-200/40 shadow-lg overflow-hidden">
            <div className="h-full flex items-center justify-center">
              <div className="w-20 h-20 bg-blue-500/60 rounded-full flex items-center justify-center border border-blue-300/40 shadow-inner animate-pulse">
                <span className="text-2xl font-bold text-white">4.5%</span>
              </div>
              {/* Content for Image 2 */}
            </div>
          </div>
        </div>
        
        {/* Decorative elements with animations */}
        <div className="absolute top-1/4 left-1/2 w-3 h-3 rounded-full bg-blue-400 opacity-70 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 rounded-full bg-blue-300 opacity-50 animate-bounce"></div>
        <div className="absolute top-2/3 right-1/3 w-2 h-2 rounded-full bg-blue-200 opacity-60 animate-ping"></div>
      </div>
    </div>
  );
};

// Add these custom animations to your global CSS or tailwind.config.js


export default SavingsHero;