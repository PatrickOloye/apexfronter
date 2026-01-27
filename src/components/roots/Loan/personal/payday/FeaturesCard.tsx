// LoanFeatureCard.tsx
import { ReactNode } from 'react';
import Image from 'next/image';

interface LoanFeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color?: string;
  direction?: 'row' | 'column';
}

export const LoanFeatureCard = ({
  title,
  description,
  icon,
  color = 'blue-600',
  direction = 'column',
}: LoanFeatureCardProps) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl h-full border-l-4 border-${color}`}>
      <div className={`flex flex-${direction} ${direction === 'row' ? 'items-center gap-4' : 'gap-3'}`}>
        {direction === 'column' && (
          <div className={`bg-${color}/10 rounded-full p-3 w-14 h-14 flex items-center justify-center text-${color}`}>
            {icon}
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        
        {direction === 'row' && (
          <div className={`bg-${color}/10 rounded-full p-3 w-14 h-14 flex items-center justify-center text-${color}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};