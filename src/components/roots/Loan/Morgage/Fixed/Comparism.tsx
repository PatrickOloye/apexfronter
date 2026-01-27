
// Component 2: MortgageComparisonTable
// A dynamic table comparing different mortgage options

import { motion } from "framer-motion";
import { useState } from "react";

interface MortgageOption {
    type: string;
    interestRate: string;
    bestFor: string;
    downPayment: string;
    termLength: string;
    requirements: string;
  }
  
  export const MortgageComparisonTable = ({ color = "blue-600" }) => {
    const mortgageOptions: MortgageOption[] = [
      {
        type: "Conventional Fixed-Rate",
        interestRate: "5.75%",
        bestFor: "Buyers with good credit and stable income",
        downPayment: "5-20%",
        termLength: "15, 20, or 30 years",
        requirements: "Credit score 620+, DTI below 43%"
      },
      {
        type: "FHA Loan",
        interestRate: "5.85%",
        bestFor: "First-time buyers with limited down payment",
        downPayment: "3.5%",
        termLength: "15 or 30 years",
        requirements: "Credit score 580+, DTI below 50%"
      },
      {
        type: "VA Loan",
        interestRate: "5.25%",
        bestFor: "Veterans and active military personnel",
        downPayment: "0%",
        termLength: "15 or 30 years",
        requirements: "Military service, Certificate of Eligibility"
      },
      {
        type: "USDA Loan",
        interestRate: "5.50%",
        bestFor: "Buyers in eligible rural areas",
        downPayment: "0%",
        termLength: "30 years",
        requirements: "Income limits, rural property location"
      }
    ];
  
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-${color}`}>
              Compare Our Fixed-Rate Mortgage Options
            </h2>
            <p className="text-gray-600">
              Find the perfect fixed-rate mortgage solution for your unique financial situation and homeownership goals.
            </p>
          </motion.div>
          
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="w-full bg-white">
              <thead className={`bg-gradient-to-r from-blue-900 to-blue-900 text-white`}>
                <tr>
                  <th className="px-6 py-4 text-left">Mortgage Type</th>
                  <th className="px-6 py-4 text-left">Interest Rate</th>
                  <th className="px-6 py-4 text-left">Best For</th>
                  <th className="px-6 py-4 text-left">Down Payment</th>
                  <th className="px-6 py-4 text-left">Term Length</th>
                  <th className="px-6 py-4 text-left">Requirements</th>
                </tr>
              </thead>
              <tbody>
                {mortgageOptions.map((option, index) => (
                  <motion.tr 
                    key={index}
                    className={`border-b border-gray-200 hover:bg-gray-50 ${
                      hoveredRow === index ? `bg-${color}/5` : ''
                    }`}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium">{option.type}</span>
                    </td>
                    <td className="px-6 py-4">{option.interestRate}</td>
                    <td className="px-6 py-4">{option.bestFor}</td>
                    <td className="px-6 py-4">{option.downPayment}</td>
                    <td className="px-6 py-4">{option.termLength}</td>
                    <td className="px-6 py-4">{option.requirements}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm text-gray-500 text-center">
            * Rates are for illustrative purposes and subject to change based on market conditions and individual qualifications.
          </div>
        </div>
      </section>
    );
  };
  