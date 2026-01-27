import React from 'react';
import Image from 'next/image';

interface EquityTypeCardProps {
  type: string;
  description: string;
  examples: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
  image: string;
}

const EquityTypeCard: React.FC<EquityTypeCardProps> = ({
  type,
  description,
  examples,
  riskLevel,
  image,
}) => {
  const riskColor = {
    Low: 'text-green-500',
    Medium: 'text-yellow-500',
    High: 'text-red-500',
  }[riskLevel];

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 bg-gradient-to-r from-blue-900 to-blue-900">
        <Image
          src={image}
          alt={type}
          layout="fill"
          objectFit="cover"
          className="opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-2xl font-bold text-white">{type}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-500 mb-2">EXAMPLES</h4>
          <ul className="space-y-1">
            {examples.map((example, index) => (
              <li key={index} className="text-sm text-gray-700">
                • {example}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center">
          <span className="text-sm font-semibold text-gray-500 mr-2">RISK LEVEL:</span>
          <span className={`text-sm font-bold ${riskColor}`}>{riskLevel}</span>
        </div>
      </div>
    </div>
  );
};

export default EquityTypeCard;