// components/investments/FaqExpander.tsx
import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqExpanderProps {
  title: string;
  subtitle: string;
  faqs: FaqItem[];
  primaryColor?: string;
  bgColor?: string;
  textColor?: string;
  containerStyle?: 'cards' | 'dividers';
  columns?: 1 | 2;
}

const FaqExpander: React.FC<FaqExpanderProps> = ({
  title,
  subtitle,
  faqs,
  primaryColor = "blue-600",
  bgColor = "bg-white",
  textColor = "text-gray-900",
  containerStyle = 'cards',
  columns = 1,
}) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const isOpen = (index: number) => openItems.includes(index);

  return (
    <section className={`${bgColor} py-16 px-4`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>{title}</h2>
          <p className={`${textColor} opacity-80 max-w-3xl mx-auto`}>{subtitle}</p>
        </div>
        
        <div className={`grid ${columns === 2 ? 'md:grid-cols-2 gap-8' : 'grid-cols-1'}`}>
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`mb-4 ${containerStyle === 'cards' ? 'bg-white rounded-lg shadow-md overflow-hidden' : ''}`}
            >
              <button
                onClick={() => toggleItem(index)}
                className={`w-full text-left p-5 flex justify-between items-center ${
                  containerStyle === 'dividers' ? `border-b-2 border-${primaryColor}/20` : ''
                }`}
                aria-expanded={isOpen(index)}
              >
                <h3 className={`text-lg font-medium ${textColor}`}>{faq.question}</h3>
                <ChevronDownIcon 
                  className={`w-5 h-5 text-${primaryColor} transition-transform ${isOpen(index) ? 'transform rotate-180' : ''}`} 
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen(index) ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-5 pt-0">
                  <p className={`${textColor} opacity-80`}>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqExpander;