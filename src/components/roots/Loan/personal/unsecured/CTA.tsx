
// 8. CALL-TO-ACTION COMPONENT
// This component encourages users to apply for a loan

import Image from 'next/image';

interface CallToActionProps {
    backgroundImage?: string;
    primaryColor?: string;
    secondaryColor?: string;
  }
  
  export const CallToAction: React.FC<CallToActionProps> = ({
    backgroundImage = "/images/finance-bg.jpg",
    primaryColor = "blue-600",
    secondaryColor = "blue-900"
  }) => {
    return (
      <div className="relative overflow-hidden rounded-xl shadow-2xl">
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Finance background"
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-center"
          />
          <div className={`absolute inset-0 bg-gradient-to-r from-${secondaryColor} to-${primaryColor} opacity-90`}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto py-12 px-8 sm:px-6 lg:px-8 lg:py-16">
          <div className="md:ml-auto md:w-1/2 md:pl-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to take control of your finances?
            </h2>
            <p className="mt-3 text-lg text-white opacity-90">
              Apply for an unsecured personal loan today and get the funds you need without putting your assets at risk.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-${secondaryColor} bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white`}
              >
                Apply Now
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                Calculate Your Rate
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };
  