
// 2. LOAN COMPARISON TABLE COMPONENT
// This component compares secured vs unsecured loans

interface LoanTypeComparisonProps {
    accentColor?: string;
  }
  
  export const LoanTypeComparison: React.FC<LoanTypeComparisonProps> = ({ 
    accentColor = "blue-600" 
  }) => {
    const comparisonData = [
      {
        feature: "Collateral Required",
        unsecured: "No",
        secured: "Yes",
        tooltip: "Unsecured loans don't require you to put up assets as security"
      },
      {
        feature: "Interest Rate",
        unsecured: "Higher",
        secured: "Lower",
        tooltip: "Unsecured loans typically have higher rates due to increased lender risk"
      },
      {
        feature: "Typical Loan Amount",
        unsecured: "$1,000 - $50,000",
        secured: "Based on collateral value",
        tooltip: "Maximum amounts depend on your credit profile and income"
      },
      {
        feature: "Credit Requirements",
        unsecured: "Stricter",
        secured: "More flexible",
        tooltip: "Good to excellent credit typically needed for unsecured loans"
      },
      {
        feature: "Risk to Borrower",
        unsecured: "No asset risk",
        secured: "Risk of losing collateral",
        tooltip: "You won't lose assets with unsecured loans, but your credit can be affected"
      },
      {
        feature: "Approval Speed",
        unsecured: "Fast (credit dependent)",
        secured: "Fast (with clear title)",
        tooltip: "Many unsecured loans can be approved within minutes"
      }
    ];
  
    return (
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className={`bg-${accentColor} py-4 px-6`}>
          <h2 className="text-white text-xl font-bold">Secured vs. Unsecured: What&apos;s the Difference?</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className={`bg-${accentColor} bg-opacity-10`}>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Feature</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Unsecured Loan</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Secured Loan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {comparisonData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">{item.feature}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    <div className="flex items-center">
                      <span>{item.unsecured}</span>
                      <div className="group relative ml-2">
                        <span className="cursor-help text-gray-400 hover:text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        <div className="absolute z-10 w-64 p-2 bg-black text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity left-0 mt-1 pointer-events-none">
                          {item.tooltip}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">{item.secured}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="py-4 px-6 bg-gray-50">
          <p className="text-sm text-gray-600">
            Not sure which option is right for you? <a href="#" className={`text-${accentColor} font-medium hover:underline`}>Schedule a consultation</a> with our financial advisors.
          </p>
        </div>
      </div>
    );
  };
  