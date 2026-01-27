'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Shield, Clock, DollarSign, Smartphone, Zap } from 'lucide-react';

interface AccountHeroProps {
  accountType: string;
  description: string;
  interestRate?: number | number[];
}

const rotatingPhrases = [
  "POWERFUL",
  "SMART",
  "EFFICIENT",
  "RELIABLE",
  "SEAMLESS"
];

const AccountHero = ({ accountType, description, interestRate }: AccountHeroProps) => {
  const [currentRateIndex, setCurrentRateIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  

  const typingSpeed = 120;
  const deletingSpeed = 60;
  const pauseTime = 1500;

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
      {/* New animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 animate-gradient-shift"></div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-20 relative z-10">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Reorganized header section */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 mb-6 bg-blue-900/30 rounded-full border border-blue-700/50 text-blue-300 text-sm">
              MOST POPULAR CHOICE
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-white">APEX </span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 ">
                <span className="text-blue-300">{typedText}</span>
                <span className="inline-block w-1 h-10 bg-blue-400 ml-1 animate-pulse align-middle"></span>
              <span className="text-white"> Interest Bearing </span>{' '}
              </span>
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto my-8 rounded-full"></div>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          {/* Swapped left/right sections */}
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Moved CTA to left */}
            <div className="md:col-span-5 order-1 md:order-2">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-1 rounded-2xl shadow-xl shadow-purple-900/20">
                <div className="bg-slate-900 rounded-xl p-8 text-center h-full flex flex-col justify-center">
                  <h3 className="text-2xl font-medium mb-4">Get Started Today</h3>
                  <p className="text-slate-400 mb-8">Open your account in minutes</p>
                  
                  <div className="space-y-4">
                    <button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium py-4 px-6 rounded-xl transition-all flex items-center justify-center group">
                      <span>Apply Now</span>
                      <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
                    </button>
                    <button className="w-full bg-slate-800 hover:bg-slate-700/80 text-white font-medium py-4 px-6 rounded-xl transition-all">
                      <span>Learn More</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Moved features to right */}
            <div className="md:col-span-7 order-2 md:order-1">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-700/50 shadow-lg">
                <h3 className="text-xl font-bold text-center mb-8 text-blue-400">Why Choose Our Checking Account?</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="feature-card p-5 rounded-xl bg-slate-800/60 border border-slate-700/50 transition-all hover:bg-slate-700/40 hover:border-blue-500/30">
                    <div className="flex items-center mb-3">
                      <Shield className="text-blue-400 mr-3" size={20} />
                      <h3 className="font-medium">FDIC Insured</h3>
                    </div>
                    <p className="text-sm text-slate-400">Your money protected up to $250,000</p>
                  </div>
                  <div className="feature-card p-5 rounded-xl bg-slate-800/60 border border-slate-700/50 transition-all hover:bg-slate-700/40 hover:border-blue-500/30">
                    <div className="flex items-center mb-3">
                      <Zap className="text-blue-400 mr-3" size={20} />
                      <h3 className="font-medium">Instant Access</h3>
                    </div>
                    <p className="text-sm text-slate-400">Debit card & mobile banking ready</p>
                  </div>
                  <div className="feature-card p-5 rounded-xl bg-slate-800/60 border border-slate-700/50 transition-all hover:bg-slate-700/40 hover:border-blue-500/30">
                    <div className="flex items-center mb-3">
                      <Clock className="text-blue-400 mr-3" size={20} />
                      <h3 className="font-medium">24/7 Access</h3>
                    </div>
                    <p className="text-sm text-slate-400">Bank anytime, anywhere</p>
                  </div>
                  <div className="feature-card p-5 rounded-xl bg-slate-800/60 border border-slate-700/50 transition-all hover:bg-slate-700/40 hover:border-blue-500/30">
                    <div className="flex items-center mb-3">
                      <Smartphone className="text-blue-400 mr-3" size={20} />
                      <h3 className="font-medium">Mobile App</h3>
                    </div>
                    <p className="text-sm text-slate-400">Deposit checks with your phone</p>
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