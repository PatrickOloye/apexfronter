
// FAQSection.tsx
import { ReactNode, useState } from 'react';

interface FAQ {
  question: string;
  answer: string | ReactNode;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title: string;
  subtitle?: string;
  colorScheme?: string;
}

export const FAQSection = ({ 
  faqs, 
  title, 
  subtitle,
  colorScheme = 'blue-600' 
}: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className={`bg-gradient-to-r from-blue-900 to-blue-900 p-6 text-white`}>
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        {subtitle && <p className="text-blue-100">{subtitle}</p>}
      </div>
      
      <div className="divide-y divide-gray-200">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 last:border-0">
            <button
              className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
              <svg
                className={`w-5 h-5 text-${colorScheme} transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-4 prose prose-sm max-w-none text-gray-600">
                {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};