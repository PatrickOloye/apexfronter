// components/SavingsBenefits.jsx
import React from 'react';
import Image from 'next/image';

const SavingsBenefits = ({
  sectionTitle = " Fueling Your Path to Financial Freedom",
  sectionDescription = "Apex Bank's savings solutions do more than safeguard funds—they empower you to achieve your financial goals.",
  benefits = [
    {
      title: "Secure Your Future",
      description: "Establish a reliable safety net to shield yourself and your loved ones from life’s unexpected challenges."
    },
    {
      title: "Achieve Life Goals",
      description: "Whether you're saving for a new home, higher education, or retirement, we provide the tools to help you reach every financial milestone."
    },
    {
      title: "Confidence & Peace of Mind",
      description: "Rest easy knowing your money is safeguarded with top-tier, industry-standard security protocols."
    },
    {
      title: "Grow Your Wealth",
      description: "Benefit from competitive interest rates and low fees designed to maximize your savings and accelerate your financial growth."
    }
  
  ],
  ctaTitle = "Ready to Start Your Savings Journey?",
  ctaDescription = "Join thousands of satisfied customers who have trusted Apex Bank with their financial goals.",
  ctaButtonText = "Open an Account",
  ctaButtonLink = "#",
  // imageSrc = "/images/savings-benefits.jpg"
}) => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Top Section with Title and Description */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{sectionTitle}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{sectionDescription}</p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 mb-16">
          {/* Benefits List */}
          <div className="lg:w-1/2">
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-blue-800 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section - Using the reference layover style */}
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl" style={{ height: '500px' }}>
                  <div className="absolute inset-0 bg-blue-900 bg-opacity-20">
              <Image 
                src='/landing-page/credit.jpg'
                alt="Savings benefits"
                fill
                style={{ objectFit: 'cover' }}
              />
              </div>
            </div>
            
            {/* Text overlay on image */}
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-gradient-to-b from-blue-100 to-white p-6 m-4 rounded shadow-lg">
              <h4 className="text-lg font-bold text-blue-600 mb-2 ">Trusted by Customers</h4>
              <p className="text-gray-600 font-sans">
                Opening a savings account with Apex Bank was the first step in achieving my financial goals.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-md">
          <div className="md:w-2/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{ctaTitle}</h3>
            <p className="text-gray-600">{ctaDescription}</p>
          </div>
          <div>
            <a 
              href={ctaButtonLink}
              className="inline-block px-8 py-4 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition duration-300"
            >
              {ctaButtonText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsBenefits;