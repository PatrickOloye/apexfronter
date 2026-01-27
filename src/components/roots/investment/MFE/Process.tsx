
// src/components/investment/InvestmentProcess.tsx
import React from 'react';

type Step = {
  number: number;
  title: string;
  description: string;
};

type InvestmentProcessProps = {
  title: string;
  subtitle: string;
  steps: Step[];
  colorClass?: string;
};

const InvestmentProcess: React.FC<InvestmentProcessProps> = ({
  title,
  subtitle,
  steps,
  colorClass = 'blue-600',
}) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>
        
        <div className="relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gray-200 transform -translate-x-1/2 z-0"></div>
          
          <div className="space-y-12 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              >
                <div className="md:w-1/2 mb-6 md:mb-0 p-4">
                  <div className={`h-16 w-16 rounded-full bg-${colorClass} text-white flex items-center justify-center text-2xl font-bold mx-auto md:mx-0 ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                    {step.number}
                  </div>
                </div>
                
                <div className="md:w-1/2 p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentProcess;