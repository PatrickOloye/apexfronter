
import Image from 'next/image';
import { ArrowRight, Info,  } from 'lucide-react';
export const InvestmentCTA = ({
    title = "Join Apex Finance Today",
    description = "Take control of your financial future with our comprehensive investment solutions.",
    ctaText = "Open Your Investment Account",
    ctaLink = "#open-account",
    backgroundImage = "/images/investment-cta-bg.jpg",
    color = "blue-600"
  }) => {
    return (
      <section className="py-16 relative">
        <div className="absolute inset-0 z-0">
          <Image 
            src={backgroundImage} 
            alt="Background" 
            layout="fill"
            objectFit="cover"
            className="opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-900 opacity-90"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className="text-xl mb-8">{description}</p>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className={`text-2xl font-bold mb-4 text-${color}`}>Ready to Begin?</h3>
              <p className="text-gray-600 mb-6">Start today. Grow smarter. Invest confidently. Build your future with Apex Finance.</p>
              
              <a 
                href={ctaLink} 
                className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-lg bg-${color} hover:bg-${color}/90 text-white font-medium transition-colors text-lg`}
              >
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              
              <p className="mt-6 text-gray-500 text-sm">
                Have questions? Our support team is available 24/7 via chat, email, or phone.
              </p>
            </div>
            
            <p className="mt-8 text-sm text-blue-100">
              <Info className="inline h-4 w-4 mr-1" />
              Investing involves risk. Please consult with a licensed financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </section>
    );
  };
  