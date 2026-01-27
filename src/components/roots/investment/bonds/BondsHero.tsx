import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Shield, LineChart, BarChart4, Clock } from 'lucide-react';

const phrases = [
  "Your Gateway to Secure, Steady Growth",
  "Build Wealth with Fixed-Income Securities",
  "Smart Bond Investing Made Simple"
];

export default function BondsHero() {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  
  // Text for typewriter effect
  
  // Typewriter effect
  useEffect(() => {
    if (currentIndex < phrases[currentPhrase].length) {
      const timeout = setTimeout(() => {
        setText(prevText => prevText + phrases[currentPhrase][currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    } else {
      // Pause at the end of the phrase
      const pauseTimeout = setTimeout(() => {
        // Clear text and reset index
        setText('');
        setCurrentIndex(0);
        // Move to next phrase
        setCurrentPhrase((prevPhrase) => (prevPhrase + 1) % phrases.length);
      }, 3000);
      
      return () => clearTimeout(pauseTimeout);
    }
  }, [currentIndex, currentPhrase]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      {/* Background abstract elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-40 w-80 h-80 rounded-full bg-blue-400 opacity-10 blur-3xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-blue-300 opacity-5 blur-2xl"></div>
      </div>
      
      {/* Graph pattern overlay */}
      <div className="absolute inset-0 opacity-5" 
           style={{
             backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0 L50 50 L100 0\' fill=\'none\' stroke=\'%23FFFFFF\' stroke-width=\'1\'/%3E%3C/svg%3E")',
             backgroundSize: '50px 50px'
           }}>
      </div>
      
      {/* Main content container */}
      <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <div className="w-full md:w-1/2 space-y-8">    
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="block mb-2 text-white">Welcome to Apex Finance:<span className="text-blue-300 h-16 md:h-20 block">
                {text}
                <span className="animate-pulse">|</span>
              </span></span>
              
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100/90 max-w-xl pt-8">
              At <strong>Apex Finance</strong>, we believe in empowering our Customers not just to manage their money, but to grow it wisely with our next-generation investment platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-700/30">
                Open an Account <ArrowRight size={18} />
              </button>
              <button className="px-6 py-3 bg-blue-700/40 hover:bg-blue-700/60 backdrop-blur-sm border border-blue-400/30 rounded-lg font-medium transition-all flex items-center justify-center">
                Learn More
              </button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-6">
              <div className="flex items-center gap-2">
                <Shield size={20} className="text-blue-300" />
                <span className="text-sm text-blue-200">FDIC Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-blue-300" />
                <span className="text-sm text-blue-200">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart4 size={20} className="text-blue-300" />
                <span className="text-sm text-blue-200">Market Analytics</span>
              </div>
            </div>
          </div>
          
          {/* Visual element - Dashboard Preview */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              {/* Dashboard mockup */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-blue-400/20 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <h3 className="font-semibold">Apex Investment Account</h3>
                  </div>
                  <div className="text-sm bg-blue-600/20 px-3 py-1 rounded-full">
                    Live Data
                  </div>
                </div>
                
                {/* Chart visualization */}
                <div className="h-64 mb-4 overflow-hidden rounded-lg bg-gradient-to-r from-blue-800/40 to-blue-700/40 p-4 flex items-end gap-2">
                  {/* Simplified bond chart visualization */}
                  {[30, 45, 35, 50, 65, 55, 70, 60, 75, 80, 75, 85].map((height, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                      <div 
                        className="w-full bg-blue-400/70 rounded-sm"
                        style={{height: `${height}%`}}
                      ></div>
                      <span className="text-xs text-blue-300">{index+1}</span>
                    </div>
                  ))}
                  
                  {/* Line overlay for yield curve */}
                  <div className="absolute inset-x-10 bottom-16 h-32 flex items-end">
                    <svg viewBox="0 0 100 40" className="w-full overflow-visible">
                      <path 
                        d="M0,35 C20,32 40,25 60,15 C80,5 90,10 100,5" 
                        fill="none" 
                        stroke="#3B82F6" 
                        strokeWidth="1.5"
                        strokeDasharray="1 2"
                      />
                    </svg>
                  </div>
                </div>
                
                {/* Bond statistics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600/20 to-blue-500/10">
                    <p className="text-xs text-blue-300 mb-1">Current Yield</p>
                    <p className="text-lg font-bold">5.2%</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600/20 to-blue-500/10">
                    <p className="text-xs text-blue-300 mb-1">Bond Rating</p>
                    <p className="text-lg font-bold">AAA</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600/20 to-blue-500/10">
                    <p className="text-xs text-blue-300 mb-1">Time to Maturity</p>
                    <p className="text-lg font-bold">5 Years</p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -bottom-4 -left-8 bg-blue-600/90 backdrop-blur-sm p-3 rounded-lg shadow-lg transform -rotate-3 border border-blue-500">
                <div className="flex items-center gap-2">
                  <LineChart size={20} className="text-blue-100" />
                  <div>
                    <p className="text-xs text-blue-200">Monthly Income</p>
                    <p className="font-bold">$1,250</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500/90 to-green-600/90 backdrop-blur-sm p-3 rounded-lg shadow-lg transform rotate-2 border border-green-400/50">
                <p className="text-xs mb-1">Risk Level</p>
                <div className="flex gap-1">
                  <div className="w-8 h-2 rounded-full bg-green-300"></div>
                  <div className="w-8 h-2 rounded-full bg-green-300"></div>
                  <div className="w-8 h-2 rounded-full bg-white/30"></div>
                  <div className="w-8 h-2 rounded-full bg-white/30"></div>
                </div>
                <p className="text-xs mt-1 text-right font-medium">Low</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {[
            {
              title: "No Brokerage Fees",
              description: "Buy and sell bonds instantly without paying hidden fees or commissions.",
              icon: "💰"
            },
            {
              title: "Diverse Selection",
              description: "Access a broad range of bonds, from Treasury to corporate and municipal bonds.",
              icon: "🔄"
            },
            {
              title: "Real-Time Pricing",
              description: "See up-to-the-minute prices and yields before committing any funds.",
              icon: "⏱️"
            },
            {
              title: "Smart Bond Matching",
              description: "Get personalized recommendations based on your financial goals.",
              icon: "✅"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-blue-800/30 backdrop-blur-sm border border-blue-500/20 p-6 rounded-xl hover:bg-blue-700/30 transition-colors group">
              <div className="text-2xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-100">{feature.title}</h3>
              <p className="text-blue-200/90">{feature.description}</p>
              <div className="mt-4 text-blue-400 flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
        
        {/* Social proof */}
        <div className="flex flex-wrap justify-center gap-4 mt-16">
          <div className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-blue-200 flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-blue-900"></div>
              ))}
            </div>
            <span>10,000+ active investors</span>
          </div>
          <div className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-blue-200 flex items-center gap-2">
            <span className="text-yellow-300">★★★★★</span>
            <span>4.9/5 rating (2,400+ reviews)</span>
          </div>
          <div className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-blue-200 flex items-center gap-2">
            <span>Featured in </span>
            <span className="font-semibold">Forbes, Bloomberg, WSJ</span>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-16" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.44,118.92,130.61,111.31,191.15,100.41,250.48,89.64,268.71,64,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>
    </div>
  );
}