
// 2. COMPARISON TABLE COMPONENT
// components/PlanComparisonTable.jsx
import React from 'react';

interface Plan {
  name: string;
  features: Record<string, string>;
}

const PlanComparisonTable = ({ plans = [] }: { plans: Plan[] }) => {
  // Extract all unique feature keys from the plans
  const allFeatures = Array.from(
    new Set(
      plans.flatMap(plan => Object.keys(plan.features))
    )
  );
  
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
        <thead className="bg-gradient-to-r from-blue-900 to-blue-900">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-white font-semibold">Features</th>
            {plans.map((plan, index) => (
              <th key={index} scope="col" className="px-6 py-4 text-center text-white font-semibold">
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {allFeatures.map((feature, featureIndex) => (
            <tr key={featureIndex} className={featureIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">{feature}</td>
              {plans.map((plan, planIndex) => (
                <td key={planIndex} className="px-6 py-4 text-center text-gray-500">
                  {plan.features[feature] || '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanComparisonTable;
