'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface StrategyCardProps {
  title: string;
  description: string;
  imageUrl: string;
  colorClass?: string;
}

const StrategyCard = ({ title, description, imageUrl, colorClass = "bg-blue-600" }: StrategyCardProps) => {
  return (
    <div className="flex flex-col md:flex-row overflow-hidden rounded-xl shadow-md">
      <div className="md:w-1/3 relative h-48 md:h-auto">
        <Image 
          src={imageUrl} 
          alt={title} 
          fill 
          className="object-cover" 
        />
      </div>
      <div className={`${colorClass} text-white p-6 flex-1`}>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

interface Strategy {
  title: string;
  description: string;
  imageUrl: string;
  colorClass?: string;
}

interface StrategyCardCarouselProps {
  strategies: Strategy[];
}

const StrategyCardCarousel = ({ strategies = [] }: StrategyCardCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % strategies.length);
  };
  
  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + strategies.length) % strategies.length);
  };
  
  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={carouselRef}>
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {strategies.map((strategy, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4 py-2">
              <StrategyCard 
                title={strategy.title}
                description={strategy.description}
                imageUrl={strategy.imageUrl}
                colorClass={strategy.colorClass || "bg-blue-600"}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Controls */}
      <button 
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
        onClick={prevSlide}
      >
        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
        onClick={nextSlide}
      >
        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {strategies.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};



export default StrategyCardCarousel;