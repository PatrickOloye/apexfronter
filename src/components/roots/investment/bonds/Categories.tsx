import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Info, Shield, TrendingUp, DollarSign, BarChart2 } from 'lucide-react';
// This component displays different investment options in a carousel format
export const InvestmentCategoriesCarousel = ({
    title = "Types of Investments Available",
    description = "Explore our diverse selection of fixed-income securities",
    categories = [
      {
        title: "Government Bonds",
        description: "Safe investments backed by government guarantees with regular interest payments.",
        icon: <Shield className="h-10 w-10" />,
        imageSrc: "/images/government-bonds.jpg",
        link: "#government-bonds"
      },
      {
        title: "Corporate Bonds",
        description: "Higher yield investments issued by companies with varying risk profiles.",
        icon: <TrendingUp className="h-10 w-10" />,
        imageSrc: "/images/corporate-bonds.jpg",
      },
      {
        title: "Municipal Bonds",
        description: "Tax-free investments that finance local infrastructure projects.",
        icon: <DollarSign className="h-10 w-10" />,
        imageSrc: "/images/municipal-bonds.jpg",
        link: "#municipal-bonds"
      },
      {
        title: "Agency Bonds",
        description: "Bonds issued by government-sponsored enterprises with strong backing.",
        icon: <BarChart2 className="h-10 w-10" />,
        imageSrc: "/images/agency-bonds.jpg",
        link: "#agency-bonds"
      },
      {
        title: "International Bonds",
        description: "Global investment opportunities for portfolio diversification.",
        icon: <TrendingUp className="h-10 w-10" />,
        imageSrc: "/images/international-bonds.jpg",
        link: "#international-bonds"
      }
    ],
    color = "blue-600"
  }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(3);
    
    // Update visible items based on screen size
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 640) {
          setVisibleItems(1);
        } else if (window.innerWidth < 1024) {
          setVisibleItems(2);
        } else {
          setVisibleItems(3);
        }
      };
      
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const next = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex + visibleItems >= categories.length 
          ? 0 
          : prevIndex + 1
      );
    };
    
    const prev = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex <= 0 
          ? Math.max(0, categories.length - visibleItems) 
          : prevIndex - 1
      );
    };
    
    return (
      <section className={`py-16 bg-gradient-to-r from-blue-900 to-blue-900 text-white`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">{description}</p>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
              >
                {categories.map((category, index) => (
                  <div 
                    key={index} 
                    className={`px-4 flex-shrink-0`}
                    style={{ width: `${100 / visibleItems}%` }}
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden text-gray-800 h-full flex flex-col">
                      <div className="relative h-48">
                        <Image 
                          src={category.imageSrc} 
                          alt={category.title}
                          layout="fill"
                          objectFit="cover"
                        />
                        <div className={`absolute bottom-0 left-0 p-4 bg-${color} text-white rounded-tr-xl`}>
                          {category.icon}
                        </div>
                      </div>
                      <div className="p-6 flex-grow">
                        <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                        <p className="text-gray-600 mb-4">{category.description}</p>
                        <a 
                          href={category.link} 
                          className={`mt-auto inline-flex items-center font-medium text-${color} hover:underline`}
                        >
                          Learn more <ArrowRight className="ml-1 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={prev} 
              className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg text-gray-800 hover:bg-gray-100 z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button 
              onClick={next} 
              className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg text-gray-800 hover:bg-gray-100 z-10"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: Math.ceil(categories.length / visibleItems) }).map((_, index) => (
              <button
                key={index}
                className={`h-2 w-8 rounded-full ${
                  Math.floor(currentIndex / visibleItems) === index ? 'bg-white' : 'bg-blue-300'
                }`}
                onClick={() => setCurrentIndex(index * visibleItems)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };
  