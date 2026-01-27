"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, DollarSign, AlertCircle, Heart } from 'lucide-react';

const phrases = [
  "Need funds before payday?",
  "Financial emergencies happen.",
  "Quick decisions, informed choices.",
  "Safe, transparent borrowing."
];

export default function HeroSection() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);



  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % phrases.length;
      const fullText = phrases[current];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 min-h-[90vh]">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-36 -right-36 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute top-1/2 -left-36 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl"></div>
        <div className="absolute -bottom-20 right-1/4 w-64 h-64 rounded-full bg-blue-600/20 blur-3xl"></div>
      </div>

      {/* Circuit-like pattern overlay */}
      <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] bg-repeat opacity-5"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between py-20 min-h-[90vh]">
        <div className="w-full lg:w-1/2 space-y-8 mb-12 lg:mb-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-blue-600 py-1 px-3 rounded-full text-sm font-medium text-white mb-4">
              Financial Solutions
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Understanding <span className="text-blue-300">Payday Loans</span>
            <br />
            <div className="h-20 mt-4 flex items-center">
              <span className="typing-text text-blue-300 inline-block min-h-[3rem]">
                {text}<span className="text-white animate-pulse">|</span>
              </span>
            </div>
          </motion.h1>

          <motion.p 
            className="text-lg sm:text-xl text-blue-100 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            At Apex Finance, we believe that financial empowerment starts with knowledge. 
            Discover how short-term loans work and make informed decisions with confidence.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all flex items-center justify-center group">
              Get Started
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </button>
            <button className="px-8 py-4 bg-blue-800/50 hover:bg-blue-800/80 backdrop-blur-sm text-blue-100 font-medium rounded-lg border border-blue-600/30 transition-all">
              Explore Alternatives
            </button>
          </motion.div>

          <motion.div 
            className="mt-12 pt-8 border-t border-blue-700/50 grid grid-cols-2 sm:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center mb-2">
                <Clock size={18} className="text-blue-300 mr-2" />
                <span className="text-blue-100 font-medium">Fast</span>
              </div>
              <p className="text-blue-200/80 text-sm text-center sm:text-left">Quick approval process</p>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center mb-2">
                <DollarSign size={18} className="text-blue-300 mr-2" />
                <span className="text-blue-100 font-medium">Flexible</span>
              </div>
              <p className="text-blue-200/80 text-sm text-center sm:text-left">Loan amounts that work</p>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center mb-2">
                <AlertCircle size={18} className="text-blue-300 mr-2" />
                <span className="text-blue-100 font-medium">Transparent</span>
              </div>
              <p className="text-blue-200/80 text-sm text-center sm:text-left">Clear terms & conditions</p>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center mb-2">
                <Heart size={18} className="text-blue-300 mr-2" />
                <span className="text-blue-100 font-medium">Supportive</span>
              </div>
              <p className="text-blue-200/80 text-sm text-center sm:text-left">24/7 customer service</p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="w-full lg:w-1/2 lg:pl-12"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative">
            {/* Information Card */}
            <div className="bg-white/10 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-blue-500/20 shadow-xl shadow-blue-900/20 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Payday Loan Basics</h3>
                <span className="bg-blue-600 text-xs font-bold text-white px-2 py-1 rounded-full">Key Info</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-blue-700/30">
                  <div className="bg-blue-600/20 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-100">Short Term</h4>
                    <p className="text-sm text-blue-200/80">Usually 14–30 days with single payment</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 pb-4 border-b border-blue-700/30">
                  <div className="bg-blue-600/20 p-2 rounded-lg">
                    <DollarSign className="h-5 w-5 text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-100">Small Amounts</h4>
                    <p className="text-sm text-blue-200/80">Typically $100–$1,000 based on income</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/20 p-2 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-100">High Interest</h4>
                    <p className="text-sm text-blue-200/80">Be aware of fees and total repayment costs</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-8 py-3 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium rounded-lg flex items-center justify-center">
                Learn More
              </button>
              
              <p className="text-xs text-blue-200/60 text-center mt-4">
                Apex Finance helps you make informed decisions about your financial future.
              </p>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg transform rotate-6">
              <div className="text-sm font-medium text-white">Easy Application</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-blue-700 to-blue-800 p-3 rounded-xl shadow-lg transform -rotate-3">
              <div className="text-xs font-medium text-blue-100">24/7 Support</div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Wave Bottom Effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" className="w-full h-auto">
          <path fill="rgb(255, 255, 255)" fillOpacity="0.05" d="M0,128L80,144C160,160,320,192,480,186.7C640,181,800,139,960,128C1120,117,1280,139,1360,149.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          <path fill="rgb(255, 255, 255)" fillOpacity="0.05" d="M0,96L80,90.7C160,85,320,75,480,96C640,117,800,171,960,181.3C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
}