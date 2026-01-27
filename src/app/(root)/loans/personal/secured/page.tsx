'use client';
import React from 'react';

import SecuredLoanHero from '../../../../../components/roots/Loan/personal/secured/Hero';
import FeatureCardsGrid, { FeatureCardProps } from '../../../../../components/roots/Loan/personal/secured/Features'
import ComparisonTable, { ComparisonItem } from '../../../../../components/roots/Loan/personal/secured/Comparism';
import ProcessSteps, { StepItem } from '../../../../../components/roots/Loan/personal/secured/Process';
import CollateralCarousel, { CollateralItem } from '../../../../../components/roots/Loan/personal/secured/Collateral';
import FaqExpander, { FaqItem } from '../../../../../components/roots/Loan/personal/secured/FAQ';

// Define page data
// In a real application, this would likely come from an API or CMS
const pageData = {
  hero: {
    title: "Secured Personal Loans with Apex Finance",
    description: "Access the funds you need with flexible terms using your assets as collateral",
    imageUrl: "/images/investments/secured-loans-hero.jpg",
    ctaText: "Apply Now"
  },
  
  keyFeatures: {
    title: "Key Benefits of Secured Personal Loans",
    subtitle: "Discover why secured loans are a smart financial tool for your borrowing needs",
    features: [
      {
        title: "Lower Interest Rates",
        description: "Enjoy significantly reduced interest rates compared to unsecured options, saving you money over the loan term.",
        icon: "/icons/percentage.svg",
        iconAlt: "Lower interest rates"
      },
      {
        title: "Higher Borrowing Limits",
        description: "Access larger loan amounts based on the value of your collateral, perfect for major expenses.",
        icon: "/icons/chart-up.svg",
        iconAlt: "Higher limits"
      },
      {
        title: "Flexible Repayment Terms",
        description: "Choose from repayment options ranging from 1 to 10 years to fit your financial situation.",
        icon: "/icons/calendar.svg",
        iconAlt: "Flexible terms"
      },
      {
        title: "Build Your Credit Score",
        description: "Regular on-time payments help improve your credit profile, opening doors to better rates in the future.",
        icon: "/icons/chart-line.svg",
        iconAlt: "Credit score"
      },
      {
        title: "Quick Approval Process",
        description: "Get funds in your account within 24 hours with our streamlined application and approval system.",
        icon: "/icons/clock.svg",
        iconAlt: "Fast approval"
      },
      {
        title: "Multiple Collateral Options",
        description: "Use vehicles, home equity, savings accounts, or other assets as security for your loan.",
        icon: "/icons/shield.svg",
        iconAlt: "Collateral options"
      }
    ] as FeatureCardProps[]
  },
  
  comparisonTable: {
    title: "Secured vs. Unsecured Personal Loans",
    description: "Understand how secured loans compare to unsecured options to make the best choice for your financial needs",
    primaryLabel: "Secured Personal Loan",
    secondaryLabel: "Unsecured Personal Loan",
    items: [
      {
        feature: "Collateral Required",
        primary: { value: "Yes" },
        secondary: { value: "No" }
      },
      {
        feature: "Interest Rate",
        primary: { value: "Lower", highlight: true },
        secondary: { value: "Higher" }
      },
      {
        feature: "Loan Amount",
        primary: { value: "Larger (based on collateral)", highlight: true },
        secondary: { value: "Smaller" }
      },
      {
        feature: "Credit Requirements",
        primary: { value: "More flexible", highlight: true },
        secondary: { value: "Typically stricter" }
      },
      {
        feature: "Risk to Borrower",
        primary: { value: "Risk of losing collateral" },
        secondary: { value: "No asset risk", highlight: true }
      },
      {
        feature: "Approval Speed",
        primary: { value: "Fast (with clear title)" },
        secondary: { value: "Fast (credit dependent)" }
      },
      {
        feature: "Typical APR Range",
        primary: { value: "3% - 12%", highlight: true },
        secondary: { value: "9% - 36%" }
      }
    ] as ComparisonItem[]
  },
  
  loanProcess: {
    title: "How Secured Personal Loans Work",
    subtitle: "Your step-by-step guide to obtaining a secured personal loan with Apex Finance",
    steps: [
      {
        title: "Identify Your Collateral",
        description: "Select which asset you'll use to secure your loan. Common options include vehicles, home equity, savings, or investment accounts.",
        image: "/images/investments/collateral-options.jpg"
      },
      {
        title: "Apply Online",
        description: "Complete our simple application process through the Apex Finance app or web portal. You'll need to provide basic personal information, collateral details, and proof of income.",
        image: "/images/investments/online-application.jpg"
      },
      {
        title: "Collateral Verification",
        description: "Our team will verify the ownership and value of your collateral. This typically takes just a few hours for most assets.",
        image: "/images/investments/verification-process.jpg"
      },
      {
        title: "Loan Approval",
        description: "Once verified, you'll receive your loan offer with terms tailored to your situation. Review and accept the terms that work for you.",
        image: "/images/investments/loan-approval.jpg"
      },
      {
        title: "Receive Funds",
        description: "After approval, funds are deposited directly into your bank account, typically within one business day.",
        image: "/images/investments/funds-transfer.jpg"
      }
    ] as StepItem[]
  },
  
  collateralOptions: {
    title: "Types of Collateral We Accept",
    subtitle: "Explore the various assets you can use to secure your personal loan with Apex Finance",
    items: [
      {
        title: "Vehicle Title Loans",
        description: "Use your car, motorcycle, or boat as collateral to secure favorable loan terms. Vehicle loans are perfect for borrowers who need quick access to cash.",
        image: "/images/investments/vehicle-collateral.jpg",
        features: [
          "No need to give up use of your vehicle",
          "Value based on current market assessment",
          "Quick approval for newer vehicles",
          "Competitive rates compared to dealership financing"
        ],
        cta: {
          text: "Calculate Vehicle Loan",
          href: "/investments/calculator?type=vehicle"
        }
      },
      {
        title: "Savings-Secured Loans",
        description: "Leverage your savings account or certificate of deposit (CD) to access funds while continuing to earn interest on your savings.",
        image: "/images/investments/savings-collateral.jpg",
        features: [
          "Borrow up to 95% of your savings balance",
          "Continue earning interest on your deposits",
          "Lowest interest rates among secured loans",
          "Excellent for credit building or rebuilding"
        ],
        cta: {
          text: "Apply for Savings-Secured Loan",
          href: "/investments/calculator?type=savings"
        }
      },
      {
        title: "Home Equity Loans",
        description: "Tap into the equity you've built in your home with a fixed-rate loan that provides a lump sum payment and predictable monthly payments.",
        image: "/images/investments/home-equity-collateral.jpg",
        features: [
          "Access up to 80% of your home's equity",
          "Potential tax benefits (consult your tax advisor)",
          "Longer repayment terms available (up to 30 years)",
          "Ideal for major expenses like renovations"
        ],
        cta: {
          text: "Check Home Equity Options",
          href: "/investments/calculator?type=home-equity"
        }
      },
      {
        title: "Investment Account Loans",
        description: "Use your brokerage or investment account as collateral while keeping your investments in the market to potentially continue growing.",
        image: "/images/investments/investment-collateral.jpg",
        features: [
          "Borrow against stocks, bonds, or mutual funds",
          "No need to sell investments and trigger tax events",
          "Flexible credit line options available",
          "Competitive rates based on portfolio composition"
        ],
        cta: {
          text: "Learn About Investment Loans",
          href: "/investments/calculator?type=investment"
        }
      }
    ] as CollateralItem[]
  },
  
  faqs: {
    title: "Frequently Asked Questions",
    subtitle: "Get answers to common questions about secured personal loans with Apex Finance",
    faqs: [
      {
        question: "Can I get a secured personal loan with bad credit?",
        answer: "Yes. Because secured loans are backed by collateral, lenders are typically more willing to approve applications from borrowers with less-than-perfect credit histories. At Apex Finance, we focus more on your ability to repay and the value of your collateral than your credit score alone."
      },
      {
        question: "Will my collateral be held during the loan term?",
        answer: "No, you continue to use your asset normally while repaying the loan, provided you make timely payments. The lender simply places a lien on the collateral until the loan is fully repaid."
      },
      {
        question: "Can I pay off a secured loan early?",
        answer: "Yes, at Apex Finance we allow early repayments with no prepayment penalties. Paying off your loan ahead of schedule can save you money on interest and release the lien on your collateral sooner."
      },
      {
        question: "What happens if I stop making payments?",
        answer: "If you default on the loan, the lender has the legal right to seize the collateral and sell it to recover the outstanding balance. This is why it's important to only borrow what you can comfortably repay."
      },
      {
        question: "Can I use a shared asset as collateral?",
        answer: "Generally, you must be the sole owner or have explicit permission from co-owners to use an asset as collateral. Clear title is essential for loan approval."
      },
      {
        question: "How much can I borrow with a secured personal loan?",
        answer: "Loan amounts typically range from 70% to 90% of the collateral's value, depending on the type of asset. For example, vehicle loans might be limited to 80% of the car's current market value."
      }
    ] as FaqItem[]
  }
};

