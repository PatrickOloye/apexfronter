'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Div2Sides = () => {
  return (
    <div className="w-full bg-gradient-to-br from-white to-blue-50 py-16">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex-1 p-5">
            <div className="space-y-6">
              <div className="inline-block">
                <h3 className="text-blue-600 font-medium mb-1">INVESTMENT SOLUTIONS</h3>
                <div className="h-1 w-20 bg-blue-600 rounded"></div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                Wealth Management Services
              </h1>
              
              <p className="text-gray-700 leading-relaxed text-lg">
                At APEX Banking, we provide sophisticated wealth management solutions 
                tailored to your unique financial goals. Our expert advisors work with 
                you to build, preserve, and transfer wealth across generations.
              </p>
              
              <div className="pt-4">
                <Link 
                  href="/wealth-management" 
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center group"
                >
                  Discover our wealth management approach
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </Link>
              </div>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">Portfolio Management</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">Retirement Planning</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">Estate Planning</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-end">
            <div className="perspective-1000">
              <Image
                src="/landing-page/wealth-management.jpg" 
                alt="Wealth management services"
                width={500}
                height={300}
                className="transition-transform duration-300 transform rotate-[-5deg] rounded-lg shadow-md hover:rotate-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Div2Sides;