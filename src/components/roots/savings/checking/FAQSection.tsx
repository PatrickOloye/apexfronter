
// src/components/checking/FAQSection.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface FAQItem {
  id: string | number;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  subtitle?: string;
  faqs: FAQItem[];
  theme?: 'blue' | 'dark' | 'light';
}

const FAQSection: React.FC<FAQSectionProps> = ({
  title,
  subtitle,
  faqs,
  theme = 'light'
}) => {
  const [openId, setOpenId] = useState<string | number | null>(null);

  const toggleFAQ = (id: string | number) => {
    setOpenId(openId === id ? null : id);
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'blue':
        return {
          container: 'bg-blue-600',
          title: 'text-white',
          subtitle: 'text-blue-100',
          itemBg: 'bg-blue-700',
          question: 'text-white',
          answer: 'text-blue-100'
        };
      case 'dark':
        return {
          container: 'bg-gradient-to-r from-blue-900 to-black',
          title: 'text-white',
          subtitle: 'text-blue-100',
          itemBg: 'bg-blue-800',
          question: 'text-white',
          answer: 'text-blue-100'
        };
      case 'light':
        return {
          container: 'bg-white',
          title: 'text-blue-900',
          subtitle: 'text-gray-600',
          itemBg: 'bg-gray-50',
          question: 'text-blue-900',
          answer: 'text-gray-700'
        };
      default:
        return {
          container: 'bg-white',
          title: 'text-blue-900',
          subtitle: 'text-gray-600',
          itemBg: 'bg-gray-50',
          question: 'text-blue-900',
          answer: 'text-gray-700'
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <section className={`${themeClasses.container} py-12 rounded-lg mb-10`}>
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className={`text-3xl font-bold mb-4 ${themeClasses.title}`}>{title}</h2>
          {subtitle && <p className={`text-lg ${themeClasses.subtitle}`}>{subtitle}</p>}
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className={`${themeClasses.itemBg} rounded-lg shadow-sm overflow-hidden`}>
              <button
                className={`w-full text-left p-5 flex justify-between items-center ${themeClasses.question} font-medium`}
                onClick={() => toggleFAQ(faq.id)}
              >
                <span>{faq.question}</span>
                {openId === faq.id ? (
                  <ChevronUp className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 flex-shrink-0" />
                )}
              </button>
              {openId === faq.id && (
                <div className={`p-5 pt-0 ${themeClasses.answer}`}>
                  <p>{faq.answer}</p>
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