// components/investments/CollateralCarousel.tsx
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export interface CollateralItem {
  title: string;
  description: string;
  image: string;
  features: string[];
  cta?: {
    text: string;
    href: string;
  };
}

interface CollateralCarouselProps {
  title: string;
  subtitle: string;
  items: CollateralItem[];
  primaryColor?: string;
  bgColor?: string;
  textColor?: string;
}

const CollateralCarousel: React.FC<CollateralCarouselProps> = ({
  title,
  subtitle,
  items,
  primaryColor = "blue-600",
  bgColor = "bg-gray-50",
  textColor = "text-gray-900",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToNext = React.useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % items.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning, items.length]);

  const goToPrev = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === activeIndex) return;
    
    setIsTransitioning(true);
    setActiveIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  useEffect(() => {
    // Auto advance slides
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 6000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [goToNext]);

  return (
    <section className={`${bgColor} py-16 px-4 overflow-hidden`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>{title}</h2>
          <p className={`${textColor} opacity-80 max-w-3xl mx-auto`}>{subtitle}</p>
        </div>
        
        <div className="relative">
          {/* Carousel container */}
          <div className="relative flex items-center overflow-hidden rounded-xl shadow-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out w-full"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {items.map((item, index) => (
                <div key={index} className="min-w-full flex flex-col lg:flex-row">
                  {/* Image side */}
                  <div className="lg:w-1/2 h-64 lg:h-auto relative">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center lg:items-end p-6">
                      <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    </div>
                  </div>
                  
                  {/* Content side */}
                  <div className={`lg:w-1/2 p-6 lg:p-10 bg-white`}>
                    <h3 className={`text-2xl font-bold mb-4 ${textColor} lg:hidden text-white`}>{item.title}</h3>
                    <p className={`${textColor} mb-6`}>{item.description}</p>
                    
                    <div className="mb-6">
                      <h4 className={`text-lg font-semibold mb-3 ${textColor}`}>Key Features:</h4>
                      <ul className="space-y-2">
                        {item.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <div className={`flex-shrink-0 w-5 h-5 mt-1 rounded-full bg-${primaryColor} flex items-center justify-center`}>
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className={`ml-3 ${textColor}`}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {item.cta && (
                      <a 
                        href={item.cta.href} 
                        className={`inline-block px-6 py-3 bg-${primaryColor} text-white rounded-lg font-medium hover:bg-${primaryColor}/90 transition-colors`}
                      >
                        {item.cta.text}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Arrow Navigation */}
            <button 
              onClick={goToPrev}
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition z-10 ${textColor}`}
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            
            <button 
              onClick={goToNext}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition z-10 ${textColor}`}
              aria-label="Next slide"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
          
          {/* Dots Navigation */}
          <div className="flex justify-center mt-6 space-x-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${activeIndex === index ? `bg-${primaryColor}` : 'bg-gray-300'} transition-colors`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollateralCarousel;