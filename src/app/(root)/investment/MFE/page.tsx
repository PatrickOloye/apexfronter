'use client'


import HeroSection from "../../../../components/roots/investment/InvestHero";
import { InvestmentBenefitsGrid } from "../../../../components/roots/investment/bonds/Benefits";
import { InvestmentProductOverview } from "../../../../components/roots/investment/bonds/overview";
import { GettingStartedSteps } from "../../../../components/roots/investment/bonds/GettingStarted";
import { InvestmentFAQ } from "../../../../components/roots/investment/bonds/FAQ";
// import TestimonialCarousel from "../../../../components/roots/investment/StuchmarketCarousel";
import CTASection from "../../../../components/roots/investment/CTA";
import EquityTypeCard from "../../../../components/roots/investment/EquityType";
import { BarChart2, DollarSign, Shield, TrendingUp } from "lucide-react";
import InvestmentTypesCarousel from "../../../../components/roots/investment/StuchmarketCarousel";

export default function MutualFundsAndETFsPage() {
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "I was overwhelmed by investing until I tried Apex. Now I'm earning steady returns with funds that match my goals.",
      author: "Natalie R.",
      role: "Freelance Writer",
      imageUrl: "/images/testimonial1.jpg"
    },
    {
      id: 2,
      quote: "As a busy parent, I needed a way to invest without spending hours researching. Apex made it so easy with smart fund recommendations.",
      author: "Marcus T.",
      role: "Engineer",
      imageUrl: "/images/testimonial2.jpg"
    },
    {
      id: 3,
      quote: "The learning tools helped me understand how funds fit into my long-term plan. I feel much more confident now.",
      author: "Amira K.",
      role: "Small Business Owner",
      imageUrl: "/images/testimonial3.jpg"
    }
  ];

  // Fund types data
  const fundTypes = [
    {
      type: "Index Funds",
      description: "Designed to mirror the performance of a specific market index like the S&P 500 or NASDAQ Composite.",
      examples: ["S&P 500 Index Fund", "Total Stock Market Fund", "NASDAQ-100 ETF"],
      riskLevel: "Medium",
      image: "/images/index-funds.jpg"
    },
    {
      type: "Equity Funds",
      description: "Focused on investing in stocks of companies, often grouped by region, industry, or market capitalization.",
      examples: ["Large-cap Growth Fund", "Technology Sector ETF", "Small-cap Value Fund"],
      riskLevel: "High",
      image: "/images/equity-funds.jpg"
    },
    {
      type: "Bond Funds",
      description: "Focus on fixed-income securities, offering steady income streams with lower volatility.",
      examples: ["Corporate Bond Fund", "Treasury ETF", "Municipal Bond Fund"],
      riskLevel: "Low",
      image: "/images/bond-funds.jpg"
    },
    {
      type: "International Funds",
      description: "Offer exposure to markets outside the U.S., allowing for geographic diversification.",
      examples: ["Emerging Markets ETF", "European Equity Fund", "Global Dividend Fund"],
      riskLevel: "Medium",
      image: "/images/international-funds.jpg"
    },
    {
      type: "Sector Funds",
      description: "Target specific industries or trends such as renewable energy, fintech, or artificial intelligence.",
      examples: ["Clean Energy ETF", "Healthcare Innovation Fund", "AI & Robotics Fund"],
      riskLevel: "High",
      image: "/images/sector-funds.jpg"
    },
    {
      type: "ESG Funds",
      description: "Invest in companies that meet environmental, social, and governance (ESG) criteria.",
      examples: ["Sustainable Growth Fund", "Green Bond ETF", "Social Impact Fund"],
      riskLevel: "Medium",
      image: "/images/esg-funds.jpg"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Investment Product Overview */}
      <InvestmentProductOverview 
        title="Introducing the Apex Investment Account"
        description="Your gateway to building a well-rounded investment strategy using some of the most trusted financial products available — Mutual Funds and ETFs."
        features={[
          "Instant access to thousands of mutual funds and ETFs",
          "Real-time performance tracking",
          "Professional fund management",
          "Diversification across asset classes",
          "Easy-to-use filters based on risk tolerance and goals",
          "Seamless integration with your Apex Cash Management Account"
        ]}
        imageSrc="/images/mutual-funds-etf.jpg"
        imageAlt="Apex Investment Account for Mutual Funds and ETFs"
      />

      {/* Benefits Grid */}
      <InvestmentBenefitsGrid 
        title="Why Choose Mutual Funds & ETFs?"
        description="These powerful investment vehicles offer advantages that individual stocks and bonds can't match"
        benefits={[
          {
            title: "Instant Diversification",
            description: "Each fund gives you exposure to dozens or hundreds of underlying assets — helping spread risk.",
            icon: <BarChart2 className="h-8 w-8" />
          },
          {
            title: "Professional Management",
            description: "Expert fund managers handle research, selection, and portfolio rebalancing for you.",
            icon: <Shield className="h-8 w-8" />
          },
          {
            title: "Affordable Access",
            description: "Start investing with small amounts. Some funds require as little as $10 to begin.",
            icon: <DollarSign className="h-8 w-8" />
          },
          {
            title: "Flexible Options",
            description: "Choose from actively managed funds or passive index-tracking ETFs.",
            icon: <TrendingUp className="h-8 w-8" />
          },
          {
            title: "Tax Efficiency",
            description: "ETFs in particular offer tax advantages through their unique structure.",
            icon: <DollarSign className="h-8 w-8" />
          },
          {
            title: "No Brokerage Fees",
            description: "Buy and sell most ETFs without paying commissions at Apex Finance.",
            icon: <DollarSign className="h-8 w-8" />
          }
        ]}
      />

      {/* Fund Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">
              Types of Mutual Funds and ETFs Available
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              One of the biggest advantages of investing through Apex Finance is the breadth and depth of choices available to you.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {fundTypes.map((fundType, index) => (
              <EquityTypeCard
                key={index}
                type={fundType.type}
                description={fundType.description}
                examples={fundType.examples}
                riskLevel={fundType.riskLevel as "Low" | "Medium" | "High"}
                image={fundType.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started Steps */}
      <GettingStartedSteps 
        title="How to Start Investing in Mutual Funds and ETFs"
        description="Getting started is easy. Here's how you can begin building your fund-based portfolio today:"
        steps={[
          {
            number: 1,
            title: "Log Into Your Apex Finance Dashboard",
            description: "Once logged in, navigate to the Invest Tab located prominently on your homepage.",
            imageSrc: "/images/dashboard-login.jpg",
          },
          {
            number: 2,
            title: "Explore the Fund Marketplace",
            description: "Use filters to search by fund type, risk level, expense ratio, minimum investment, and performance metrics.",
            imageSrc: "/images/fund-marketplace.jpg",
          },
          {
            number: 3,
            title: "Review Detailed Fund Profiles",
            description: "Each listing includes fund objective, NAV, expense ratio, historical performance, top holdings, and allocation breakdown.",
            imageSrc: "/images/fund-profile.jpg",
          },
          {
            number: 4,
            title: "Purchase or Monitor",
            description: "Click 'Buy Now' to invest using available funds, or add the fund to your watchlist for later review.",
            imageSrc: "/images/purchase-funds.jpg",
          },
          {
            number: 5,
            title: "Track Performance",
            description: "Your dashboard shows total holdings, estimated returns, dividend yield, distribution history, and allocation summary.",
            imageSrc: "/images/track-performance.jpg",
          },
        ]}
      />

      {/* Testimonials */}
      <InvestmentTypesCarousel colorTheme="violet" />

      {/* FAQ Section */}
      <InvestmentFAQ 
        faqs={[
          {
            question: "Do I need a separate account to invest in mutual funds and ETFs?",
            answer: "No. With your Apex Investment Account, you can buy and manage funds alongside your other investments — all from one platform."
          },
          {
            question: "Are there fees for buying or selling funds?",
            answer: "Apex Finance offers no commission fees on most ETFs and select mutual funds. Some specialty funds may incur small transaction fees."
          },
          {
            question: "Can I reinvest my dividends automatically?",
            answer: "Yes! Use the auto-reinvest feature to compound your returns effortlessly."
          },
          {
            question: "Are fund earnings taxable?",
            answer: "Most fund distributions are subject to federal income tax. However, certain accounts (like IRAs) offer tax-deferred or tax-free growth."
          },
          {
            question: "What happens when I sell a fund?",
            answer: "Funds sold during market hours (for ETFs) or by end-of-day (for mutual funds) will settle within two business days, with proceeds available in your Apex Cash Management Account."
          }
        ]}
      />

      {/* Final CTA */}
      <CTASection />
    </div>
  );
}