// components/SavingsFeatures.jsx
import React from 'react';
import Image from 'next/image';

const SavingsFeatures = ({ 
  sectionTitle = "What Sets Apex Bank Apart",
  sectionDescription = "Our commitment to customer satisfaction and financial inclusion with tailored solutions for your unique journey.",
  features = [
    {
      title: "Competitive Rates",
      description: "Enjoy attractive interest rates that help your money grow faster over time."
    },
    {
      title: "Flexible Options",
      description: "From regular savings to high-yield accounts, find the perfect match for your goals."
    },
    {
      title: "Digital Access",
      description: "Manage your savings easily with our robust online and mobile banking platforms."
    }
  ],
  imageSrc = "landing-page/altbix.jpg",
  imageAlt = "Apex Bank customer service"
}) => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Top Section with Title and Description */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{sectionTitle}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{sectionDescription}</p>
        </div>
        
        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Section */}
          <div className="lg:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-xl" style={{ height: '500px' }}>
              <Image 
                src='/landing-page/altbiz.jpg'
                alt={imageAlt}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          
          {/* Features List */}
          <div className="lg:w-1/2">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="relative pl-12">
                  <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsFeatures;