// components/investments/ProcessSteps.tsx
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export interface StepItem {
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

interface ProcessStepsProps {
  title: string;
  subtitle: string;
  steps: StepItem[];
  primaryColor?: string;
  bgColor?: string;
  textColor?: string;
  showNumbers?: boolean;
  alternateLayout?: boolean;
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({
  title,
  subtitle,
  steps,
  primaryColor = "blue-600",
  bgColor = "bg-white",
  textColor = "text-gray-900",
  showNumbers = true,
  alternateLayout = false,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className={`${bgColor} py-16 px-4`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>{title}</h2>
          <p className={`${textColor} opacity-80 max-w-3xl mx-auto`}>{subtitle}</p>
        </div>
        
        <motion.div 
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Vertical line connector */}
          {!alternateLayout && (
            <div className={`absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-${primaryColor} transform -translate-x-1/2 md:-translate-x-1/2`} />
          )}
          
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div 
                key={index}
                className={`relative flex flex-col md:flex-row items-start mb-12 ${alternateLayout ? '' : (isEven ? 'md:flex-row-reverse' : '')}`}
                variants={itemVariants}
              >
                {/* Step number or icon */}
                <div className={`flex-shrink-0 z-10 ${alternateLayout ? 'mb-4 md:mb-0 md:mr-6' : 'absolute left-0 md:left-1/2 transform -translate-x-1/2 md:-translate-x-1/2'}`}>
                  <div className={`bg-${primaryColor} text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold`}>
                    {step.icon ? (
                      <Image src={step.icon} alt="" width={24} height={24} />
                    ) : (
                      showNumbers && (index + 1)
                    )}
                  </div>
                </div>
                
                {/* Content */}
                <div className={`${alternateLayout ? 'w-full' : 'md:w-5/12'} ${alternateLayout ? '' : (isEven ? 'md:pr-16' : 'md:pl-16')}`}>
                  <div className={`p-6 bg-white rounded-lg shadow-lg h-full`}>
                    <h3 className={`text-xl font-bold mb-3 ${textColor}`}>{step.title}</h3>
                    <p className={`${textColor} opacity-80`}>{step.description}</p>
                  </div>
                </div>
                
                {/* Image (if present and using alternate layout) */}
                {alternateLayout && step.image && (
                  <div className="md:w-1/2 mt-4 md:mt-0 md:px-6">
                    <Image 
                      src={step.image} 
                      alt={step.title}
                      width={500}
                      height={300}
                      className="rounded-lg shadow-lg object-cover w-full"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSteps;