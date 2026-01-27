
// src/components/investment/CallToAction.tsx
import React from 'react';
import Link from 'next/link';

type CallToActionProps = {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  colorClass?: string;
};

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonUrl,
  secondaryButtonText,
  secondaryButtonUrl,
  colorClass = 'blue-600',
}) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className={`bg-gradient-to-r from-blue-900 to-blue-900 rounded-2xl p-8 md:p-12 text-white text-center`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{subtitle}</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href={primaryButtonUrl}
              className={`bg-white text-blue-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-lg transition-colors`}
            >
              {primaryButtonText}
            </Link>
            
            {secondaryButtonText && secondaryButtonUrl && (
              <Link 
                href={secondaryButtonUrl}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-6 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                {secondaryButtonText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;