import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AccountOverviewProps {
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  theme?: 'blue' | 'dark' | 'light';
}

const AccountOverview: React.FC<AccountOverviewProps> = ({
  title,
  description,
  ctaText = "Learn More",
  ctaLink = "#",
  theme = 'blue'
}) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'blue':
        return {
          background: 'bg-blue-600',
          text: 'text-white',
          button: 'bg-white text-blue-600 hover:bg-blue-50'
        };
      case 'dark':
        return {
          background: 'bg-gradient-to-r from-blue-800 to-blue-900 w-full',
          text: 'text-white',
          button: 'bg-white text-blue-900 hover:bg-blue-50'
        };
      case 'light':
        return {
          background: 'bg-white',
          text: 'text-blue-900',
          button: 'bg-blue-600 text-white hover:bg-blue-700'
        };
      default:
        return {
          background: 'bg-blue-600',
          text: 'text-white',
          button: 'bg-white text-blue-600 hover:bg-blue-50'
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <section className={`${themeClasses.background} ${themeClasses.text} rounded-l-xs shadow-2xl p-8 `}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-6">{description}</p>
        {ctaText && (
          <a 
            href={ctaLink} 
            className={`inline-flex items-center ${themeClasses.button} px-6 py-3 rounded-md font-medium transition-colors duration-200`}
          >
            {ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        )}
      </div>
    </section>
  );
};

export default AccountOverview;