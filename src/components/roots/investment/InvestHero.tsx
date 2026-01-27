// HeroSection.jsx
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Typed from 'typed.js';

const HeroSection = () => {
  // Reference for the typing animation element
  const typeTarget = useRef(null);
  
  useEffect(() => {
    // Initialize Typed.js
    const typed = new Typed(typeTarget.current, {
      strings: [
        'Manage your money.',
        'Grow your investments.',
        'Build wealth seamlessly.',
        'Access global markets instantly.'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
      smartBackspace: true
    });
    
    // Clean up on unmount
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-400 to-slate-100">
      {/* Abstract background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/3"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/4"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-600/5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Animated dots grid */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute w-full h-full grid grid-cols-12 gap-8">
          {Array(48).fill(null).map((_, i) => (
            <div key={i} className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{
              animationDelay: `${Math.random() * 5}s`,
              transform: `translate(${Math.random() * 100}px, ${Math.random() * 100}px)`
            }}></div>
          ))}
        </div>
      </div>

      {/* Main hero content */}
      <div className="container mx-auto px-4 py-16 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left content */}
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0 z-10">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-600/10 text-blue-600 font-medium text-sm">
              The Future of Banking is Here
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6">
              Welcome to Apex Finance
              <br />
              <span className="text-blue-600">
                Where you <span ref={typeTarget}></span>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl">
              Our <span className="font-semibold">Apex Investment Account</span> ensures your safe and secure investments. It&apos;s your gateway to a powerful financial future with integrated investment opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30">
                Open an Account
              </button>
              <button className="px-8 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all">
                Learn More
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-medium">
                    {String.fromCharCode(64 + n)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-600">
                <span className="font-semibold">10,000+</span> customers already enjoying Apex benefits
              </div>
            </div>
          </div>
          
          {/* Right content - dashboard mockup */}
          <div className="w-full lg:w-1/2 z-10">
            <div className="relative">
              {/* Dashboard frame */}
              <div className="bg-white rounded-2xl shadow-2xl shadow-blue-600/10 border border-slate-100 p-2 transform rotate-1 hover:rotate-0 transition-all duration-500">
                <div className="bg-slate-50 rounded-xl p-4">
                  {/* Dashboard header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <span className="font-bold text-slate-800">Apex Dashboard</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </div>
                      <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-medium">
                        JD
                      </div>
                    </div>
                  </div>
                  
                  {/* Account overview */}
                  <div className="bg-white p-5 rounded-lg mb-4 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-slate-600">Investment Account</h3>
                      <span className="text-sm text-blue-600">View Details</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-sm text-slate-500 block mb-1">Available Balance</span>
                        <span className="text-3xl font-bold text-slate-800">$12,750.84</span>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg shadow-sm">Transfer</button>
                    </div>
                  </div>
                  
                  {/* Investment section */}
                  <div className="bg-white p-5 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-slate-600">Investment Portfolio</h3>
                      <div className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">+5.23%</div>
                    </div>
                    <div className="flex gap-3 mb-4">
                      <div className="flex-1 p-3 border border-slate-100 rounded-lg bg-slate-50">
                        <div className="text-xs text-slate-500 mb-1">AAPL</div>
                        <div className="text-sm font-medium">$175.34</div>
                        <div className="text-xs text-green-600">+2.4%</div>
                      </div>
                      <div className="flex-1 p-3 border border-slate-100 rounded-lg bg-slate-50">
                        <div className="text-xs text-slate-500 mb-1">MSFT</div>
                        <div className="text-sm font-medium">$312.78</div>
                        <div className="text-xs text-green-600">+1.8%</div>
                      </div>
                      <div className="flex-1 p-3 border border-slate-100 rounded-lg bg-slate-50">
                        <div className="text-xs text-slate-500 mb-1">TSLA</div>
                        <div className="text-sm font-medium">$184.92</div>
                        <div className="text-xs text-red-600">-0.7%</div>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors rounded-lg text-sm font-medium">
                      Trade Stocks Instantly
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-600/10 rounded-full blur-md z-[-1]"></div>
              <div className="absolute -left-8 -top-8 w-20 h-20 bg-blue-600/20 rounded-full blur-md z-[-1]"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feature highlights */}
      <div className="container mx-auto px-4 pb-16 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              title: "Instant Transfers",
              desc: "Move money between accounts with zero delays"
            },
            {
              icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
              title: "Zero Fees",
              desc: "No monthly maintenance or hidden charges"
            },
            {
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
              title: "Instant Trading",
              desc: "Buy and sell stocks directly from your account"
            },
            {
              icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
              title: "Enterprise Security",
              desc: "Bank-grade protection for all your assets"
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;