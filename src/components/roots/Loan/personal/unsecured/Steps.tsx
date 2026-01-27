import { useState } from 'react';
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface StepProps {
    number: number;
    title: string;
    description: string;
    icon: string;
    isActive?: boolean;
    accentColor?: string;
  }
  
  const Step: React.FC<StepProps> = ({ 
    number, 
    title, 
    description, 
    icon, 
    isActive = false,
    accentColor = "blue-600"
  }) => (
    <div className={`relative flex items-start ${isActive ? '' : 'opacity-70'}`}>
      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
        isActive ? `bg-${accentColor} text-white` : 'bg-gray-200 text-gray-600'
      } font-bold text-lg`}>
        {number}
      </div>
      <div className="ml-4 flex-1">
        <div className="flex items-center">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <Image src={icon} alt={title} width={20} height={20} priority />
            <Image src={icon} alt={title} width={20} height={20} />
          </div>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
  
  interface LoanApplicationStepsProps {
    accentColor?: string;
    backgroundColor?: string;
  }
  
  export const LoanApplicationSteps: React.FC<LoanApplicationStepsProps> = ({
    accentColor = "blue-600",
    backgroundColor = "bg-white"
  }) => {
    const [currentStep, setCurrentStep] = useState(1);
    
    const steps = [
      {
        number: 1,
        title: "Check Your Rate",
        description: "See your personalized rates with no impact to your credit score in just 2 minutes.",
        icon: "/icons/search.svg"
      },
      {
        number: 2,
        title: "Choose Your Offer",
        description: "Compare loan options with different terms and select the one that fits your needs.",
        icon: "/icons/options.svg"
      },
      {
        number: 3,
        title: "Verify Your Information",
        description: "Upload required documents to finalize your application securely.",
        icon: "/icons/document.svg"
      },
      {
        number: 4,
        title: "Receive Your Funds",
        description: "After approval, funds are typically deposited within one business day.",
        icon: "/icons/wallet.svg"
      }
    ];
    
    return (
      <div className={`${backgroundColor} shadow-lg rounded-xl overflow-hidden`}>
        <div className={`bg-${accentColor} py-6 px-8`}>
          <h2 className="text-white text-xl font-bold">How to Apply for Your Unsecured Loan</h2>
          <p className="text-white text-opacity-90 mt-1">
            Four simple steps to financial freedom
          </p>
        </div>
        
        <div className="p-8">
          <div className="space-y-12">
            {steps.map((step) => (
              <div key={step.number}>
                <Step
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  isActive={step.number <= currentStep}
                  accentColor={accentColor}
                />
                {step.number < steps.length && (
                  <div className="ml-5 h-10 border-l border-dashed border-gray-300"></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4 sm:mb-0">
              Already started an application? <a href="#" className={`text-${accentColor} font-medium hover:underline`}>Resume where you left off</a>
            </p>
            
            <button
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-${accentColor} hover:bg-${accentColor.replace('600', '700')} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${accentColor}`}
            >
              Start Your Application
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    );
  };
