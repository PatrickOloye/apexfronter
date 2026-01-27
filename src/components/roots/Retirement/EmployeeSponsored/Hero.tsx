'use client';


import { useState, useEffect } from 'react';
import { Shield, ChartBar, Clock, Users } from 'lucide-react';
import Link from 'next/link';

export default function EmployHero() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-20 md:pt-24 md:pb-28">
          {/* Main Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text Content */}
            <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>  
              {/* <div className="inline-block px-3 py-1 mb-6 bg-blue-600 text-sm font-medium rounded-md">
                Apex Finance Solutions
              </div>
               */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Secure Your <span className="text-blue-400">Financial Future</span>
              </h1>
              
              <p className="text-gray-300 text-xl mb-8 max-w-lg">
                Expert guidance on Defined Benefit Pension Plans that provide guaranteed retirement income for life.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/signup">
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors duration-200 shadow-lg">
                  Get Started Now
                </button>
                </Link>
                <Link href="/signup">
                <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-md font-medium transition-colors duration-200">
                  Learn More
                </button>
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="text-gray-400 flex items-center gap-6">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span>30+ Years Experience</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span>10,000+ Clients</span>
                </div>
              </div>
            </div>
            
            {/* Right Column: Interactive Visual */}
            <div className={`transition-all duration-700 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 relative overflow-hidden">
                {/* Accent decorations */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600 rounded-full filter blur-3xl opacity-20 -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-600 rounded-full filter blur-3xl opacity-20 -ml-20 -mb-20"></div>
                
                {/* Calculator-like display */}
                <div className="bg-gray-900 p-4 rounded-lg mb-6 border border-gray-700 relative z-10">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-400">Retirement Calculator</span>
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                  </div>
                  <div className="text-3xl font-mono mb-2">$3,750<span className="text-blue-400">/mo</span></div>
                  <div className="text-gray-400 text-sm">Estimated pension payout</div>
                </div>
                
                {/* Features with icons */}
                <div className="grid grid-cols-2 gap-5 relative z-10">
                  <Feature 
                    icon={<Shield className="h-6 w-6 text-blue-400" />}
                    title="Guaranteed Income"
                    description="Fixed monthly payouts"
                  />
                  <Feature 
                    icon={<ChartBar className="h-6 w-6 text-blue-400" />}
                    title="No Market Risk"
                    description="Stable retirement funds"
                  />
                  <Feature 
                    icon={<Clock className="h-6 w-6 text-blue-400" />}
                    title="Lifelong Security"
                    description="Income that never runs out"
                  />
                  <Feature 
                    icon={<Users className="h-6 w-6 text-blue-400" />}
                    title="Family Protection"
                    description="Survivor benefits available"
                  />
                </div>
                
                {/* Formula visualization */}
                <div className="mt-6 bg-gray-900 rounded-lg p-3 border border-gray-700 text-center relative z-10">
                  <div className="text-sm text-gray-400 mb-1">Pension Formula</div>
                  <div className="flex items-center justify-center gap-2 text-sm md:text-base">
                    <span className="px-2 py-1 bg-blue-900 rounded">Salary</span>
                    <span>×</span>
                    <span className="px-2 py-1 bg-blue-900 rounded">Years</span>
                    <span>×</span>
                    <span className="px-2 py-1 bg-blue-900 rounded">Multiplier</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Feature component for the cards
// Define the props type for the Feature component
interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="bg-gray-850 rounded-lg p-3 border border-gray-700">
      <div className="flex items-start space-x-3">
        <div className="mt-1">{icon}</div>
        <div>
          <h3 className="font-medium text-white">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}