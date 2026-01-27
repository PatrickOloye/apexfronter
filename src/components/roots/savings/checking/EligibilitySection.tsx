// src/components/checking/EligibilitySection.tsx
import React from 'react';
import Image from 'next/image';
import { Check, X } from 'lucide-react';

export interface EligibilityItem {
  id: string | number;
  text: string;
  required: boolean;
}

interface EligibilitySectionProps {
  title: string;
  description?: string;
  items: EligibilityItem[];
  ctaText?: string;
  ctaLink?: string;
  theme?: 'blue' | 'dark' | 'light';
  image1?: string;
  image2?: string;
  imagePosition?: 'left' | 'right';
}

const EligibilitySection: React.FC<EligibilitySectionProps> = ({
  title,
  description,
  items,
  ctaText,
  ctaLink = "#",
  theme = 'light',
  image1,
  image2,
  imagePosition = 'right'
}) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'blue':
        return {
          container: 'bg-blue-600',
          title: 'text-white',
          description: 'text-blue-100',
          itemBg: 'bg-blue-700',
          itemText: 'text-white',
          button: 'bg-white text-blue-600 hover:bg-blue-50'
        };
      case 'dark':
        return {
          container: 'bg-gradient-to-r from-blue-900 to-blue-900',
          title: 'text-white',
          description: 'text-blue-100',
          itemBg: 'bg-blue-800',
          itemText: 'text-white',
          button: 'bg-white text-blue-900 hover:bg-blue-50'
        };
      case 'light':
        return {
          container: 'bg-white',
          title: 'text-blue-900',
          description: 'text-gray-600',
          itemBg: 'bg-white',
          itemText: 'text-gray-700',
          button: 'bg-blue-600 text-white hover:bg-blue-700'
        };
      default:
        return {
          container: 'bg-gray-50',
          title: 'text-blue-900',
          description: 'text-gray-600',
          itemBg: 'bg-white',
          itemText: 'text-gray-700',
          button: 'bg-blue-600 text-white hover:bg-blue-700'
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <section className={`${themeClasses.container} py-12 rounded-lg mb-10`}>
      <div className={`max-w-6xl mx-auto px-4 flex flex-col ${imagePosition === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}>
        {/* Content Section */}
        <div className="md:w-1/2">
          <div className="text-center md:text-left mb-8">
            <h2 className={`text-3xl font-bold mb-4 ${themeClasses.title}`}>{title}</h2>
            {description && <p className={`text-lg ${themeClasses.description}`}>{description}</p>}
          </div>

          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div 
                key={item.id} 
                className={`${themeClasses.itemBg} rounded-lg p-4 flex items-center shadow-sm`}
              >
                <div className={`flex-shrink-0 ${item.required ? 'text-green-500' : 'text-yellow-500'}`}>
                  {item.required ? <Check className="h-6 w-6" /> : <X className="h-6 w-6" />}
                </div>
                <span className={`ml-3 ${themeClasses.itemText}`}>{item.text}</span>
              </div>
            ))}
          </div>

          {ctaText && (
            <div className="text-center md:text-left">
              <a 
                href={ctaLink} 
                className={`inline-block ${themeClasses.button} px-6 py-3 rounded-md font-medium transition-colors duration-200`}
              >
                {ctaText}
              </a>
            </div>
          )}
        </div>

        {/* Images Section */}
        {(image1 || image2) && (
          <div className="md:w-1/2 relative">
            {image1 && (
              <div className={`relative ${image2 ? 'z-10' : ''}`}>
                <Image 
                  src={image1} 
                  alt="" 
                  width={600}
                  height={400}
                  className="w-[80%] h-auto rounded-lg shadow-md object-cover"
                  style={{ maxHeight: '400px' }}
                />
              </div>
            )}
            {image2 && (
              <div className="absolute bottom-0 right-6 z-10 w-10/12">
                <Image 
                  src={image2} 
                  alt="" 
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-md object-cover"
                  style={{ 
                    maxHeight: '400px',
                    // clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default EligibilitySection;