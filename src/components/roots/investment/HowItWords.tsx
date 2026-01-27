import Image from 'next/image';
import { Search, TrendingUp, DollarSign, BarChart, Bell } from 'lucide-react';

export default function HowItWorksSection({ colorScheme = "blue-600" }) {
  const steps = [
    {
      title: "Browse Global Markets",
      description: "Access real-time data from major exchanges like NYSE, NASDAQ, London Stock Exchange, and more.",
      icon: <Search className="h-8 w-8" />,
      image: "/api/placeholder/500/300",
      imageAlt: "Global markets dashboard interface"
    },
    {
      title: "Search for Stocks",
      description: "Look up companies by name or ticker symbol. Get instant insights including price history, market cap, and analyst ratings.",
      icon: <BarChart className="h-8 w-8" />,
      image: "/api/placeholder/500/300",
      imageAlt: "Stock search feature with company information"
    },
    {
      title: "Trade Instantly",
      description: "Place trades in seconds using available funds from your Apex Checking Account with no delay.",
      icon: <DollarSign className="h-8 w-8" />,
      image: "/api/placeholder/500/300",
      imageAlt: "Trading interface showing buy/sell options"
    },
    {
      title: "Monitor Your Portfolio",
      description: "Watch your investments grow alongside your checking balance — all in one unified dashboard.",
      icon: <TrendingUp className="h-8 w-8" />,
      image: "/api/placeholder/500/300",
      imageAlt: "Portfolio monitoring dashboard"
    },
    {
      title: "Set Alerts and Goals",
      description: "Receive price alerts and set personalized investment goals based on your financial aspirations.",
      icon: <Bell className="h-8 w-8" />,
      image: "/api/placeholder/500/300",
      imageAlt: "Alerts and goals setting interface"
    }
  ];

  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            How Apex InvestLink™ Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Seamlessly integrate your everyday banking with powerful investment capabilities
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
            >
              <div className="md:w-1/2">
                <div className={`inline-flex items-center justify-center p-3 rounded-full bg-${colorScheme} text-white mb-6`}>
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  {step.description}
                </p>
                <div className="hidden md:block">
                  <button className={`px-6 py-2 border border-${colorScheme} text-${colorScheme} rounded-lg font-medium hover:bg-${colorScheme} hover:text-white transition-colors`}>
                    Learn More
                  </button>
                </div>
              </div>
              
              <div className="md:w-1/2 rounded-xl overflow-hidden shadow-lg">
                <Image 
                  src={step.image} 
                  alt={step.imageAlt}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="md:hidden mt-4 text-center w-full">
                <button className={`px-6 py-2 border border-${colorScheme} text-${colorScheme} rounded-lg font-medium hover:bg-${colorScheme} hover:text-white transition-colors`}>
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}