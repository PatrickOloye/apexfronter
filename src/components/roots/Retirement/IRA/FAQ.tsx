'use client';
import { useState as useFaqState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  heading: string;
  subheading: string;
  faqs: FaqItem[];
  colorTheme?: 'blue' | 'green' | 'purple';
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  heading,
  subheading,
  faqs,
  colorTheme = 'blue'
}) => {
  const [openIndex, setOpenIndex] = useFaqState<number | null>(null);
  
  const textColorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
  };

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subheading}</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className={`w-full text-left p-6 rounded-lg flex justify-between items-center ${
                  openIndex === index ? 'bg-gray-50' : 'bg-white'
                } border border-gray-200 hover:bg-gray-50 transition-colors`}
                onClick={() => toggleFaq(index)}
              >
                <span className="font-medium text-lg">{faq.question}</span>
                <span className={`${textColorClasses[colorTheme]} text-2xl`}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="bg-gray-50 border-t-0 border border-gray-200 rounded-b-lg p-6 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};