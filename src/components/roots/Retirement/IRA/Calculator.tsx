
import { useState, useEffect } from 'react';

interface CalculatorProps {
  title: string;
  description: string;
  colorTheme?: 'blue' | 'green' | 'purple';
  initialAmount?: number;
  initialContribution?: number;
  initialYears?: number;
  initialRate?: number;
  calculatorType: 'retirement' | 'savings' | 'mortgage';
}

export const InvestmentCalculator: React.FC<CalculatorProps> = ({
  title,
  description,
  colorTheme = 'blue',
  initialAmount = 10000,
  initialContribution = 500,
  initialYears = 20,
  initialRate = 7,
  calculatorType = 'retirement'
}) => {
  const [amount, setAmount] = useState(initialAmount);
  const [monthlyContribution, setMonthlyContribution] = useState(initialContribution);
  const [years, setYears] = useState(initialYears);
  const [rate, setRate] = useState(initialRate);
  const [result, setResult] = useState(0);

  const bgColorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
  };
  
  const textColorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
  };

  useEffect(() => {
    // Calculate future value
    const calculateCompoundInterest = () => {
      const monthlyRate = rate / 100 / 12;
      const totalMonths = years * 12;
      
      // Calculate future value of initial principal
      const principalFV = amount * Math.pow(1 + monthlyRate, totalMonths);
      
      // Calculate future value of monthly contributions
      let contributionFV = 0;
      if (monthlyRate > 0) {
        contributionFV = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
      } else {
        contributionFV = monthlyContribution * totalMonths;
      }
      
      setResult(principalFV + contributionFV);
    };

    calculateCompoundInterest();
  }, [amount, monthlyContribution, years, rate]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Initial Investment
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full pl-8 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Monthly Contribution
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                    <input
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                      className="w-full pl-8 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Time Period (Years)
                  </label>
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Annual Return Rate (%)
                  </label>
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.1"
                  />
                </div>
              </div>
              
              <div className="flex flex-col justify-center items-center bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Projected Value</h3>
                <div className={`${textColorClasses[colorTheme]} text-4xl font-bold mb-4`}>
                  ${result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
                <p className="text-gray-500 text-center">
                  {calculatorType === 'retirement' 
                    ? `After ${years} years of consistent investing` 
                    : `Total ${calculatorType} after ${years} years`}
                </p>
                <button 
                  className={`${bgColorClasses[colorTheme]} text-white px-6 py-3 rounded-md mt-6 hover:opacity-90 transition-opacity`}
                >
                  Talk to an Advisor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
