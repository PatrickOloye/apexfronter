
// src/components/checking/BenefitsComparison.tsx
import React from 'react';
import { Check, X } from 'lucide-react';

export interface AccountType {
  id: string | number;
  name: string;
  description: string;
  monthlyFee: string;
  minBalance: string;
  features: {
    [key: string]: boolean;
  };
  recommended?: boolean;
}

interface BenefitsComparisonProps {
  title: string;
  subtitle?: string;
  accountTypes: AccountType[];
  featureLabels: {
    [key: string]: string;
  };
  theme?: 'blue' | 'dark' | 'light';
}

const BenefitsComparison: React.FC<BenefitsComparisonProps> = ({
  title,
  subtitle,
  accountTypes,
  featureLabels,
  theme = 'light'
}) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'blue':
        return {
          container: 'bg-blue-600',
          title: 'text-white',
          subtitle: 'text-blue-100',
          headerBg: 'bg-blue-700',
          headerText: 'text-white',
          cellBg: 'bg-blue-800',
          cellText: 'text-white',
          recommendedBadge: 'bg-yellow-400 text-blue-900'
        };
      case 'dark':
        return {
          container: 'bg-gradient-to-r from-blue-900 to-blue-900',
          title: 'text-white',
          subtitle: 'text-blue-100',
          headerBg: 'bg-blue-800',
          headerText: 'text-white',
          cellBg: 'bg-blue-900',
          cellText: 'text-white',
          recommendedBadge: 'bg-yellow-400 text-blue-900'
        };
      case 'light':
        return {
          container: 'bg-white',
          title: 'text-blue-900',
          subtitle: 'text-Black',
          headerBg: 'bg-blue-600',
          headerText: 'text-black',
          cellBg: 'bg-blue-900',
          cellText: 'text-Black',
          recommendedBadge: 'bg-yellow-400 text-blue-900'
        };
      default:
        return {
          container: 'bg-white',
          title: 'text-blue-900',
          subtitle: 'text-gray-600',
          headerBg: 'bg-blue-600',
          headerText: 'text-white',
          cellBg: 'bg-white',
          cellText: 'text-gray-700',
          recommendedBadge: 'bg-yellow-400 text-blue-900'
        };
    }
  };

  const themeClasses = getThemeClasses();
  const featureKeys = Object.keys(featureLabels);

  return (
    <section className={`${themeClasses.container} py-12 rounded-lg shadow-lg mb-10`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className={`text-3xl font-bold mb-4 ${themeClasses.title}`}>{title}</h2>
          {subtitle && <p className={`text-lg ${themeClasses.subtitle}`}>{subtitle}</p>}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={`${themeClasses.headerBg} ${themeClasses.headerText} p-4 text-left rounded-tl-lg`}>Account Type</th>
                <th className={`${themeClasses.headerBg} ${themeClasses.headerText} p-4 text-center`}>Monthly Fee</th>
                <th className={`${themeClasses.headerBg} ${themeClasses.headerText} p-4 text-center`}>Min Balance</th>
                {featureKeys.map((key) => (
                  <th key={key} className={`${themeClasses.headerBg} ${themeClasses.headerText} p-4 text-center`}>
                    {featureLabels[key]}
                  </th>
                ))}
                <th className={`${themeClasses.headerBg} ${themeClasses.headerText} p-4 text-center rounded-tr-lg`}></th>
              </tr>
            </thead>
            <tbody>
              {accountTypes.map((account, index) => (
                <tr key={account.id}>
                  <td className={`${themeClasses.cellBg} ${themeClasses.cellText} p-4 border-t border-gray-200 relative`}>
                    {account.recommended && (
                      <span className={`absolute -top-3 -left-3 ${themeClasses.recommendedBadge} text-xs font-bold py-1 px-2 rounded-full`}>
                        Recommended
                      </span>
                    )}
                    <div className="font-bold">{account.name}</div>
                    <div className="text-sm mt-1">{account.description}</div>
                  </td>
                  <td className={`${themeClasses.cellBg} ${themeClasses.cellText} p-4 border-t border-gray-200 text-center`}>
                    {account.monthlyFee}
                  </td>
                  <td className={`${themeClasses.cellBg} ${themeClasses.cellText} p-4 border-t border-gray-200 text-center`}>
                    {account.minBalance}
                  </td>
                  {featureKeys.map((key) => (
                    <td key={key} className={`${themeClasses.cellBg} ${themeClasses.cellText} p-4 border-t border-gray-200 text-center`}>
                      {account.features[key] ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                  ))}
                  <td className={`${themeClasses.cellBg} ${themeClasses.cellText} p-4 border-t border-gray-200 text-center`}>
                    <a 
                      href="#" 
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                    >
                      Apply Now
                    </a>
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

export default BenefitsComparison;