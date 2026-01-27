import Image from 'next/image';
import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialsSection({ colorTheme = "blue-600" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      quote: "I never thought I could start investing with just $50. Apex made it so simple and fun. Now I'm watching my portfolio grow every day alongside my checking account.",
      name: "Lena M.",
      role: "Teacher",
      image: "/api/placeholder/100/100",
      rating: 5
    },
    {
      quote: "As a freelancer, I needed a checking account that could handle my variable income and let me invest easily. Apex does both beautifully.",
      name: "James T.",
      role: "Graphic Designer",
      image: "/api/placeholder/100/100",
      rating: 5
    },
    {
      quote: "The ability to trade international stocks from my phone changed how I think about investing. I feel more connected to the global economy now.",
      name: "Priya R.",
      role: "Engineer",
      image: "/api/placeholder/100/100",
      rating: 5
    },
    {
      quote: "Setting up recurring investments from my checking account was incredibly easy. It's like having a financial advisor and bank all in one.",
      name: "Michael K.",
      role: "Marketing Executive",
      image: "/api/placeholder/100/100",
      rating: 5
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full py-16 bg-gradient-to-r from-blue-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Real stories from customers who&apos;ve transformed their financial lives with Apex Finance
          </p>
        </div>

        <div className="relative">
          <div className="mx-auto max-w-4xl bg-white text-gray-900 rounded-xl shadow-2xl p-8">
            <div className="mb-6 flex justify-center">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <Star key={i} className={`h-6 w-6 text-${colorTheme} fill-current`} />
              ))}
            </div>
            
            <blockquote className="text-center">
              <p className="text-xl font-medium italic mb-8">
                &apos;{testimonials[activeIndex].quote}&apos;
              </p>
              
              <div className="flex items-center justify-center">
                <div className="mr-4">
                  <Image 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name} 
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-lg">{testimonials[activeIndex].name}</div>
                  <div className="text-gray-600">{testimonials[activeIndex].role}</div>
                </div>
              </div>
            </blockquote>
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full bg-blue-800 hover:bg-blue-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    idx === activeIndex ? 'bg-white' : 'bg-blue-800 hover:bg-blue-700'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={handleNext}
              className="p-2 rounded-full bg-blue-800 hover:bg-blue-700 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}