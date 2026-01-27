
// StepProgressCard.tsx
import { ReactNode } from 'react';

interface Step {
  title: string;
  description: string;
  icon?: ReactNode;
}

interface StepProgressCardProps {
  steps: Step[];
  title: string;
  subtitle?: string;
  accentColor?: string;
}

export const StepProgressCard = ({
  steps,
  title,
  subtitle,
  accentColor = 'blue-600'
}: StepProgressCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className={`bg-gradient-to-r from-blue-900 to-blue-900 p-6 text-white`}>
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        {subtitle && <p className="text-blue-100">{subtitle}</p>}
      </div>
      
      <div className="p-6">
        <div className="space-y-10">
          {steps.map((step, index) => (
            <div key={index} className="flex">
              <div className="flex flex-col items-center mr-6">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-${accentColor} text-white font-bold`}>
                  {step.icon || index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-1 grow bg-${accentColor}/30 my-1`} style={{ height: '100%' }} />
                )}
              </div>
              <div className="pt-1 pb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
