// components/AccountTypesSection.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface AccountType {
  title: string;
  description: string;
  cta: string;
}

interface AccountTypesSectionProps {
  title?: string;
  subtitle?: string;
  accountTypes: AccountType[];
}

const AccountTypesSection: React.FC<AccountTypesSectionProps> = ({
  title = "Savings Solutions for Every Need",
  subtitle = "Recognizing that every individual's saving journey is unique, we offer an array of account types tailored to specific needs.",
  accountTypes
}) => {
  const [position, setPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Clone accountTypes for infinite scrolling effect
  const duplicatedItems = [...accountTypes, ...accountTypes];
  
  // Determine item widths based on screen size
  const [itemWidth, setItemWidth] = useState(25); // Default: 4 items (25% each)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemWidth(100); // 1 item (100% width)
      } else if (window.innerWidth < 768) {
        setItemWidth(50); // 2 items (50% width)
      } else if (window.innerWidth < 1024) {
        setItemWidth(33.33); // 3 items (33.33% width)
      } else {
        setItemWidth(25); // 4 items (25% width)
      }
    };

    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Continuous scrolling animation
  useEffect(() => {
    const scrollSpeed = 0.2; // Speed of scrolling (percentage per frame)
    const totalWidth = accountTypes.length * itemWidth;
    let animationFrameId: number;
    
    const animate = () => {
      if (!isPaused) {
        setPosition(prevPosition => {
          // When position reaches one full cycle, reset back to 0
          if (prevPosition >= totalWidth) {
            return 0;
          }
          return prevPosition + scrollSpeed;
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [accountTypes.length, itemWidth, isPaused]);

  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div 
          className="relative overflow-hidden" 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={carouselRef}
        >
          <div className="overflow-hidden px-4">
            <div 
              className="flex"
              style={{ 
                transform: `translateX(-${position}%)`,
                transition: 'transform 0.1s linear',
              }}
            >
              {duplicatedItems.map((account, index) => (
                <div 
                  key={index} 
                  className="px-3 flex-shrink-0"
                  style={{ width: `${itemWidth}%` }}
                >
                  <div className="h-full p-6 rounded-lg shadow-md hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-b from-blue-50 to-gray-50">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{account.title}</h3>
                    <p className="text-gray-600 mb-6">{account.description}</p>
                    <Link 
                      href={`/savings/${account.title.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="text-blue-600 font-medium hover:text-blue-800"
                    >
                      {account.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountTypesSection;