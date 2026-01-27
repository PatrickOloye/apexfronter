import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

export default function CTASection({ colorTheme = "blue-600" }) {
  const features = [
    "Zero monthly maintenance fees",
    "Real-time stock trading integration",
    "Zero commission on most US-listed stocks",
    "FDIC insured deposits",
    "24/7 customer support",
    "Advanced security features"
  ];

  return (
    <div className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="bg-gradient-to-r from-blue-900 to-blue-900 p-10 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Join the Apex Finance Movement Today
              </h2>
              <p className="text-blue-100 mb-8 text-lg">
                Experience the future of banking with integrated investing. Open your Apex Checking Account and unlock investment opportunities instantly.
              </p>
              
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-white">
                    <Check className="h-5 w-5 mr-2 text-green-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div>
                <button className="px-8 py-3 bg-white text-blue-900 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-md flex items-center justify-center">
                  Open Your Account Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="relative h-96 md:h-auto">
              <Image 
                src="/api/placeholder/800/600" 
                alt="Apex Finance mobile app interface showing investment features"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-8">
                <div className="bg-white bg-opacity-90 p-6 rounded-lg max-w-md">
                  <h3 className={`text-xl font-bold mb-2 text-${colorTheme}`}>
                    Banking Has Evolved – So Should You
                  </h3>
                  <p className="text-gray-800">
                    With features like real-time stock trading, smart budgeting tools, and personalized investment guidance, Apex Finance helps you build a complete financial ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center text-gray-500">
          <p className="text-sm">
            Investing involves risk. Past performance is not indicative of future results. The value of your investments may fluctuate, and you may gain or lose money. Apex Finance does not provide investment advice. Please consult with a licensed financial advisor before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
}