'use client';
import { BenefitsCards } from '@/components/roots/Retirement/IRA/Benefits';
import { InvestmentCalculator } from '@/components/roots/Retirement/IRA/Calculator';
import { ComparisonTable } from '@/components/roots/Retirement/IRA/Comparism';
import { FaqAccordion } from '@/components/roots/Retirement/IRA/FAQ';
import { AccountFeatures } from '@/components/roots/Retirement/IRA/Features';
import { ProcessSteps } from '@/components/roots/Retirement/IRA/HowToStart';
import HeroSection from '@/components/roots/Retirement/IRA/RetireHero';
import { TestimonialsCarousel } from '@/components/roots/Retirement/IRA/Testimonials';
import { 
    ChartBarIcon, 
    ShieldCheckIcon, 
    CurrencyDollarIcon, 
    ClockIcon, 
    ChartPieIcon,
    PuzzlePieceIcon
  } from '@heroicons/react/24/outline';
import { Suspense } from 'react';
  
  const IRAContent = () => {
    // Content for IRA page
    const accountTypes = [
      {
        name: "Traditional IRA",
        description: "Perfect for those who want to enjoy tax benefits now and pay taxes later.",
        details: "Contributions may be tax-deductible, allowing your investments to grow tax-deferred until retirement."
      },
      {
        name: "Roth IRA",
        description: "Ideal if you expect to be in a higher tax bracket during retirement.",
        details: "Pay taxes now on your contributions, then enjoy tax-free growth and withdrawals in retirement."
      }
    ];
  
    // Feature icons with styling
    const featureIcon = (Icon: React.ElementType) => (
      <Icon className="h-8 w-8" />
    );
  
    // Features for the IRA page
    const iraFeatures = [
      {
        icon: featureIcon(ChartBarIcon),
        title: "Tax-Advantaged Growth",
        description: "Grow your wealth with powerful tax advantages that help you reach your retirement goals faster."
      },
      {
        icon: featureIcon(ShieldCheckIcon),
        title: "Protected Investments",
        description: "FDIC insured accounts and diversified investment options to protect and grow your retirement savings."
      },
      {
        icon: featureIcon(CurrencyDollarIcon),
        title: "Flexible Contributions",
        description: "Contribute on your schedule with options for one-time or automatic recurring contributions."
      },
      {
        icon: featureIcon(ClockIcon),
        title: "Long-Term Planning",
        description: "Strategic tools and professional guidance to help you plan for a secure and comfortable retirement."
      },
      {
        icon: featureIcon(ChartPieIcon),
        title: "Diversified Portfolio",
        description: "Access to a wide range of investment options from stocks and bonds to ETFs and mutual funds."
      },
      {
        icon: featureIcon(PuzzlePieceIcon),
        title: "Personalized Strategy",
        description: "Customized investment strategies based on your goals, risk tolerance, and timeline."
      }
    ];
  
    // Comparison table data
    const comparisonItems = [
      {
        feature: "Tax Treatment of Contributions",
        optionA: "May be tax-deductible",
        optionB: "Not tax-deductible"
      },
      {
        feature: "Tax on Withdrawals",
        optionA: "Taxed as ordinary income",
        optionB: "Tax-free if qualified"
      },
      {
        feature: "Income Limits for Contributions",
        optionA: "No income limits",
        optionB: "Yes, phased out at higher incomes"
      },
      {
        feature: "Required Minimum Distributions",
        optionA: "Required starting at age 73",
        optionB: "None"
      },
      {
        feature: "Early Withdrawal Penalties",
        optionA: "10% penalty + income taxes",
        optionB: "Penalty applies only to earnings"
      }
    ];
  
    // Benefits with icons
    const benefitIcon = (Icon: React.ElementType) => (
      <Icon className="h-6 w-6" />
    );
  
    const benefits = [
      {
        icon: benefitIcon(ShieldCheckIcon),
        title: "Tax Advantages",
        description: "Enjoy significant tax benefits that help your money grow faster than traditional investment accounts."
      },
      {
        icon: benefitIcon(ChartBarIcon),
        title: "Compound Growth",
        description: "Harness the power of compound interest to build substantial wealth over time."
      },
      {
        icon: benefitIcon(CurrencyDollarIcon),
        title: "Flexible Contributions",
        description: "Contribute what you can, when you can, with options for automatic deposits."
      },
      {
        icon: benefitIcon(PuzzlePieceIcon),
        title: "Diverse Investment Options",
        description: "Choose from a wide range of investment vehicles to create a well-balanced portfolio."
      }
    ];
  
    // Process steps
    const processSteps = [
      {
        number: 1,
        title: "Download the Apex Finance App",
        description: "Get started by downloading our app on iOS or Android, your gateway to smarter investing."
      },
      {
        number: 2,
        title: "Create Your Profile",
        description: "Answer a few questions about your financial goals and risk tolerance to help us personalize your experience."
      },
      {
        number: 3,
        title: "Choose Your IRA Type",
        description: "Decide whether a Traditional or Roth IRA suits your needs based on your tax situation and retirement goals."
      },
      {
        number: 4,
        title: "Fund Your Account",
        description: "Transfer money from your bank or set up automatic contributions to start building your retirement savings."
      },
      {
        number: 5,
        title: "Select Your Investments",
        description: "Use our intelligent recommendation engine or choose your own mix of stocks, ETFs, and funds."
      }
    ];
  
    // Testimonials
    const testimonials = [
      {
        quote: "Opening an IRA with Apex Finance was the best financial decision I've made. The interface is intuitive and their investment options are outstanding.",
        name: "Sarah Johnson",
        title: "Software Engineer, age 32"
      },
      {
        quote: "I was intimidated by retirement planning until I found Apex Finance. Their educational tools helped me understand exactly what I needed to do.",
        name: "Michael Chen",
        title: "Small Business Owner, age 45"
      },
      {
        quote: "The calculator tools helped me visualize my retirement goals. Now I'm on track to retire comfortably at 60 instead of 67!",
        name: "Taylor Rodriguez",
        title: "Marketing Director, age 38"
      }
    ];
  
    // FAQs
    const faqs = [
      {
        question: "Can I contribute to both a Traditional and Roth IRA?",
        answer: "Yes, you can contribute to both a Traditional and Roth IRA in the same year, but your total contributions cannot exceed the annual limit set by the IRS ($7,000 for individuals under age 50 as of 2024)."
      },
      {
        question: "What happens to my IRA when I die?",
        answer: "You can name beneficiaries who will inherit your IRA. They may be subject to distribution rules depending on the type of IRA and their relationship to you. With Apex Finance, you can easily update your beneficiaries at any time."
      },
      {
        question: "Can I lose money in an IRA?",
        answer: "Yes, because IRAs are invested in market-based products like stocks, bonds, and funds, there is always some risk involved. However, diversification and long-term investment strategies can help mitigate losses."
      },
      {
        question: "Do I need a financial advisor to manage my IRA?",
        answer: "Not necessarily. Apex Finance offers self-directed options as well as robo-advisory services to suit every investor's comfort level. However, for complex situations, we do offer access to certified financial planners."
      },
      {
        question: "Can I use my IRA to buy a house?",
        answer: "Yes, first-time homebuyers can withdraw up to $10,000 from a Traditional IRA without the 10% penalty (though taxes will apply). Roth IRA contributors can withdraw contributions (but not earnings) tax- and penalty-free at any time."
      }
    ];
  
    return (
      <>
        {/* Note: Hero section would go here, but you mentioned you already have one */}
        <HeroSection/>
        
        {/* Account Features Section */}
        <AccountFeatures
          heading="Individual Retirement Accounts"
          subheading="Secure your future with tax-advantaged retirement accounts designed to help you build wealth over time."
          features={iraFeatures}
          colorTheme="blue"
        />
        
        {/* Comparison Table */}
        <ComparisonTable
          title="Traditional vs. Roth IRA: Which is Right for You?"
          description="Understanding the key differences between these account types will help you make the best choice for your retirement strategy."
          optionAName="Traditional IRA"
          optionBName="Roth IRA"
          items={comparisonItems}
          colorTheme="blue"
        />
        
        {/* Investment Calculator */}
        <InvestmentCalculator
          title="IRA Investment Calculator"
          description="See how your retirement savings could grow over time with consistent contributions and compound growth."
          colorTheme="blue"
          calculatorType="retirement"
        />
        
        {/* Benefits with Image */}
        <BenefitsCards
          heading="Why Choose an IRA with Apex Finance?"
          subheading="Our retirement accounts offer unique advantages to help you build and preserve wealth for your future."
          benefits={benefits}
          imagePath="/landing-page/credit.jpg"
          imageAlt="Retirement planning with digital tools"
          colorTheme="blue"
          imagePosition="right"
        />
        
        {/* Process Steps */}
        <ProcessSteps
          heading="How to Get Started"
          subheading="Setting up your IRA is quick and easy with our streamlined process."
          steps={processSteps}
          ctaText="Open Your IRA Today"
          ctaLink="/apply/ira"
          colorTheme="blue"
        />
        
        {/* Testimonials */}
        <TestimonialsCarousel
          heading="What Our Customers Say"
          subheading="Join thousands of clients who are already building their retirement wealth with us."
          testimonials={testimonials}
          colorTheme="blue"
        />
        
        {/* FAQ Section */}
        <FaqAccordion
          heading="Frequently Asked Questions"
          subheading="Find answers to common questions about Individual Retirement Accounts."
          faqs={faqs}
          colorTheme="blue"
        />
      </>
    );

  };



  export default function IRAPage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <IRAContent />
      </Suspense>
    );
  }