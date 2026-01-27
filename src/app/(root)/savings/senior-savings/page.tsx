import React from 'react';
import AccountHero1 from '@/components/roots/savings/Basic-savings.tsx/ui/Hero2';
import FeatureGrid from '@/components/roots/savings/Basic-savings.tsx/ui/Features';
import DetailedExplanation from '@/components/roots/savings/Basic-savings.tsx/ui/DetailedExplanation';
import AccountDetailsSection from '@/components/roots/savings/Basic-savings.tsx/ui/AccountDetailsSection';
import ComparisonTable from '@/components/roots/savings/Basic-savings.tsx/ui/ComparismTable';
import FAQSection from '@/components/roots/savings/Basic-savings.tsx/ui/CallToAction';
import AccountTypesSection from '@/components/roots/landing-page/ui/AccountTypeSection';

const SeniorSavingsAccount: React.FC = () => {
    const heroData = {
        accountType: "Senior",
        description: "Tailored financial solutions for retirees offering premium interest rates and exclusive benefits for account holders aged 60+",
        interestRate: [3.8, 4.2, 4.5] // Tiered rates for seniors
    };

    const features = [
        {
            icon: "👴",
            title: "Enhanced Interest Rates",
            description: "Earn higher returns on your savings compared to standard accounts"
        },
        {
            icon: "🏛️",
            title: "Priority Banking",
            description: "Dedicated service counters and personalized assistance"
        },
        {
            icon: "💳",
            title: "Fee-Free Banking",
            description: "No monthly maintenance charges or minimum balance fees"
        },
        {
            icon: "🏥",
            title: "Health Benefits",
            description: "Access to exclusive health check-ups and insurance discounts"
        },
        {
            icon: "📱",
            title: "Easy Access",
            description: "Simplified digital banking designed for senior users"
        },
        {
            icon: "🛡️",
            title: "Financial Security",
            description: "Government-insured deposits up to regulatory limits"
        }
    ];

    const explanation = {
        title: "Retirement Banking Designed for You",
        paragraphs: [
            "Our Senior Savings Account provides financial stability during retirement years with features specifically created for older adults. The account structure recognizes the unique needs of retirees who depend on steady income from their savings.",
            "With interest rates significantly above standard savings products, your retirement funds continue growing while remaining easily accessible. Our tiered rate structure rewards larger balances with progressively better returns.",
            "Special senior-friendly services include larger print statements, telephone banking with extended hours, and in-branch assistants trained to help with retirement finance questions. We've removed complex features that retirees rarely need.",
            "This account works particularly well when paired with pension direct deposit. Many customers use it as their primary account for retirement income while maintaining other accounts for specific purposes."
        ],
        images: [
            "/landing-page/senior-banking.jpg",
            "/landing-page/retirement-planning.jpg"
        ] as [string, string]
    };

    const comparisons = [
        {
            feature: "Minimum Age",
            currentAccount: "60 years",
            basic: "18 years",
            premium: "18 years"
        },
        {
            feature: "Interest Rate",
            currentAccount: "3.8%-4.5%",
            basic: "1.2%",
            premium: "2.5%"
        },
        {
            feature: "Monthly Fees",
            currentAccount: "$0",
            basic: "$5 (waivable)",
            premium: "$10 (waivable)"
        },
        {
            feature: "Special Features",
            currentAccount: "Priority service, health benefits",
            basic: "Standard features",
            premium: "Higher withdrawal limits"
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
            question: "What documents do I need to open a Senior Savings Account?",
            answer: "You'll need government-issued ID, proof of age, and address verification. Pension documentation is helpful but not required."
        },
        {
            question: "Can I add a joint account holder who's under 60?",
            answer: "Yes, immediate family members can be joint holders regardless of age, though primary account holder must qualify."
        },
        {
            question: "How often is interest paid on these accounts?",
            answer: "Interest compounds monthly and is credited quarterly, with options to transfer to another account."
        },
        {
            question: "Are there special services for homebound seniors?",
            answer: "Yes, we offer telephone banking, mobile check deposit, and in some areas, scheduled banker visits."
        }
    ];

    return (
        <div className="senior-savings-page">
            <AccountHero1 {...heroData} />
            
            <FeatureGrid features={features} />
            
            <DetailedExplanation 
                title={explanation.title}
                paragraphs={explanation.paragraphs}
                images={explanation.images}
            />
            
            <AccountDetailsSection 
                eligibility={[
                    'Must be 60 years or older',
                    'Valid government-issued ID required',
                    'Social Security or pension documentation recommended'
                ]}
                benefits={[
                    'Above-market interest rates for seniors',
                    'No monthly maintenance fees',
                    'Priority customer service access',
                    'Free checks and debit card'
                ]}
                usageTips={[
                    'Set up direct deposit for pension/benefits',
                    'Use automatic transfers for regular expenses',
                    'Schedule annual financial reviews with your banker',
                    'Take advantage of senior discount programs'
                ]}
            />
            
            <ComparisonTable
                accountType="Senior Savings"
                comparisons={comparisons}
            />
            <AccountTypesSection  accountTypes={accountTypes}/>
            <FAQSection faqs={faqs} />
        </div>
    );
};

export default SeniorSavingsAccount;