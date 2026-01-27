import { useState } from 'react';
import Image from 'next/image';
import {  ChevronLeft, ChevronRight,  } from 'lucide-react';
export const InvestmentTestimonials = ({
    title = "Meet Our Community",
    subtitle = "Real People, Real Results",
    testimonials = [
      {
        quote: "I was intimidated by bonds until I tried Apex. Now I'm earning steady income every month without stress.",
        author: "Rachel T.",
        position: "Retired Nurse",
        imageSrc: "/images/testimonial-1.jpg",
        rating: 5,
      },
      {
        quote: "As a young professional, I wanted to diversify beyond stocks. Apex made it easy to get started with government bonds.",
        author: "David L.",
        position: "Software Engineer",
        imageSrc: "/images/testimonial-2.jpg",
        rating: 5,
      },
      {
        quote: "The educational tools helped me understand how bonds fit into my long-term financial plan. I feel much more confident now.",
        author: "Maria G.",
        position: "Small Business Owner",
        imageSrc: "/images/testimonial-3.jpg",
        rating: 5,
      },
    ],
    color = "blue-600"
  }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    
    const nextTestimonial = () => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };
    
    const prevTestimonial = () => {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };
    
    return (
      <section className={`py-16 bg-gradient-to-r from-blue-900 to-blue-900 text-white`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
            <p className="text-xl text-blue-100">{subtitle}</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white text-gray-800 rounded-xl p-8 shadow-lg">
                      <div className="flex items-center space-x-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <svg key={i} className={`w-5 h-5 text-${color}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                      
                      <blockquote className="text-xl italic mb-6">&apos;{testimonial.quote}&apos;</blockquote>
                      
                      <div className="flex items-center">
                        <div className="h-14 w-14 rounded-full overflow-hidden mr-4">
                          <Image 
                            src={testimonial.imageSrc} 
                            alt={testimonial.author}
                            width={56}
                            height={56}
                            objectFit="cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold">{testimonial.author}</div>
                          <div className="text-gray-500">{testimonial.position}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={prevTestimonial} 
              className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg text-gray-800 hover:bg-gray-100 z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button 
              onClick={nextTestimonial} 
              className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg text-gray-800 hover:bg-gray-100 z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-8 rounded-full ${activeIndex === index ? 'bg-white' : 'bg-blue-300'}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };