
import React from 'react';
import Image from 'next/image';

interface InvestmentTypeOverviewProps {
  planType: string;
  description: string;
  keyFeatures: string[];
  imageSrc: string;
  bgColor?: string;
}

export const InvestmentTypeOverview = ({ planType, description, keyFeatures, imageSrc, bgColor = "blue-600" }: InvestmentTypeOverviewProps) => {
  return (
    <div className={`relative rounded-xl overflow-hidden shadow-lg my-8 bg-${bgColor} text-white`}>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-8">
          <h3 className="text-2xl font-bold mb-3">{planType}</h3>
          <p className="mb-4 text-gray-100">{description}</p>
          
          <h4 className="text-lg font-semibold mb-2">Key Features:</h4>
          <ul className="space-y-2">
            {keyFeatures.map((feature: string, index: number) => (
              <li 
                key={index}
                className="flex items-start"
              >
                <svg className="h-5 w-5 text-white mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="lg:w-1/2 h-64 lg:h-auto relative">
          <Image 
            src={imageSrc} 
            alt={`${planType} Illustration`}
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-blue-900/10"></div>
        </div>
      </div>
    </div>
  );
};