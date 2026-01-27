
// TestimonialCarousel.tsx
import { useState, useEffect, ReactNode } from 'react';
import Image from 'next/image';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string;
  rating?: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  interval?: number;
  colorScheme?: string;
}

export const TestimonialCarousel = ({
  testimonials,
  autoplay = true,
  interval = 5000,
  colorScheme = 'blue-600'
}: TestimonialCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!autoplay) return;
    
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoplay, interval, testimonials.length]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? `text-${colorScheme}` : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 p-8">
              <div className="flex flex-col items-center text-center">
                {testimonial.avatarUrl ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                    <Image
                      src={testimonial.avatarUrl}
                      alt={testimonial.author}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className={`w-20 h-20 rounded-full bg-${colorScheme}/10 flex items-center justify-center mb-4`}>
                    <span className={`text-${colorScheme} text-xl font-bold`}>
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                )}
                
                {testimonial.rating && renderStars(testimonial.rating)}
                
                <blockquote className="text-lg italic text-gray-700 mb-6">&apos;{testimonial.quote}&apos;</blockquote>
                <cite className="not-italic">
                  <div className="font-bold text-gray-800">{testimonial.author}</div>
                  <div className="text-gray-500">{testimonial.role}</div>
                </cite>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center p-4 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? `bg-${colorScheme}` : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 rounded-full p-2 text-gray-800 hover:bg-white"
        onClick={() => setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length)}
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 rounded-full p-2 text-gray-800 hover:bg-white"
        onClick={() => setActiveIndex((activeIndex + 1) % testimonials.length)}
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};
