import React from 'react';
import Image from 'next/image';

interface Benefit {
    title: string;
    description: string;
    icon: React.ReactNode;
  }
  
  interface BenefitsCardsProps {
    heading: string;
    subheading: string;
    benefits: Benefit[];
    imagePath: string;
    imageAlt: string;
    colorTheme?: 'blue' | 'green' | 'purple';
    imagePosition?: 'left' | 'right';
  }
  
  export const BenefitsCards: React.FC<BenefitsCardsProps> = ({
    heading,
    subheading,
    benefits,
    imagePath,
    imageAlt,
    colorTheme = 'blue',
    imagePosition = 'right'
  }) => {
    const textColorClasses = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
    };
    
    const bgColorClasses = {
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      purple: 'bg-purple-600',
    };
  
    return (
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{heading}</h2>
            <p className="text-white max-w-2xl mx-auto">{subheading}</p>
          </div>
          
          <div className={`flex flex-col ${imagePosition === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
            <div className="md:w-1/2">
              <div className="grid grid-cols-1 gap-6">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-6 rounded-lg shadow-md flex items-start"
                  >
                    <div className={`${bgColorClasses[colorTheme]} p-3 rounded-md text-white mr-4 flex-shrink-0`}>
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative h-80 md:h-96 w-full overflow-hidden rounded-lg shadow-xl">
                <Image
                  src={imagePath}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };