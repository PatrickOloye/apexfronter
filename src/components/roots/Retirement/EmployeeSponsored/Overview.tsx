// 1. PLAN OVERVIEW CARD COMPONENT
// components/PlanOverviewCard.jsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PlanOverviewCardProps {
  title: string;
  description: string;
  icon: string;
  bgColor?: string;
  features?: string[];
  ctaText?: string;
  ctaLink?: string;
}

const PlanOverviewCard: React.FC<PlanOverviewCardProps> = ({ 
  title, 
  description, 
  icon, 
  bgColor = "bg-blue-600", 
  features = [],
  ctaText = "Learn More",
  ctaLink = "#"
}) => {
  return (
    <div className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${bgColor} text-white`}>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-white p-2 rounded-full mr-4">
            <Image 
              src={icon} 
              alt={`${title} icon`} 
              width={32} 
              height={32} 
              className="h-8 w-8"
            />
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        
        <p className="mb-4 text-white/90">{description}</p>
        
        {features.length > 0 && (
          <ul className="mb-6 space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        
        <Link 
          href={ctaLink}
          className="inline-block px-6 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition duration-200"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
};

export default PlanOverviewCard;
