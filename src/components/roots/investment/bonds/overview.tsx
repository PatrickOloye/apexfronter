
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
