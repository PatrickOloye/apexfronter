// components/investments/ComparisonTable.tsx
import React from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

export interface ComparisonItem {
  feature: string;
  primary: {
    value: string | boolean;
    highlight?: boolean;
  };
  secondary: {
    value: string | boolean;
    highlight?: boolean;
  };
}

interface ComparisonTableProps {
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
  items: ComparisonItem[];
  primaryColor?: string;
  secondaryColor?: string;
  bgColor?: string;
  textColor?: string;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  title,
  description,
  primaryLabel,
  secondaryLabel,
  items,
  primaryColor = "blue-600",
  secondaryColor = "gray-500",
  bgColor = "bg-white",
  textColor = "text-gray-900"
}) => {
  const renderValue = (value: string | boolean, highlight?: boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircleIcon className={`h-6 w-6 text-${primaryColor} mx-auto`} />
      ) : (
        <XCircleIcon className={`h-6 w-6 text-red-500 mx-auto`} />
      );
    }
    
    if (highlight) {
      return <span className={`font-bold text-${primaryColor}`}>{value}</span>;
    }
    
    return value;
  };

  return (
    <section className={`${bgColor} py-16 px-4`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>{title}</h2>
          <p className={`${textColor} opacity-80 max-w-3xl mx-auto`}>{description}</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={`py-4 px-6 text-left ${textColor}`}>Feature</th>
                <th className={`py-4 px-6 text-center bg-${primaryColor} text-white rounded-tl-lg`}>
                  {primaryLabel}
                </th>
                <th className={`py-4 px-6 text-center bg-${secondaryColor} text-white rounded-tr-lg`}>
                  {secondaryLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr 
                  key={index} 
                  className={index % 2 === 0 ? `bg-gray-50` : `bg-white`}
                >
                  <td className={`py-4 px-6 border-b border-gray-200 ${textColor}`}>
                    {item.feature}
                  </td>
                  <td className={`py-4 px-6 text-center border-b border-gray-200 ${textColor}`}>
                    {renderValue(item.primary.value, item.primary.highlight)}
                  </td>
                  <td className={`py-4 px-6 text-center border-b border-gray-200 ${textColor}`}>
                    {renderValue(item.secondary.value, item.secondary.highlight)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;