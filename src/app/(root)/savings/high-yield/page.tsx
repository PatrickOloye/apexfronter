import React from 'react';
import AccountHero1 from '@/components/roots/savings/Basic-savings.tsx/ui/Hero';
import FeatureGrid from '@/components/roots/savings/Basic-savings.tsx/ui/Features';
import DetailedExplanation from '@/components/roots/savings/Basic-savings.tsx/ui/DetailedExplanation';
import AccountDetailsSection from '@/components/roots/savings/Basic-savings.tsx/ui/AccountDetailsSection';
import ComparisonTable from '@/components/roots/savings/Basic-savings.tsx/ui/ComparismTable';
import FAQSection from '@/components/roots/savings/Basic-savings.tsx/ui/CallToAction';
import AccountTypesSection from '@/components/roots/landing-page/ui/AccountTypeSection';

const HighYieldSavingsAccount: React.FC = () => {
    const heroData = {
        accountType: "High-Yield",
        description: "Maximize your savings potential with our premium account offering top-tier interest rates for disciplined savers.",
        interestRate: [3.5, 4.2, 4.8] // Varying rates to showcase
    };

    const features = [
        {
            icon: "📈",
            title: "Premium Interest Rates",
            description: "Earn substantially higher returns compared to standard savings options"
        },
        {
            icon: "⚖️",
            title: "Balance Incentives",
            description: "Higher balances qualify for progressively better rates"
        },
        {
            icon: "🔐",
            title: "Enhanced Security",
            description: "Multi-layered protection for your growing assets"
        },
        {
            icon: "🌐",
            title: "Global Access",
            description: "Manage your account from anywhere with our digital platform"
        },
        {
            icon: "🔄",
            title: "Automated Savings",
            description: "Schedule recurring transfers to build wealth effortlessly"
        },
        {
            icon: "📊",
            title: "Financial Tools",
            description: "Access advanced planning resources and calculators"
        }
    ];

    const explanation = {
        title: "Optimizing Your High-Yield Savings Strategy",
        paragraphs: [
            "Our High-Yield Savings Account is engineered for financial growth, offering returns that significantly outpace conventional savings products. This specialized account rewards customers who maintain substantial balances with progressively higher interest tiers.",
            "Interest accrues daily and compounds monthly, allowing your money to grow at an accelerated rate. While designed for longer-term holdings, you maintain full access to your funds when needed, subject to regulatory transaction limits.",
            "Ideal for financial milestones like home purchases, educational funding, or retirement preparation, this account serves as a cornerstone for wealth accumulation. Digital tools provide real-time growth projections and balance alerts.",
            "We recommend this solution for established professionals, families planning major expenses, or anyone seeking to optimize their liquid assets without market risk."
        ],
        images: [
            "/landing-page/high-yield-account.jpg",
            "/landing-page/mobile-banking.jpg"
        ]
    };

    const comparisons = [
        {
            feature: "Minimum Balance",
            currentAccount: "$5,000",
            basic: "$0",
            premium: "$10,000"
        },
        {
            feature: "Interest Rate Range",
            currentAccount: "3.5%-4.8%",
            basic: "0.5%",
            premium: "4.0%-5.2%"
        },
        {
            feature: "Monthly Transactions",
            currentAccount: "6 (Reg D limit)",
            basic: "Unlimited",
            premium: "6 (Reg D limit)"
        },
        {
            feature: "Account Benefits",
            currentAccount: "Priority customer service",
            basic: "Standard features",
            premium: "Dedicated financial advisor"
        }
    ];

    const accountTypes = [
        {
          title: "Joint Savings",
          description: "Flexible access to your funds with competitive interest rates for everyday financial needs.",
          cta: "Learn More"
        },
        {
          title: "High-Yield Savings",
          description: "Maximize your returns with our premium savings option offering higher interest rates.",
          cta: "Discover Benefits"
        },
        {
          title: "youth Savings",
          description: "Help children develop healthy financial habits early with accounts designed for young savers.",
          cta: "Start Early"
        },
        {
          title: "Basic Savings",
          description: "Help children develop healthy financial habits early with accounts designed for young savers.",
          cta: "Start Early"
        },
        {
          title: "Senior Savings",
          description: "Maximize your returns with our premium savings option offering higher interest rates.",
          cta: "Discover Benefits"
        },
        {
          title: "Education Savings",
          description: "Help children develop healthy financial habits early with accounts designed for young savers.",
          cta: "Start Early"
        },
       
      ];

    const faqs = [
        {
            question: "How are the tiered interest rates determined?",
            answer: "Rates increase at balance thresholds ($5k, $25k, $50k) with our highest tier offering maximum returns."
        },
        {
            question: "Can I link this to my existing checking account?",
            answer: "Yes, seamless integration allows for easy transfers between accounts while maintaining separate balances."
        },
        {
            question: "What happens if my balance falls below the minimum?",
            answer: "The account remains open but earns the base interest rate until the minimum is restored."
        }
    ];

    return (
        <div className="high-yield-savings-page">
            <AccountHero1 {...heroData} />
            
            <FeatureGrid features={features} />
            
            <DetailedExplanation 
                title={explanation.title}
                paragraphs={explanation.paragraphs}
                images={[
                    "/landing-page/altpro.jpg",
                    "/landing-page/altbiz.jpg"
                ]}
            />
            
            <AccountDetailsSection 
                eligibility={[
                    'Minimum opening deposit of $1,000',
                    'Must maintain $5,000 for premium rates',
                    'Available to individual and joint applicants'
                ]}
                benefits={[
                    'Tiered interest structure rewards larger balances',
                    'No penalty for balance fluctuations',
                    'Includes all digital banking features'
                ]}
                usageTips={[
                    'Use for targeted savings goals',
                    'Monitor balance tiers for optimal earnings',
                    'Combine with automatic deposit plans'
                ]}
            />
            
            <ComparisonTable
                accountType="High-Yield Savings"
                comparisons={comparisons}
            />
            <AccountTypesSection  accountTypes={accountTypes}/>
            <FAQSection faqs={faqs} />
        </div>
    );
};

export default HighYieldSavingsAccount;