// 'use client'

// import { InvestmentBenefitsGrid } from "@/components/roots/investment/bonds/Benefits";
// import BondsHero from "@/components/roots/investment/bonds/BondsHero";
// import { InvestmentCategoriesCarousel } from "@/components/roots/investment/bonds/Categories";
// import { InvestmentCTA } from "@/components/roots/investment/bonds/CTA";
// import { InvestmentFAQ } from "@/components/roots/investment/bonds/FAQ";
// import { GettingStartedSteps } from "@/components/roots/investment/bonds/GettingStarted";
// import { InvestmentProductOverview } from "@/components/roots/investment/bonds/overview";
// import { InvestmentTestimonials } from "@/components/roots/investment/bonds/Testimonials";

// // Changed from named export to default export
// export default function FullInvestmentPage({
//   color = "blue-600",
//   gradientColors = "from-blue-900 to-blue-900"
// }) {
//   return (
//     <div>
//       {/* Add hero section here if needed */}
//       <BondsHero/>
//       <InvestmentProductOverview color={color} />
      
//       <InvestmentCategoriesCarousel color={color} />
      
//       <InvestmentBenefitsGrid color={color} />
      
//       <GettingStartedSteps color={color} />
      
//       <InvestmentTestimonials color={color} />
      
//       <InvestmentFAQ color={color} />
      
//       <InvestmentCTA color={color} />
    
//     </div>
//   );
// }




'use client'

import { InvestmentBenefitsGrid } from "@/components/roots/investment/bonds/Benefits";
import BondsHero from "@/components/roots/investment/bonds/BondsHero";
import { InvestmentCategoriesCarousel } from "@/components/roots/investment/bonds/Categories";
import { InvestmentCTA } from "@/components/roots/investment/bonds/CTA";
import { InvestmentFAQ } from "@/components/roots/investment/bonds/FAQ";
import { GettingStartedSteps } from "@/components/roots/investment/bonds/GettingStarted";
import { InvestmentProductOverview } from "@/components/roots/investment/bonds/overview";
import { InvestmentTestimonials } from "@/components/roots/investment/bonds/Testimonials";

// No props here!
export default function FullInvestmentPage() {
  return (
    <div>
      <BondsHero />
      <InvestmentProductOverview color="blue-600" />
      
      <InvestmentCategoriesCarousel color="blue-600" />
      
      <InvestmentBenefitsGrid color="blue-600" />
      
      <GettingStartedSteps color="blue-600" />
      
      <InvestmentTestimonials color="blue-600" />
      
      <InvestmentFAQ color="blue-600" />
      
      <InvestmentCTA color="blue-600" />
    </div>
  );
}