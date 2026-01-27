
// src/components/investment/InvestmentTypeCard.tsx
import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

type InvestmentTypeCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  benefits: string[];
  ctaText: string;
  ctaUrl: string;
  colorClass?: string;
};

const InvestmentTypeCard: React.FC<InvestmentTypeCardProps> = ({
  title,
  description,
  imageUrl,
  benefits,
  ctaText,
  ctaUrl,
  colorClass = 'blue-600',
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className={`text-2xl font-bold mb-3 text-${colorClass}`}>{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        
        <h4 className="font-semibold text-gray-800 mb-2">Key Benefits:</h4>
        <ul className="mb-6 space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <span className={`text-${colorClass} mr-2`}>✓</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        
        <a 
          href={ctaUrl}
          className={`inline-flex items-center bg-${colorClass} text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors`}
        >
          {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default InvestmentTypeCard;