const SecuredPersonalLoansPage = () => {
  return (
    <>
  
      

        {/* Hero Section */}
        <SecuredLoanHero />
        
        
        {/* Key Features */}
        <FeatureCardsGrid 
          title={pageData.keyFeatures.title}
          subtitle={pageData.keyFeatures.subtitle}
          features={pageData.keyFeatures.features}
          columns={3}
          bgColor="bg-white"
          textColor="text-gray-900"
        />
        
        {/* Comparison Table */}
        <ComparisonTable 
          title={pageData.comparisonTable.title}
          description={pageData.comparisonTable.description}
          primaryLabel={pageData.comparisonTable.primaryLabel}
          secondaryLabel={pageData.comparisonTable.secondaryLabel}
          items={pageData.comparisonTable.items}
          primaryColor="blue-600"
          secondaryColor="gray-500"
          bgColor="bg-gray-50"
        />
        
        {/* Loan Process Steps */}
        <ProcessSteps 
          title={pageData.loanProcess.title}
          subtitle={pageData.loanProcess.subtitle}
          steps={pageData.loanProcess.steps}
          primaryColor="blue-600"
          bgColor="bg-white"
          alternateLayout={true}
        />
        
        {/* Collateral Options Carousel */}
        <CollateralCarousel 
          title={pageData.collateralOptions.title}
          subtitle={pageData.collateralOptions.subtitle}
          items={pageData.collateralOptions.items}
          primaryColor="blue-600"
          bgColor="bg-gradient-to-r from-blue-900 to-blue-900"
          textColor="text-black"
        />
        
        {/* FAQs */}
        <FaqExpander 
          title={pageData.faqs.title}
          subtitle={pageData.faqs.subtitle}
          faqs={pageData.faqs.faqs}
          primaryColor="blue-600"
          bgColor="bg-white"
          containerStyle="cards"
          columns={2}
        />
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-900 py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Apply for a Secured Personal Loan?</h2>
            <p className="text-white/90 mb-8">Download the Apex Finance App today and start the secured loan process in minutes.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/download/ios" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Download for iOS
              </a>
              <a 
                href="/download/android" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium border border-white/20 hover:bg-blue-700 transition-colors"
              >
                Download for Android
              </a>
            </div>
          </div>
        </div>

    </>
  );
};



export default SecuredPersonalLoansPage;