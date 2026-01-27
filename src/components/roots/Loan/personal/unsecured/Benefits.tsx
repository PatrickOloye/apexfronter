
// 4. LOAN BENEFITS CAROUSEL COMPONENT
// This component showcases the various benefits of unsecured loans

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
  accentColor?: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ 
  icon, 
  title, 
  description,
  accentColor = "blue-600"
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md h-full">
    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${accentColor} bg-opacity-10 mb-4`}>
      <Image src={icon} alt={title} width={24} height={24} className={`text-${accentColor}`} />
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

interface LoanBenefitsCarouselProps {
  accentColor?: string;
  backgroundColor?: string;
}

export const LoanBenefitsCarousel: React.FC<LoanBenefitsCarouselProps> = ({
  accentColor = "blue-600",
  backgroundColor = "bg-gray-50"
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const maxSlides = 3;
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  const benefits = [
    {
      icon: "/icons/shield-check.svg",
      title: "No Risk to Your Assets",
      description: "Borrow with confidence knowing your car, home, and savings are not at risk."
    },
    {
      icon: "/icons/zap.svg",
      title: "Quick Access to Cash",
      description: "Get funds deposited into your account as soon as the next business day."
    },
    {
      icon: "/icons/calendar.svg",
      title: "Predictable Payments",
      description: "Fixed rates and set repayment schedules make budgeting easy and stress-free."
    },
    {
      icon: "/icons/trending-up.svg",
      title: "Build Your Credit Score",
      description: "Make timely payments to improve your creditworthiness over time."
    },
    {
      icon: "/icons/check-circle.svg",
      title: "No Restrictions on Use",
      description: "Use funds for almost any legitimate purpose that fits your financial needs."
    },
    {
      icon: "/icons/settings.svg",
      title: "Customizable Terms",
      description: "Choose from flexible repayment periods that fit your financial situation."
    }
  ];
  
  const startAutoplay = () => {
    autoplayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === maxSlides - 1 ? 0 : prev + 1));
    }, 5000);
  };
  
  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, []);
  
  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    startAutoplay();
  };
  
  return (
    <div className={`${backgroundColor} py-12 px-4 rounded-xl`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Unsecured Personal Loans</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover why an unsecured personal loan might be the perfect financial solution for your needs.
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {[0, 1, 2].map((slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.slice(slideIndex * 2, slideIndex * 2 + (slideIndex === 2 ? 2 : 2)).map((benefit, index) => (
                      <BenefitCard 
                        key={index} 
                        icon={benefit.icon} 
                        title={benefit.title} 
                        description={benefit.description} 
                        accentColor={accentColor}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(maxSlides)].map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  currentSlide === index ? `bg-${accentColor}` : 'bg-gray-300'
                }`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
