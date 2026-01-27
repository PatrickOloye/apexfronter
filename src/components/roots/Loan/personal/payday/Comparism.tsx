// ComparisonTable.tsx
import { ReactNode } from 'react';

interface ComparisonFeature {
  name: string;
  paydayLoan: string | ReactNode;
  personalLoan: string | ReactNode;
}

interface ComparisonTableProps {
  features: ComparisonFeature[];
  title: string;
  subtitle?: string;
  accentColor?: string;
}

export const ComparisonTable = ({
  features,
  title,
  subtitle,
  accentColor = 'blue-600',
}: ComparisonTableProps) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
      <div className={`bg-gradient-to-r from-blue-900 to-blue-900 text-white p-6`}>
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        {subtitle && <p className="text-blue-100">{subtitle}</p>}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`bg-${accentColor}/10`}>
              <th className="text-left p-4 font-bold text-gray-700">Feature</th>
              <th className="text-left p-4 font-bold text-gray-700">Payday Loan</th>
              <th className="text-left p-4 font-bold text-gray-700">Personal Loan</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-4 border-t border-gray-200 font-medium">{feature.name}</td>
                <td className="p-4 border-t border-gray-200">{feature.paydayLoan}</td>
                <td className="p-4 border-t border-gray-200">{feature.personalLoan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};