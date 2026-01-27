'use client';

import { useState, useEffect } from 'react';

interface AccountHero1Props {
  accountType: string;
  description: string;
  interestRate: number | number[];
}

const AccountHero1 = ({ accountType, description, interestRate }: AccountHero1Props) => {
  const [currentRateIndex, setCurrentRateIndex] = useState(0);
  const rates = Array.isArray(interestRate) ? interestRate : [interestRate];

  useEffect(() => {
    if (rates.length > 1) {
      const interval = setInterval(() => {
        setCurrentRateIndex((prev) => (prev + 1) % rates.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [rates.length]);

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Box with quick facts moved to the left */}
          <div className="md:w-1/3 order-2 md:order-1">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
              <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>No monthly fees</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>24/7 online access</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>FDIC insured</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Mobile check deposit</span>
                </li>
              </ul>
            </div>
          </div>
  
          {/* Main content moved to the right */}
          <div className="md:w-2/3 order-1 md:order-2">
            <div className="text-right">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {accountType} Savings Account
              </h1>
              <div className="ml-auto w-24 h-2 bg-blue-400 mb-8"></div>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 ml-auto">
                {description}
              </p>
              <div className="flex justify-end items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                  <p className="text-sm text-blue-200">Interest Rate</p>
                  <p className="text-3xl font-bold">
                    {rates[currentRateIndex]}%
                  </p>
                </div>
                <button className="bg-white text-blue-800 hover:bg-blue-100 font-medium py-3 px-8 rounded-lg shadow-lg transition-colors">
                  Open Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountHero1;