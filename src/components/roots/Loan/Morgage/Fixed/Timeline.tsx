

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TimelineStepProps {
    number: number;
    title: string;
    description: string;
    isActive?: boolean;
    color?: string;
  }
  
  const TimelineStep = ({ number, title, description, isActive = false, color = "blue-600" }: TimelineStepProps) => {
    return (
      <motion.div 
        className="flex"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: number * 0.1 }}
      >
        <div className="relative flex items-center justify-center">
          <div 
            className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
              isActive 
                ? `bg-${color} text-white` 
                : `bg-gray-100 text-${color}`
            }`}
          >
            {number}
          </div>
          <div className="absolute h-full w-0.5 bg-gray-200"></div>
        </div>
        <div className="ml-6 mb-12">
          <h4 className={`text-xl font-semibold mb-2 ${isActive ? `text-${color}` : ''}`}>{title}</h4>
          <p className="text-gray-600">{description}</p>
        </div>
      </motion.div>
    );
  };
  
  export const MortgageProcessTimeline = ({ color = "blue-600" }) => {
    const [activeStep, setActiveStep] = useState(1);
    
    const steps = [
      {
        title: "Determine Your Budget",
        description: "Assess your income, savings, credit score, and current debts to determine how much house you can comfortably afford."
      },
      {
        title: "Get Pre-Approved",
        description: "Complete our streamlined online pre-approval process to get an estimate of what you qualify for within minutes."
      },
      {
        title: "Find Your Dream Home",
        description: "Work with a realtor to find a property that meets your needs and falls within your approved budget."
      },
      {
        title: "Submit Full Application",
        description: "Provide documentation including pay stubs, tax returns, bank statements, and proof of identity to finalize your application."
      },
      {
        title: "Underwriting & Processing",
        description: "Our team verifies your information, orders an appraisal and title search, and finalizes your loan details."
      },
      {
        title: "Close On Your Loan",
        description: "Sign the final paperwork, pay closing costs, and receive the keys to your new home."
      }
    ];
  
    useEffect(() => {
      // Auto-advance the active step every 3 seconds
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev >= steps.length ? 1 : prev + 1));
      }, 3000);
      
      return () => clearInterval(interval);
    }, [steps.length]);
  
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-${color}`}>
              The Mortgage Process Simplified
            </h2>
            <p className="text-gray-600">
              From application to closing, we make the mortgage process clear and straightforward.
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-6 top-6 bottom-0 w-0.5 bg-gray-200"></div>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <TimelineStep
                  key={index}
                  number={index + 1}
                  title={step.title}
                  description={step.description}
                  isActive={activeStep === index + 1}
                  color={color}
                />
              ))}
            </div>
            <div className="mt-8 text-center">
              <button className={`px-6 py-3 rounded-lg bg-${color} text-white font-medium hover:bg-opacity-90 transition-all`}>
                Start Your Application Today
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };
  