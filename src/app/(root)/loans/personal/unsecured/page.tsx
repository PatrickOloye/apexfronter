// 'use client';

// import { LoanBenefitsCarousel } from "@/components/roots/Loan/personal/unsecured/Benefits";
// import { LoanEligibilityCalculator } from "@/components/roots/Loan/personal/unsecured/Calculator";
// import { LoanTypeComparison } from "@/components/roots/Loan/personal/unsecured/Conparism";
// import { CallToAction } from "@/components/roots/Loan/personal/unsecured/CTA";
// import { FAQAccordion } from "@/components/roots/Loan/personal/unsecured/FAQ";
// import { LoanOverviewCard } from "@/components/roots/Loan/personal/unsecured/OverviewCard";
// import { LoanApplicationSteps } from "@/components/roots/Loan/personal/unsecured/Steps";
// import { Testimonials } from "@/components/roots/Loan/personal/unsecured/Testimonials";
// import HeroSection from "@/components/roots/Loan/personal/unsecured/UnHero";
// import { LoanUseCases } from "@/components/roots/Loan/personal/unsecured/Usecases";


// interface InvestmentPageProps {
//     primaryColor?: string;
//     secondaryColor?: string;
//     backgroundColor?: string;
//   }
  
//   export const InvestmentPage: React.FC<InvestmentPageProps> = ({
//     primaryColor = "blue-600",
//     secondaryColor = "blue-900",
//     backgroundColor = "bg-gray-50"
//   }) => {
//     return (
//       <>
     
//             <HeroSection/>
         
//               <LoanOverviewCard 
//                 backgroundColor={`bg-gradient-to-r from-${secondaryColor} to-${primaryColor}`}
//               />
        
        
//               <LoanUseCases 
//                 accentColor={primaryColor}
//                 backgroundColor={backgroundColor}
//               />
           
            
          
//               <LoanTypeComparison accentColor={primaryColor} />
     
         
//               <LoanBenefitsCarousel 
//                 accentColor={primaryColor}
//                 backgroundColor={backgroundColor}
//               />
  
            
          
//               <LoanEligibilityCalculator 
//                 primaryColor={primaryColor}
//                 secondaryColor={secondaryColor}
//               />
       
            

//               <Testimonials 
//                 accentColor={primaryColor}
//                 backgroundColor={backgroundColor}
//               />

            
         
//               <LoanApplicationSteps 
//                 accentColor={primaryColor}
//                 backgroundColor="bg-white"
//               />
      
            
       
//               <FAQAccordion 
//                 accentColor={primaryColor}
//                 backgroundColor="bg-white"
//               />

//               <CallToAction 
//                 primaryColor={primaryColor}
//                 secondaryColor={secondaryColor}
//               />

     
//       </>
//     );
//   };


//   export default InvestmentPage;



'use client';

import { LoanBenefitsCarousel } from "@/components/roots/Loan/personal/unsecured/Benefits";
import { LoanEligibilityCalculator } from "@/components/roots/Loan/personal/unsecured/Calculator";
import { LoanTypeComparison } from "@/components/roots/Loan/personal/unsecured/Conparism";
import { CallToAction } from "@/components/roots/Loan/personal/unsecured/CTA";
import { FAQAccordion } from "@/components/roots/Loan/personal/unsecured/FAQ";
import { LoanOverviewCard } from "@/components/roots/Loan/personal/unsecured/OverviewCard";
import { LoanApplicationSteps } from "@/components/roots/Loan/personal/unsecured/Steps";
import { Testimonials } from "@/components/roots/Loan/personal/unsecured/Testimonials";
import HeroSection from "@/components/roots/Loan/personal/unsecured/UnHero";
import { LoanUseCases } from "@/components/roots/Loan/personal/unsecured/Usecases";

// No props in the default export!
export default function UnsecuredLoanPage() {
  return (
    <>
      <HeroSection />
      <LoanOverviewCard backgroundColor="bg-gradient-to-r from-blue-900 to-blue-600" />
      <LoanUseCases accentColor="blue-600" backgroundColor="bg-gray-50" />
      <LoanTypeComparison accentColor="blue-600" />
      <LoanBenefitsCarousel accentColor="blue-600" backgroundColor="bg-gray-50" />
      <LoanEligibilityCalculator primaryColor="blue-600" secondaryColor="blue-900" />
      <Testimonials accentColor="blue-600" backgroundColor="bg-gray-50" />
      <LoanApplicationSteps accentColor="blue-600" backgroundColor="bg-white" />
      <FAQAccordion accentColor="blue-600" backgroundColor="bg-white" />
      <CallToAction primaryColor="blue-600" secondaryColor="blue-900" />
    </>
  );
}