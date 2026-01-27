import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';

const HeroSection = () => {
  const typeTarget = useRef(null);
  const [activeTab, setActiveTab] = useState('traditional');
  
  useEffect(() => {
    const typed = new Typed(typeTarget.current, {
      strings: [
        'Tax-advantaged',
        'Future-focused',
        'Personalized',
        'Secure'
      ],
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 1500,
      startDelay: 300,
      loop: true,
      smartBackspace: true
    });
    
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-indigo-900 via-blue-600 to-blue-700 text-white overflow-hidden">
      {/* Animated floating shapes */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-500/10"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5
            }}
          ></div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Column - Main Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-400/20 text-blue-200 text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Retirement planning reimagined</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              <span className="block text-blue-200">Your</span>
              <span className="inline-block mr-3 text-blue-400 bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-300"><span ref={typeTarget}></span></span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">Retirement Solution</span>
            </h1>
            
            <p className="text-xl text-blue-100 opacity-90 mb-8 max-w-xl">
              Unlock the potential of Individual Retirement Accounts with 
              <span className="font-semibold"> Apex Finance</span>. Choose the tax advantage that works best for your financial future.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#compare" className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                <span className="relative">Get Started Now</span>
                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
              <a href="#learn" className="inline-flex items-center justify-center px-8 py-3 font-medium text-blue-100 rounded-lg border border-blue-400/30 hover:bg-blue-800/30 transition-colors">
                Learn More
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="flex flex-col items-center sm:items-start">
                <div className="text-4xl font-bold text-blue-200">$7,000</div>
                <p className="text-blue-300 text-sm">Annual contribution limit</p>
              </div>
              <div className="w-px h-12 bg-blue-700/50 hidden sm:block"></div>
              <div className="flex flex-col items-center sm:items-start">
                <div className="text-4xl font-bold text-blue-200">0%</div>
                <p className="text-blue-300 text-sm">Account opening fees</p>
              </div>
              <div className="w-px h-12 bg-blue-700/50 hidden sm:block"></div>
              <div className="flex flex-col items-center sm:items-start">
                <div className="text-4xl font-bold text-blue-200">15K+</div>
                <p className="text-blue-300 text-sm">Happy investors</p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Interactive Tab Card */}
          <div className="order-1 lg:order-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-1.5 shadow-xl ring-1 ring-white/20">
              {/* Tab navigation */}
              <div className="flex mb-2 rounded-xl overflow-hidden p-1 bg-blue-900/50">
                <button 
                  onClick={() => setActiveTab('traditional')}
                  className={`flex-1 py-3 px-5 text-center rounded-lg transition font-medium ${
                    activeTab === 'traditional' 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                      : 'text-blue-200 hover:bg-blue-800/40'
                  }`}
                >
                  Traditional IRA
                </button>
                <button 
                  onClick={() => setActiveTab('roth')}
                  className={`flex-1 py-3 px-5 text-center rounded-lg transition font-medium ${
                    activeTab === 'roth' 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                      : 'text-blue-200 hover:bg-blue-800/40'
                  }`}
                >
                  Roth IRA
                </button>
              </div>
              
              {/* Tab content */}
              <div className="bg-gradient-to-br from-blue-800/40 to-indigo-900/40 backdrop-blur-lg rounded-xl p-6 min-h-[400px]">
                {activeTab === 'traditional' && (
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold">Traditional IRA</h3>
                    </div>
                    
                    <div className="animate-fadeIn">
                      <div className="p-4 rounded-lg bg-gradient-to-r from-blue-700/30 to-indigo-800/30 mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-blue-200">Key Benefit</span>
                          <span className="bg-blue-600/30 text-blue-200 px-2 py-1 rounded text-xs font-medium">Tax-Deductible</span>
                        </div>
                        <p className="text-lg font-medium text-white">Reduce Your Current Taxable Income</p>
                      </div>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-blue-300 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Contributions may be tax-deductible, reducing your current tax bill</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-blue-300 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Money grows tax-deferred until retirement</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-blue-300 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Ideal if you expect to be in a lower tax bracket in retirement</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-red-300 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Required minimum distributions (RMDs) start at age 73</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {activeTab === 'roth' && (
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold">Roth IRA</h3>
                    </div>
                    
                    <div className="animate-fadeIn">
                      <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-700/30 to-purple-800/30 mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-blue-200">Key Benefit</span>
                          <span className="bg-indigo-600/30 text-blue-200 px-2 py-1 rounded text-xs font-medium">Tax-Free Growth</span>
                        </div>
                        <p className="text-lg font-medium text-white">Enjoy Tax-Free Withdrawals in Retirement</p>
                      </div>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-blue-300 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Contributions are made with after-tax dollars</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-blue-300 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Qualified withdrawals are 100% tax-free in retirement</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-blue-300 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Access to contributions without penalty anytime</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-blue-300 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>No required minimum distributions (RMDs)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            {
              icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
              title: "Simple Setup",
              desc: "Open your IRA account in minutes with our streamlined digital process"
            },
            {
              icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
              title: "Customization",
              desc: "Tailor your retirement plan with a wide range of investment options"
            },
            {
              icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
              title: "Financial Security",
              desc: "Rest easy knowing your retirement savings are protected and growing"
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all hover:bg-white/10">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-5 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-blue-100 opacity-80">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;