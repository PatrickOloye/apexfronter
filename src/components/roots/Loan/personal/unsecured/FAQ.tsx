
// 7. FAQ ACCORDION COMPONENT
// This component answers common questions about unsecured loans

import { useState } from "react";

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    toggleOpen: () => void;
    accentColor?: string;
  }
  
  const FAQItem: React.FC<FAQItemProps> = ({ 
    question, 
    answer, 
    isOpen, 
    toggleOpen,
    accentColor = "blue-600" 
  }) => (
    <div className="border-b border-gray-200 py-6">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <svg
          className={`w-5 h-5 text-${accentColor} transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`mt-2 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    </div>
  );
  
  interface FAQAccordionProps {
    accentColor?: string;
    backgroundColor?: string;
  }
  
  export const FAQAccordion: React.FC<FAQAccordionProps> = ({
    accentColor = "blue-600",
    backgroundColor = "bg-white"
  }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    
    const faqs = [
      {
        question: "Can I get an unsecured personal loan with bad credit?",
        answer: "It's possible, but you may face higher interest rates or stricter terms. At Apex Finance, we consider multiple factors beyond just credit scores, including income stability and debt-to-income ratio. We recommend improving your credit score before applying for better terms."
      },
      {
        question: "Will applying for a loan affect my credit score?",
        answer: "When you check your rate with Apex Finance, we perform a <strong>soft credit inquiry</strong> that doesn't impact your score. However, if you proceed with a full application, we'll need to do a <strong>hard inquiry</strong>, which may temporarily lower your score by a few points. Making timely payments on your loan can help rebuild your score over time."
      },
      {
        question: "Can I pay off my unsecured loan early?",
        answer: "Yes! At Apex Finance, we don't charge prepayment penalties on our unsecured personal loans. You're free to pay off your loan early and save on interest without any additional fees."
      },
      {
        question: "What happens if I miss a payment?",
        answer: "Missing a payment may result in late fees and could negatively impact your credit score. If you're facing financial difficulties, please contact us right away. We offer hardship programs and may be able to adjust your payment schedule to help you stay on track."
      },
      {
        question: "How much can I borrow with an unsecured personal loan?",
        answer: "At Apex Finance, our unsecured personal loans range from $1,000 to $50,000, depending on your creditworthiness, income, and existing debt obligations. Use our eligibility calculator to estimate how much you might qualify for."
      },
      {
        question: "How long does the application process take?",
        answer: "Our online application takes about 5-10 minutes to complete. Most applicants receive an instant decision, and if approved, funds can be deposited as soon as the next business day after verification is complete."
      }
    ];
    
    const toggleFAQ = (index: number) => {
      if (openIndex === index) {
        setOpenIndex(null);
      } else {
        setOpenIndex(index);
      }
    };
    
    return (
      <div className={`${backgroundColor} shadow-lg rounded-xl overflow-hidden`}>
        <div className={`bg-${accentColor} py-6 px-8`}>
          <h2 className="text-white text-xl font-bold">Frequently Asked Questions</h2>
          <p className="text-white text-opacity-90 mt-1">
            Everything you need to know about unsecured personal loans
          </p>
        </div>
        
        <div className="p-8">
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                toggleOpen={() => toggleFAQ(index)}
                accentColor={accentColor}
              />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Don&apos;t see your question answered here?</p>
            <a
              href="#"
              className={`inline-flex items-center px-6 py-3 border border-${accentColor} text-base font-medium rounded-md text-${accentColor} bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${accentColor}`}
            >
              Contact Our Support Team
            </a>
          </div>
        </div>
      </div>
    );
  };