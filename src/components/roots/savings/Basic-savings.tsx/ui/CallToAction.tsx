'use client';

import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

const FAQSection = ({ faqs }: { faqs: FAQ[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number): void => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
            {faqs.map((faq: FAQ, index: number) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
              className="w-full text-left p-6 bg-blue-50 hover:bg-blue-100 transition-colors flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
              >
              <h3 className="text-lg font-medium text-blue-800">{faq.question}</h3>
              <span className="text-blue-600 text-2xl">
                {activeIndex === index ? '−' : '+'}
              </span>
              </button>
              <div 
              className={`px-6 overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-96 py-6' : 'max-h-0'}`}
              >
              <p className="text-white">{faq.answer}</p>
              </div>
            </div>
            ))}
        </div>
      </div>
    </section>
  );
};


export default FAQSection;;