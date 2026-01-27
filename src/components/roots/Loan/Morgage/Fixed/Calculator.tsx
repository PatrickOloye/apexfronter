
// Component 3: MortgageCalculator
// An interactive component that allows users to estimate monthly payments

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const MortgageCalculator = ({ color = "blue-600" }) => {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(5.75);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // Calculate monthly payment
    const monthlyRate = interestRate / 100 / 12;
    const payments = loanTerm * 12;
    const x = Math.pow(1 + monthlyRate, payments);
    const monthly = (loanAmount * x * monthlyRate) / (x - 1);
    
    if (isFinite(monthly)) {
      setMonthlyPayment(Math.round(monthly));
      setTotalInterest(Math.round(monthly * payments - loanAmount));
      setTotalCost(Math.round(monthly * payments));
    }
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-${color}`}>
              Mortgage Payment Calculator
            </h2>
            <p className="text-gray-600">
              Estimate your monthly payments and see how much home you can afford with our interactive calculator.
            </p>
          </motion.div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-6">Adjust Your Parameters</h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount: ${loanAmount.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="50000"
                    max="1000000"
                    step="10000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-${color}`}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$50,000</span>
                    <span>$1,000,000</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate: {interestRate}%
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    step="0.125"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-${color}`}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>2%</span>
                    <span>10%</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Term: {loanTerm} Years
                  </label>
                  <div className="flex gap-4">
                    {[15, 20, 30].map((term) => (
                      <button
                        key={term}
                        onClick={() => setLoanTerm(term)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                          loanTerm === term
                            ? `bg-${color} text-white`
                            : `bg-gray-100 text-gray-700 hover:bg-gray-200`
                        }`}
                      >
                        {term} Years
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className={`bg-gradient-to-r from-blue-900 to-blue-900 text-white p-6 md:p-8 flex flex-col justify-center`}>
                <h3 className="text-xl font-semibold mb-6">Your Estimated Costs</h3>
                
                <div className="mb-6">
                  <span className="block text-sm font-medium opacity-80">Monthly Payment</span>
                  <span className="text-3xl font-bold">${monthlyPayment.toLocaleString()}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="block text-sm font-medium opacity-80">Total Principal</span>
                    <span className="text-xl font-semibold">${loanAmount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium opacity-80">Total Interest</span>
                    <span className="text-xl font-semibold">${totalInterest.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/20">
                  <span className="block text-sm font-medium opacity-80">Total Cost</span>
                  <span className="text-2xl font-bold">${totalCost.toLocaleString()}</span>
                </div>
                
                <div className="mt-6">
                  <button className="w-full py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-opacity-90 transition-all">
                    Apply for Pre-Approval
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500 text-center">
            * This calculator provides estimates only. Actual payments may vary based on additional fees, taxes, and insurance.
          </div>
        </div>
      </div>
    </section>
  );
};
