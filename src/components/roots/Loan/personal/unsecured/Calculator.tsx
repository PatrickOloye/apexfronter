// 3. LOAN ELIGIBILITY CALCULATOR COMPONENT
// This interactive component helps users determine if they qualify

import { useState } from 'react';

interface LoanEligibilityCalculatorProps {
  primaryColor?: string;
  secondaryColor?: string;
}

export const LoanEligibilityCalculator: React.FC<LoanEligibilityCalculatorProps> = ({
  primaryColor = "blue-600",
  secondaryColor = "blue-900"
}) => {
  const [creditScore, setCreditScore] = useState<number>(700);
  const [income, setIncome] = useState<number>(60000);
  const [debt, setDebt] = useState<number>(1500);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  const monthlyIncome = income / 12;
  const debtToIncomeRatio = (debt / monthlyIncome) * 100;
  const maxLoanAmount = Math.round((income * 0.36 - debt * 12) / 3);
  
  const getEligibilityStatus = () => {
    if (creditScore >= 720 && debtToIncomeRatio < 36) {
      return {
        status: "Excellent",
        message: "You're likely to qualify for our best rates!",
        color: "text-green-600"
      };
    } else if (creditScore >= 660 && debtToIncomeRatio < 43) {
      return {
        status: "Good",
        message: "You're likely to qualify for standard rates.",
        color: "text-blue-600"
      };
    } else if (creditScore >= 600 && debtToIncomeRatio < 50) {
      return {
        status: "Fair",
        message: "You may qualify with higher interest rates.",
        color: "text-yellow-600"
      };
    } else {
      return {
        status: "Limited",
        message: "You may face challenges qualifying for this loan.",
        color: "text-red-600"
      };
    }
  };
  
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };
  
  const eligibility = getEligibilityStatus();
  
  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden">
      <div className={`bg-gradient-to-r from-${secondaryColor} to-${primaryColor} py-5 px-6`}>
        <h2 className="text-white text-xl font-bold">Loan Eligibility Calculator</h2>
        <p className="text-white text-opacity-90 text-sm mt-1">
          See if you qualify for an unsecured personal loan
        </p>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleCalculate}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credit Score
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="300"
                  max="850"
                  value={creditScore}
                  onChange={(e) => setCreditScore(parseInt(e.target.value))}
                  className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200`}
                />
                <span className={`text-${primaryColor} font-medium`}>{creditScore}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Poor</span>
                <span>Fair</span>
                <span>Good</span>
                <span>Excellent</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Annual Income
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(parseInt(e.target.value) || 0)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Debt Payments
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  value={debt}
                  onChange={(e) => setDebt(parseInt(e.target.value) || 0)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-${primaryColor} hover:bg-${secondaryColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${primaryColor}`}
            >
              Calculate Eligibility
            </button>
          </div>
        </form>
        
        {showResults && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Your Results</h3>
            
            <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Eligibility Status</dt>
                <dd className={`mt-1 text-lg font-semibold ${eligibility.color}`}>
                  {eligibility.status}
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Debt-to-Income Ratio</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">
                  {debtToIncomeRatio.toFixed(1)}%
                </dd>
              </div>
              
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Estimated Maximum Loan</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">
                  ${maxLoanAmount.toLocaleString()}
                </dd>
              </div>
              
              <div className="sm:col-span-2 bg-gray-50 p-4 rounded-lg">
                <p className={`text-sm ${eligibility.color}`}>
                  {eligibility.message}
                </p>
                <div className="mt-4">
                  <a href="#" className={`text-${primaryColor} font-medium hover:underline text-sm`}>
                    Apply for pre-approval with no impact to your credit score
                  </a>
                </div>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
};