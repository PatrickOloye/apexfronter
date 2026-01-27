'use client';

import React, { useState } from 'react';

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
  colorClass?: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, toggleOpen, colorClass = "text-blue-600" }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
        onClick={toggleOpen}
      >
        <span className="font-medium text-lg">{question}</span>
        <svg
          className={`w-6 h-6 ${colorClass} transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

interface Faq {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  title?: string;
  faqs: Faq[];
  colorClass?: string;
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ 
  title = "Frequently Asked Questions", 
  faqs = [],
  colorClass = "text-blue-600" 
}) => {
  const [openIndex, setOpenIndex] = useState(0);
  
  const toggleOpen = (index: number): void => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {faqs.map((faq, index) => (
          <FaqItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            toggleOpen={() => toggleOpen(index)}
            colorClass={colorClass}
          />
        ))}
      </div>
    </div>
  );
};

export default FaqAccordion;