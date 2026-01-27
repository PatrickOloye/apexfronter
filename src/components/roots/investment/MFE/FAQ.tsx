
// src/components/investment/FAQSection.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FAQ = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  title: string;
  subtitle: string;
  faqs: FAQ[];
  colorClass?: string;
};

const FAQSection: React.FC<FAQSectionProps> = ({
  title,
  subtitle,
  faqs,
  colorClass = 'blue-600',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className={`w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 ${openIndex === index ? `bg-${colorClass} bg-opacity-10` : 'bg-white'}`}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                {openIndex === index ? 
                  <ChevronUp className="h-5 w-5" /> : 
                  <ChevronDown className="h-5 w-5" />
                }
              </button>
              
              {openIndex === index && (
                <div className="p-4 bg-white border-t border-gray-200">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
