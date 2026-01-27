
// src/components/checking/CTASection.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
  theme?: 'blue' | 'dark' | 'light';
}

const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  primaryButtonText,
  primaryButtonLink = "#",
  secondaryButtonText,
  secondaryButtonLink = "#",
  backgroundImage,
  theme = 'blue'
}) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'blue':
        return {
          container: backgroundImage 
            ? 'bg-blue-600 bg-opacity-90' 
            : 'bg-blue-600',
          title: 'text-white',
          description: 'text-blue-100',
          primaryButton: 'bg-white text-blue-600 hover:bg-blue-50',
          secondaryButton: 'bg-transparent text-white border border-white hover:bg-blue-700'
        };
      case 'dark':
        return {
          container: backgroundImage 
            ? 'bg-gradient-to-r from-blue-900 to-black bg-opacity-90' 
            : 'bg-gradient-to-r from-blue-900 to-blue-900',
          title: 'text-white',
          description: 'text-blue-100',
          primaryButton: 'bg-white text-blue-900 hover:bg-blue-50',
          secondaryButton: 'bg-transparent text-white border border-white hover:bg-blue-800'
        };
      case 'light':
        return {
          container: backgroundImage 
            ? 'bg-white bg-opacity-90' 
            : 'bg-white',
          title: 'text-blue-900',
          description: 'text-gray-600',
          primaryButton: 'bg-blue-600 text-white hover:bg-blue-700',
          secondaryButton: 'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50'
        };
      default:
        return {
          container: backgroundImage 
            ? 'bg-black bg-opacity-90' 
            : 'bg-blue-600',
          title: 'text-white',
          description: 'text-blue-100',
          primaryButton: 'bg-white text-blue-600 hover:bg-blue-50',
          secondaryButton: 'bg-transparent text-white border border-white hover:bg-blue-700'
        };
    }
  };

  const themeClasses = getThemeClasses();
  const backgroundStyle = backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {};

  return (
    <section 
      className={`${themeClasses.container} py-16 rounded-lg shadow-xl mb-10`}
      style={backgroundStyle}
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${themeClasses.title}`}>{title}</h2>
        <p className={`text-lg mb-8 ${themeClasses.description}`}>{description}</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href={primaryButtonLink}
            className={`${themeClasses.primaryButton} px-8 py-3 rounded-md font-medium transition-colors duration-200 inline-flex items-center justify-center`}
          >
            {primaryButtonText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          
          {secondaryButtonText && (
            <a 
              href={secondaryButtonLink}
              className={`${themeClasses.secondaryButton} px-8 py-3 rounded-md font-medium transition-colors duration-200`}
            >
              {secondaryButtonText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
