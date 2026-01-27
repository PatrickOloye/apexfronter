
import Image from 'next/image';
import { ArrowRight,  } from 'lucide-react';
export const GettingStartedSteps = ({
    title = "How to Start Investing with Apex Finance",
    description = "Getting started is easy. Follow these simple steps to begin building your bond portfolio today.",
    steps = [
      {
        number: 1,
        title: "Log Into Your Dashboard",
        description: "Once logged in, navigate to the Invest Tab located prominently on your homepage.",
        imageSrc: "/images/dashboard-login.jpg",
      },
      {
        number: 2,
        title: "Explore the Bond Marketplace",
        description: "Use filters to search for bond type, yield range, maturity date, and more.",
        imageSrc: "/images/bond-marketplace.jpg",
      },
      {
        number: 3,
        title: "Review Detailed Bond Profiles",
        description: "Each bond listing includes comprehensive information to help you make informed decisions.",
        imageSrc: "/images/bond-profile.jpg",
      },
      {
        number: 4,
        title: "Purchase or Monitor",
        description: "Buy now using available funds or add bonds to your watchlist for later review.",
        imageSrc: "/images/purchase-bonds.jpg",
      },
      {
        number: 5,
        title: "Track Performance",
        description: "Your dashboard will show holdings, income, payment dates, and market value changes.",
        imageSrc: "/images/track-performance.jpg",
      },
    ],
    color = "blue-600"
  }) => {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-${color}`}>{title}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
          </div>
          
          <div className="space-y-12 mt-8">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} gap-8`}>
                <div className="md:w-1/2">
                  <div className="relative">
                    <div className={`absolute -z-10 inset-0 rounded-2xl bg-${color}/5 transform ${index % 2 === 0 ? 'translate-x-4 translate-y-4' : '-translate-x-4 translate-y-4'}`}></div>
                    <div className="aspect-video relative rounded-xl overflow-hidden shadow-lg">
                      <Image 
                        src={step.imageSrc} 
                        alt={`Step ${step.number}: ${step.title}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <div className="flex items-center mb-4">
                    <div className={`flex items-center justify-center h-12 w-12 rounded-full bg-${color} text-white font-bold text-lg`}>
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold ml-4">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href="#start-investing" 
              className={`inline-flex items-center px-6 py-3 rounded-lg bg-${color} hover:bg-${color}/90 text-white font-medium transition-colors`}
            >
              Start Your Investment Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    );
  };