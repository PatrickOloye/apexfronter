
// src/components/investment/TestimonialCarousel.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Testimonial = {
  id: number;
  quote: string;
  author: string;
  role: string;
  imageUrl: string;
};

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
  colorClass?: string;
  autoplaySpeed?: number;
};

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  colorClass = 'blue-600',
  autoplaySpeed = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, [testimonials.length]);
  
  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  
  useEffect(() => {
    const interval = setInterval(goToNext, autoplaySpeed);
    return () => clearInterval(interval);
  }, [autoplaySpeed, goToNext]);
  
  return (
    <section className={`py-16 bg-gradient-to-r from-blue-900 to-blue-900 text-white`}>
      <div className="container mx-auto px-4">
        <div className="relative max-w-4xl mx-auto">
          <div className="flex overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`w-full flex-shrink-0 transition-all duration-500 ease-in-out transform ${
                  index === currentIndex ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
                  <div className="md:w-1/4 flex-shrink-0">
                    <div className="h-24 w-24 md:h-32 md:w-32 relative rounded-full overflow-hidden mx-auto border-4 border-white">
                      <Image 
                        src={testimonial.imageUrl} 
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="md:w-3/4">
                    <div className="text-4xl font-serif mb-4">&apos;</div>
                    <p className="text-xl mb-6">{testimonial.quote}</p>
                    <div>
                      <p className="font-bold text-lg">{testimonial.author}</p>
                      <p className="opacity-75">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-6 bg-white text-blue-600 rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            onClick={goToPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-6 bg-white text-blue-600 rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-30'
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;