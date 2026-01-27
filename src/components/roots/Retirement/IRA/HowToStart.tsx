import { ArrowRight } from "lucide-react";

// 6. Steps Process Component - Reusable for different account types
interface ProcessStep {
    number: number;
    title: string;
    description: string;
  }
  
  interface ProcessStepsProps {
    heading: string;
    subheading: string;
    steps: ProcessStep[];
    ctaText?: string;
    ctaLink?: string;
    colorTheme?: 'blue' | 'green' | 'purple';
  }
  
  export const ProcessSteps: React.FC<ProcessStepsProps> = ({
    heading,
    subheading,
    steps,
    ctaText,
    ctaLink,
    colorTheme = 'blue'
  }) => {
    const bgColorClasses = {
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      purple: 'bg-purple-600',
    };
    
    const borderColorClasses = {
      blue: 'border-blue-600',
      green: 'border-green-600',
      purple: 'border-purple-600',
    };
  
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{subheading}</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`flex mb-12 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex-shrink-0 w-16 h-16 rounded-full ${bgColorClasses[colorTheme]} text-white flex items-center justify-center text-2xl font-bold`}>
                  {step.number}
                </div>
                
                <div className={`flex-grow ${index % 2 === 1 ? 'mr-6' : 'ml-6'}`}>
                  <div className={`h-full ${borderColorClasses[colorTheme]} border-l-4 pl-6`}>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {ctaText && ctaLink && (
              <div className="text-center mt-12">
                <a 
                  href={ctaLink}
                  className={`${bgColorClasses[colorTheme]} text-white px-8 py-3 rounded-md inline-flex items-center font-medium hover:opacity-90 transition-opacity`}
                >
                  {ctaText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };
  