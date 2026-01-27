// FULL PAGE IMPLEMENTATION USING ALL COMPONENTS
// pages/investment/retirement-plans.jsx
import React, { Suspense } from 'react';
// import PlanOverviewCard from '../../../../components/roots/Retirement/EmployeeSponsored/OverviewCard';
import PlanOverviewCard from '../../../../components/roots/Retirement/EmployeeSponsored/Overview';
import PlanComparisonTable from '../../../../components/roots/Retirement/EmployeeSponsored/Comparism';
import StrategyCardCarousel from '../../../../components/roots/Retirement/EmployeeSponsored/STrategyCarousel';
import StatsBenefitsGrid from '../../../../components/roots/Retirement/EmployeeSponsored/Benefits';
import FaqAccordion from '../../../../components/roots/Retirement/EmployeeSponsored/FAQ';
// import SecuredLoanHero from '@/components/roots/Loan/personal/Hero';
import EmployHero from '@/components/roots/Retirement/EmployeeSponsored/Hero';

function RetirementPlansContent() {
  // Sample data for overview cards
  const retirementPlans = [
    {
      title: "401(k) Plans",
      description: "America's most popular retirement tool, offering tax advantages and employer matches.",
      icon: "/icons/401k-icon.svg", // Replace with actual icon path
      features: [
        "Pre-tax contributions lower your taxable income",
        "Many employers match a portion of your contributions",
        "Tax-deferred growth until withdrawal"
      ],
      ctaText: "Explore 401(k) Options",
      ctaLink: "/investment/401k"
    },
    {
      title: "Superannuation",
      description: "Australia's mandatory retirement system building financial freedom for everyone.",
      icon: "/icons/super-icon.svg", // Replace with actual icon path
      bgColor: "bg-gradient-to-r from-blue-900 to-blue-900",
      features: [
        "Mandatory employer contributions of 11%",
        "Additional voluntary contributions allowed",
        "Various investment options from conservative to high-growth"
      ],
      ctaText: "Learn About Super",
      ctaLink: "/investment/superannuation"
    },
    {
      title: "Global Pension Plans",
      description: "Various retirement options adapted to local laws and economic conditions worldwide.",
      icon: "/icons/global-pension-icon.svg", // Replace with actual icon path
      bgColor: "bg-blue-600",
      features: [
        "Defined benefit plans with guaranteed payouts",
        "Defined contribution plans with investment flexibility",
        "Tax advantages vary by country"
      ],
      ctaText: "Discover Global Options",
      ctaLink: "/investment/global-pensions"
    }
  ];

  // Data for comparison table
  const comparisonData = [
    {
      name: "401(k) – U.S.",
      features: {
        "Contributor": "Employee & Employer",
        "Tax Treatment": "Pre-tax contributions, tax-deferred growth",
        "Contribution Limits": "$23,000 (under 50), $30,500 (50+)",
        "Access Age": "59½",
        "Investment Control": "High (many plan options)",
        "Portability": "Yes, via rollover"
      }
    },
    {
      name: "Superannuation – Australia",
      features: {
        "Contributor": "Employer (mandatory), Employee (optional)",
        "Tax Treatment": "Taxed at 15% on contributions and earnings",
        "Contribution Limits": "$27,500 concessional, $110,000 non-concessional",
        "Access Age": "Between 57–60",
        "Investment Control": "Moderate to high (varies by fund)",
        "Portability": "Yes, consolidate multiple funds"
      }
    },
    {
      name: "Global Pension Plans",
      features: {
        "Contributor": "Varies by country",
        "Tax Treatment": "Varies by plan type",
        "Contribution Limits": "Varies by country",
        "Access Age": "Varies by country",
        "Investment Control": "Varies by plan design",
        "Portability": "Varies by country"
      }
    }
  ];

  // Data for strategy carousel
  const strategyData = [
    {
      title: "Take Full Advantage of Employer Matches",
      description: "Contributing enough to get the full employer match is essentially receiving free money for your retirement.",
      imageUrl: "/images/employer-match.jpg", // Replace with actual image path
      colorClass: "bg-blue-600"
    },
    {
      title: "Increase Contributions Gradually",
      description: "Set up automatic increases whenever you receive a raise or bonus to boost your retirement savings.",
      imageUrl: "/images/gradual-increase.jpg", // Replace with actual image path
      colorClass: "bg-gradient-to-r from-blue-900 to-blue-900"
    },
    {
      title: "Review Investment Options Annually",
      description: "Ensure your portfolio aligns with your current goals and risk tolerance with regular reviews.",
      imageUrl: "/images/portfolio-review.jpg", // Replace with actual image path
      colorClass: "bg-blue-600"
    },
    {
      title: "Avoid Early Withdrawals",
      description: "Early withdrawals mean losing out on growth and potentially paying taxes and penalties.",
      imageUrl: "/images/avoid-withdrawals.jpg", // Replace with actual image path
      colorClass: "bg-gradient-to-r from-blue-900 to-blue-900"
    },
    {
      title: "Consolidate Old Accounts",
      description: "Roll over old retirement accounts into a single account to simplify management and improve oversight.",
      imageUrl: "/images/account-consolidation.jpg", // Replace with actual image path
      colorClass: "bg-blue-600"
    }
  ];

  // Data for benefits grid
  const benefitsData = [
    {
      icon: "/icons/lock-icon.svg", // Replace with actual icon path
      title: "Stay in Control",
      description: "Track your retirement accounts in real-time with full transparency and secure access."
    },
    {
      icon: "/icons/chart-icon.svg", // Replace with actual icon path
      title: "Optimize Performance",
      description: "Use our analytics dashboard to see how your investments are performing with suggestions for improvement."
    },
    {
      icon: "/icons/bulb-icon.svg", // Replace with actual icon path
      title: "Make Smarter Decisions",
      description: "Receive personalized insights based on your age, risk profile, and retirement goals."
    },
    {
      icon: "/icons/refresh-icon.svg", // Replace with actual icon path
      title: "Roll Over Old Accounts",
      description: "Easily roll over previous employer-sponsored accounts into a single, consolidated view."
    },
    {
      icon: "/icons/globe-icon.svg", // Replace with actual icon path
      title: "Go Global",
      description: "Manage retirement assets across borders with confidence, knowing your data is protected."
    },
    {
      icon: "/icons/brain-icon.svg", // Replace with actual icon path
      title: "Learn as You Grow",
      description: "Our in-app educational resources keep you informed and empowered to make better financial decisions."
    }
  ];

  // Data for FAQ section
  const faqData = [
    {
      question: "Can I contribute to both a 401(k) and an IRA?",
      answer: "Yes. However, your ability to deduct Traditional IRA contributions may be limited if you participate in a workplace plan."
    },
    {
      question: "What happens to my Super if I move overseas?",
      answer: "You can keep your Super in Australia or transfer it to a qualifying overseas account, depending on your destination country."
    },
    {
      question: "Do I pay taxes on my 401(k) or Super withdrawals?",
      answer: "Yes, unless you have a Roth component. Withdrawals from pre-tax accounts are taxed as ordinary income."
    },
    {
      question: "Can I invest in stocks or crypto through my employer plan?",
      answer: "Most plans offer mutual funds and ETFs, though some allow direct stock purchases. Crypto is rare but emerging."
    },
    {
      question: "What happens if I change jobs?",
      answer: "You can roll over your account into your new employer's plan or an IRA (or another Super fund in Australia)."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section would go here - you mentioned you already have one */}
      <EmployHero/>
      
      {/* Introduction Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Plan Your Future with Confidence</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding Employer-Sponsored Retirement Plans with Apex Finance
          </p>
        </div>
      </section>
      
      {/* Plan Overview Cards */}
      <section className="py-12 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Retirement Plan Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {retirementPlans.map((plan, index) => (
              <PlanOverviewCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Comparison Table */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Compare Retirement Plans</h2>
          <PlanComparisonTable plans={comparisonData} />
        </div>
      </section>
      
      {/* Strategy Carousel */}
      <section className="py-12 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Maximizing the Value of Your Plan</h2>
          <StrategyCardCarousel strategies={strategyData} />
        </div>
      </section>
      
      {/* Benefits Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <StatsBenefitsGrid 
            title="Why Use Apex Finance"
            description="Managing your retirement savings shouldn't feel overwhelming. Here's how we help:"
            benefits={benefitsData}
            bgColorClass="bg-gray-50"
          />
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-12 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <FaqAccordion 
            title="Frequently Asked Questions" 
            faqs={faqData} 
          />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-900 to-blue-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Retirement?</h2>
          <p className="mb-8 text-white/90">
            Download the Apex Finance App now and start managing your retirement plan from anywhere, anytime.
          </p>
          <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition duration-200">
            Download Apex Finance App
          </button>
        </div>
      </section>
      
      {/* Disclaimer */}
      <section className="py-8 px-4 bg-gray-200 text-gray-700 text-center text-sm">
        <div className="max-w-5xl mx-auto">
          <p>
            Disclaimer: Investing involves risk, including the possible loss of principal. Employer-sponsored retirement plans are governed by specific laws and regulations. Consult a qualified financial advisor or tax professional for advice tailored to your situation.
          </p>
        </div>
      </section>
    </div>
  );
}

export default function RetirementPlansPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RetirementPlansContent />
    </Suspense>
  );
}