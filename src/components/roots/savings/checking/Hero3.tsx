'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Shield, Clock, DollarSign, Smartphone, Zap } from 'lucide-react';

interface AccountHeroProps {
  accountType: string;
  description: string;
  interestRate?: number | number[];
}

const rotatingPhrases = [
    "STRONG",
    "EVERYDAY",
    "ESSENTIAL",
    "FLEXIBLE",
    "DIGITAL"
  ];

const AccountHero = ({ accountType, description, interestRate }: AccountHeroProps) => {
  const [currentRateIndex, setCurrentRateIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  

  const typingSpeed = 150;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  const rates = interestRate ? (Array.isArray(interestRate) ? interestRate : [interestRate]) : [0];

  useEffect(() => {
    setIsVisible(true);
    if (rates.length > 1) {
      const interval = setInterval(() => {
        setCurrentRateIndex((prev) => (prev + 1) % rates.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [rates.length]);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = rotatingPhrases[loopNum % rotatingPhrases.length];
      const updatedText = isDeleting
        ? currentPhrase.substring(0, typedText.length - 1)
        : currentPhrase.substring(0, typedText.length + 1);

      setTypedText(updatedText);

      if (!isDeleting && updatedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum]);

  return (
    <div className="bg-slate-900 text-white overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-700 to-blue-600"></div>
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', backgroundSize: '30px 30px' }}></div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-16 relative z-10">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Top section with account type & description */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-400">
                Basic <span className="text-blue-300">{typedText}</span>
                <span className="inline-block w-1 h-8 bg-blue-400 ml-1 animate-pulse"></span>
              </span>
              <span className="font-light text-white"> Checking   Account!!</span>
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto my-6 rounded-full"></div>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {/* Main content area */}
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left side: Features */}
            <div className="md:col-span-7 p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="feature-card p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 transition-all hover:bg-slate-700/30">
                  <Shield className="text-blue-400 mb-3" size={24} />
                  <h3 className="font-medium mb-2">FDIC Insured</h3>
                  <p className="text-sm text-slate-400">Your deposits protected up to $250,000</p>
                </div>
                <div className="feature-card p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 transition-all hover:bg-slate-700/30">
                  <Zap className="text-blue-400 mb-3" size={24} />
                  <h3 className="font-medium mb-2">Instant Access</h3>
                  <p className="text-sm text-slate-400">Debit card and mobile banking included</p>
                </div>
                <div className="feature-card p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 transition-all hover:bg-slate-700/30">
                  <Clock className="text-blue-400 mb-3" size={24} />
                  <h3 className="font-medium mb-2">24/7 Banking</h3>
                  <p className="text-sm text-slate-400">Manage money anytime, anywhere</p>
                </div>
                <div className="feature-card p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 transition-all hover:bg-slate-700/30">
                  <Smartphone className="text-blue-400 mb-3" size={24} />
                  <h3 className="font-medium mb-2">Mobile App</h3>
                  <p className="text-sm text-slate-400">Deposit checks with your phone</p>
                </div>
              </div>
            </div>

            {/* Right side: CTA */}
            <div className="md:col-span-5">
              <div className="bg-gradient-to-br from-blue-600 to-blue-600 p-1 rounded-2xl shadow-lg shadow-blue-900/30">
                <div className="bg-slate-900 rounded-xl p-8 text-center">
                  <h3 className="text-2xl font-medium mb-4">Ready to Bank Better?</h3>
                  <p className="text-slate-400 mb-6">Open your account in just 5 minutes</p>
                  
                  <div className="space-y-4">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-blue-800 hover:from-blue-600 hover:to-blue-600 text-white font-medium py-4 px-6 rounded-xl transition-all flex items-center justify-center group">
                      <span>Get Started Online</span>
                      <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
                    </button>
                    <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-4 px-6 rounded-xl transition-all flex items-center justify-center group">
                      <span>Find a Branch</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountHero;