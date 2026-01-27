// 'use client';

// import { NextPage } from 'next';
// import Head from 'next/head';
// import InvestmentFeature from '../../../../components/roots/investment/FeatureHighlight';
// import InvestmentTypesCarousel from '../../../../components/roots/investment/StuchmarketCarousel';
// import AccountBenefitsGrid from '../../../../components/roots/investment/Benefits';
// import HowItWorksSection from '../../../../components/roots/investment/HowItWords';
// import TestimonialsSection from '../../../../components/roots/investment/Testimonial';
// import CTASection from '../../../../components/roots/investment/CTA';
// import InvestHero from '@/components/roots/investment/InvestHero';

// const InvestmentPage: NextPage = () => {
//   // You could dynamically set color theme based on user preferences or route parameters
//   const colorTheme = "blue-600";
  
//   return (
//     <>
//     <InvestHero/>
//       {/* <Head>
//         <title>Investment Accounts | Apex Finance</title>
//         <meta name="description" content="Discover Apex Finance's innovative investment checking accounts that integrate seamlessly with global stock markets." />
//       </Head> */}
      
//       {/* Hero Section would go here - you mentioned you already have one */}
//       <main>
//         {/* Investment Features Section */}
//         <InvestmentFeature />
        
//         {/* How It Works Section */}
//         <HowItWorksSection colorScheme={colorTheme} />
        
//         {/* Investment Types Carousel */}
//         <InvestmentTypesCarousel colorTheme={colorTheme} />
        
//         {/* Account Benefits Grid */}
//         <AccountBenefitsGrid colorTheme={colorTheme} />
        
//         {/* Testimonials Section */}
//         <TestimonialsSection colorTheme={colorTheme} />
        
//         {/* Call to Action Section */}
//         <CTASection colorTheme={colorTheme} />
//       </main>
      
//       <footer className="bg-gray-900 text-white py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <p className="text-sm">
//               &copy; {new Date().getFullYear()} Apex Finance. All rights reserved.
//             </p>
//             <p className="text-sm mt-2 text-gray-400">
//               Investment products are not FDIC insured, may lose value, and are not bank guaranteed. 
//               Apex Finance is a registered trademark. Banking services provided by Apex Bank, Member FDIC.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default InvestmentPage;



'use client';

import Head from 'next/head';
import InvestmentFeature from '../../../../components/roots/investment/FeatureHighlight';
import InvestmentTypesCarousel from '../../../../components/roots/investment/StuchmarketCarousel';
import AccountBenefitsGrid from '../../../../components/roots/investment/Benefits';
import HowItWorksSection from '../../../../components/roots/investment/HowItWords';
import TestimonialsSection from '../../../../components/roots/investment/Testimonial';
import CTASection from '../../../../components/roots/investment/CTA';
import InvestHero from '@/components/roots/investment/InvestHero';

export default function InvestmentPage() {
  return (
    <>
      <Head>
        <title>Investment Accounts | Apex Finance</title>
        <meta name="description" content="Discover Apex Finance's innovative investment checking accounts that integrate seamlessly with global stock markets." />
      </Head>

      <InvestHero />

      <main>
        {/* Investment Features Section */}
        <InvestmentFeature />
        
        {/* How It Works Section */}
        <HowItWorksSection colorScheme="blue-600" />
        
        {/* Investment Types Carousel */}
        <InvestmentTypesCarousel colorTheme="blue-600" />
        
        {/* Account Benefits Grid */}
        <AccountBenefitsGrid colorTheme="blue-600" />
        
        {/* Testimonials Section */}
        <TestimonialsSection colorTheme="blue-600" />
        
        {/* Call to Action Section */}
        <CTASection colorTheme="blue-600" />
      </main>
      
      {/* <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Apex Finance. All rights reserved.
            </p>
            <p className="text-sm mt-2 text-gray-400">
              Investment products are not FDIC insured, may lose value, and are not bank guaranteed. 
              Apex Finance is a registered trademark. Banking services provided by Apex Bank, Member FDIC.
            </p>
          </div>
        </div>
      </footer> */}
    </>
  );
}