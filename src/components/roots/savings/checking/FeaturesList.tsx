import React from 'react';
import { Check } from 'lucide-react';

export interface Feature {
  id: string | number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface FeatureListProps {
  title: string;
  subtitle?: string;
  features: Feature[];
  columns?: 1 | 2 | 3;
  theme?: 'blue' | 'dark' | 'light';
}

const FeatureList: React.FC<FeatureListProps> = ({
  title,
  subtitle,
  features,
  columns = 3,
  theme = 'light'
}) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'blue':
        return {
          heading: 'text-white',
          card: 'bg-blue-700',
          title: 'text-white',
          description: 'text-blue-100'
        };
      case 'dark':
        return {
          heading: 'text-white',
          card: 'bg-blue-800',
          title: 'text-white',
          description: 'text-blue-100'
        };
      case 'light':
        return {
          heading: 'text-blue-900',
          card: 'bg-white',
          title: 'text-blue-900',
          description: 'text-gray-600'
        };
      default:
        return {
          heading: 'text-blue-900',
          card: 'bg-white',
          title: 'text-blue-900',
          description: 'text-gray-600'
        };
    }
  };

  const themeClasses = getThemeClasses();
  const gridClass = `grid gap-6 ${
    columns === 1 ? 'grid-cols-1' :
    columns === 2 ? 'grid-cols-1 md:grid-cols-2' :
    'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }`;

  return (
    <section className={`py-12 w-full ${theme === 'blue' ? 'bg-blue-700' : theme === 'dark' ? 'bg-gradient-to-r from-blue-900 to-black' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className={`text-3xl font-bold mb-4 ${themeClasses.heading}`}>{title}</h2>
          {subtitle && <p className="text-lg text-white">{subtitle}</p>}
        </div>
        
        <div className={gridClass}>
          {features.map((feature) => (
            <div key={feature.id} className={`${themeClasses.card} rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105`}>
              <div className="flex items-start mb-4">
                {feature.icon || (
                  <div className="bg-blue-600 rounded-full p-2 mr-4">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                )}
                <h3 className={`text-xl font-semibold ${themeClasses.title}`}>{feature.title}</h3>
              </div>
              <p className={`${themeClasses.description}`}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureList;
