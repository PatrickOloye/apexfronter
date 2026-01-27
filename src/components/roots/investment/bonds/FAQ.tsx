import { useState,  } from 'react';
import Image from 'next/image';
import { ArrowRight,  } from 'lucide-react';

// Component 1: Investment Product Overview
// This component provides a high-level overview of the investment account type
export const InvestmentProductOverview = ({ 
  title = "Apex Investment Account",
  description = "Your gateway to secure, steady growth through fixed-income securities",
  features = [
    "Instant access to curated fixed-income securities",
    "Real-time market data and performance insights",
    "Portfolio tracking and alerts for maturities and payments",
    "No brokerage fees on most transactions",
    "Smart bond matching based on your preferences"
  ],
  ctaText = "Open an Account",
  ctaLink = "#",
  imageSrc = "/images/investment-overview.jpg",
  imageAlt = "Apex Investment Dashboard",
  color = "blue-600"
}) => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-${color}`}>{title}</h2>
            <p className="text-gray-700 text-lg mb-6">{description}</p>
            
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className={`mr-3 mt-1 p-1 rounded-full bg-${color} text-white`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <a 
              href={ctaLink} 
              className={`inline-flex items-center px-6 py-3 rounded-lg bg-${color} hover:bg-${color}/90 text-white font-medium transition-colors`}
            >
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
          
          <div className="order-1 md:order-2 relative">
            <div className="aspect-video w-full relative rounded-lg overflow-hidden shadow-xl">
              <Image 
                src={imageSrc} 
                alt={imageAlt}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            <div className={`absolute -bottom-3 -right-3 w-24 h-24 bg-${color}/10 rounded-full`}></div>
            <div className={`absolute -top-3 -left-3 w-16 h-16 bg-${color}/10 rounded-full`}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const InvestmentFAQ = ({
    title = "Frequently Asked Questions",
    description = "Find answers to common questions about investing with Apex Finance",
    faqs = [
      {
        question: "Do I need a separate account to invest in bonds?",
        answer: "No. With your Apex Investment Account, you can buy and manage bonds alongside your other investments — all from one platform."
      },
      {
        question: "Are there fees for buying or selling bonds?",
        answer: "Apex Finance offers no commission fees on most U.S. Treasury and municipal bonds. Some international or high-yield bonds may incur small transaction fees."
      },
      {
        question: "Can I reinvest my coupon payments automatically?",
        answer: "Yes! Use the auto-reinvest feature to compound your returns effortlessly."
      },
      {
        question: "Are bond earnings taxable?",
        answer: "Most bonds are subject to federal income tax. However, municipal bonds are often tax-free at the federal level, and sometimes at the state and local level too."
      },
      {
        question: "What happens when a bond matures?",
        answer: "At maturity, you'll receive the face value of the bond plus the final interest payment. Funds are automatically deposited into your Apex Cash Management Account."
      }
    ],
    color = "blue-600"
  }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    
    interface FAQ {
      question: string;
      answer: string;
    }

    const toggleFAQ = (index: number): void => {
      setOpenIndex(openIndex === index ? null : index);
    };
    
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-${color}`}>{title}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="py-5">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full text-left focus:outline-none"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  <span className={`ml-6 flex-shrink-0 text-${color}`}>
                    {openIndex === index ? (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="mt-2 pr-12">
                    <p className="text-base text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Can&apos;t find what you&apos;re looking for?</p>
            <a 
              href="#contact-support" 
              className={`inline-flex items-center px-6 py-3 border border-${color} text-${color} hover:bg-${color}/10 rounded-lg font-medium transition-colors`}
            >
              Contact Our Support Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    );
  };
  