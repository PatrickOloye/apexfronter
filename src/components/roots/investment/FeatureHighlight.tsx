import { useState } from 'react';
import { ChevronRight, BarChart2, Shield, Globe, Zap } from 'lucide-react';

export default function InvestmentFeature() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const features = [
    {
      title: "Direct Stock Market Access",
      description: "Trade global equities directly from your checking account with zero platform fees",
      icon: <BarChart2 className="h-12 w-12 text-blue-600" />,
      stats: "Access to 30+ global markets"
    },
    {
      title: "Enterprise-Grade Security",
      description: "Your investments are protected with end-to-end encryption and multi-factor authentication",
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      stats: "FDIC insured deposits"
    },
    {
      title: "International Market Access",
      description: "Diversify your portfolio with stocks from emerging and developed markets worldwide",
      icon: <Globe className="h-12 w-12 text-blue-600" />,
      stats: "Trade in 25+ currencies"
    },
    {
      title: "Instant Execution",
      description: "Execute trades within seconds using funds directly from your checking account",
      icon: <Zap className="h-12 w-12 text-blue-600" />,
      stats: "No waiting for transfers"
    }
  ];

  return (
    <div className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Apex Finance Investment Integration
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience a revolutionary checking account that seamlessly integrates with global stock markets
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-gray-100 rounded-xl p-8 h-full">
            <div className="space-y-6">
              {features.map((feature, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${activeIndex === idx ? 'bg-gradient-to-r from-blue-900 to-blue-900 text-white shadow-lg' : 'bg-white hover:bg-gray-50'}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold text-lg ${activeIndex === idx ? 'text-white' : 'text-gray-900'}`}>
                      {feature.title}
                    </h3>
                    <ChevronRight className={`h-5 w-5 ${activeIndex === idx ? 'text-white' : 'text-blue-600'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="flex justify-center mb-6">
              {features[activeIndex].icon}
            </div>
            <h3 className="text-2xl font-bold text-center mb-4 text-gray-900">
              {features[activeIndex].title}
            </h3>
            <p className="text-gray-600 text-center mb-6 text-lg">
              {features[activeIndex].description}
            </p>
            <div className="bg-blue-50 p-4 rounded-lg flex justify-center items-center">
              <p className="text-blue-600 font-medium">{features[activeIndex].stats}</p>
            </div>
            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}