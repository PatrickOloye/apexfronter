import { useState as useCarouselState } from 'react';
import React from 'react';
import Image from 'next/image';
interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatarPath?: string;
}

interface TestimonialsCarouselProps {
  heading: string;
  subheading: string;
  testimonials: Testimonial[];
  colorTheme?: 'blue' | 'green' | 'purple';
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  heading,
  subheading,
  testimonials,
  colorTheme = 'blue'
}) => {
  const [activeIndex, setActiveIndex] = useCarouselState(0);
  
  const textColorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
  };
  
  const bgColorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
  };

  const nextSlide = () => {
    setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  return (
    <section className={`py-16 ${bgColorClasses[colorTheme]} text-white`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
          <p className="max-w-2xl mx-auto opacity-90">{subheading}</p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white text-gray-800 rounded-lg shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-center mb-8">
              <svg className={`w-12 h-12 ${textColorClasses[colorTheme]} opacity-20`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            
            <div className="text-center">
              <p className="text-xl md:text-2xl font-medium mb-8">
                &apos;{testimonials[activeIndex].quote}&apos;
              </p>
              
              <div className="flex flex-col items-center">
                {testimonials[activeIndex].avatarPath && (
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                    <Image
                      src={testimonials[activeIndex].avatarPath}
                      alt={testimonials[activeIndex].name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                )}
                <h4 className="font-bold">{testimonials[activeIndex].name}</h4>
                <p className="text-gray-500">{testimonials[activeIndex].title}</p>
              </div>
            </div>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4 md:-ml-6">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4 md:-mr-6">
            <button 
              onClick={nextSlide}
              className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 mx-1 rounded-full ${activeIndex === index ? 'bg-white' : 'bg-white bg-opacity-40'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};