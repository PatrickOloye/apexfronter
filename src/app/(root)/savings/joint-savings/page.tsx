import React from 'react';
import AccountHero1 from '@/components/roots/savings/Basic-savings.tsx/ui/Hero2';
import FeatureGrid from '@/components/roots/savings/Basic-savings.tsx/ui/Features';
import DetailedExplanation from '@/components/roots/savings/Basic-savings.tsx/ui/DetailedExplanation';
import AccountDetailsSection from '@/components/roots/savings/Basic-savings.tsx/ui/AccountDetailsSection';
import ComparisonTable from '@/components/roots/savings/Basic-savings.tsx/ui/ComparismTable';
import FAQSection from '@/components/roots/savings/Basic-savings.tsx/ui/CallToAction';
import AccountTypesSection from '@/components/roots/landing-page/ui/AccountTypeSection';

const JointSavingsAccount: React.FC = () => {
    const heroData = {
        accountType: "Joint",
        description: "A shared financial solution for couples, families, and partners to manage savings collectively with equal access and control.",
        interestRate: [2.1, 2.5] // Array for rotating rates
    };

    const features = [
        {
            icon: "👥",
            title: "Multiple Account Holders",
            description: "Up to four individuals can share ownership with equal access rights"
        },
        {
            icon: "💳",
            title: "Dual Debit Cards",
            description: "Each primary holder receives their own payment card"
        },
        {
            icon: "📊",
            title: "Shared Dashboard",
            description: "Real-time transaction visibility for all account members"
        },
        {
            icon: "⚙️",
            title: "Customizable Controls",
            description: "Set individual spending limits or approval requirements"
        },
        {
            icon: "🔄",
            title: "Seamless Transfers",
            description: "Instant money movement between account holders"
        },
        {
            icon: "🛡️",
            title: "Enhanced Protection",
            description: "Joint fraud monitoring and account security alerts"
        }
    ];

    const explanation = {
        title: "How Joint Savings Works",
        paragraphs: [
            "A joint savings arrangement provides a centralized financial hub where multiple individuals can contribute to and manage shared funds. This cooperative approach simplifies collective financial objectives while maintaining individual accountability.",
            "All authorized users can conduct transactions independently, though many institutions offer configurable authorization protocols. Some accounts may require dual signatures for significant withdrawals or provide tiered access levels for different account members.",
            "The account supports various transactional methods including digital transfers, card payments, and traditional banking services. Monthly statements detail all account activity, ensuring complete transparency among participants.",
            "Ideal for domestic partnerships, family financial management, or collaborative ventures, this account type eliminates the need for constant fund transfers between individual accounts while promoting financial harmony."
        ],
        images: [
            "/landing-page/joint-account.jpg",
            "/landing-page/mobile-banking.jpg"
        ]
    };

    const comparisons = [
        {
            feature: "Account Holders",
            currentAccount: "Up to 4",
            basic: "1",
            premium: "2"
        },
        {
            feature: "Access Permissions",
            currentAccount: "Customizable",
            basic: "Single user",
            premium: "Equal access"
        },
        {
            feature: "Overdraft Option",
            currentAccount: "Available",
            basic: "Not available",
            premium: "Available"
        },
        {
            feature: "Relationship Proof",
            currentAccount: "Optional",
            basic: "Not required",
            premium: "Required"
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
            question: "Can non-relatives open a joint account?",
            answer: "Absolutely. Any consenting adults can establish a joint savings relationship, regardless of familial connections."
        },
        {
            question: "What happens if one holder passes away?",
            answer: "Surviving members typically retain full account access, with the deceased's share transferring according to local laws or account agreements."
        },
        {
            question: "Are all holders equally liable for debts?",
            answer: "Yes, all participants share equal responsibility for any account overdrafts or associated fees."
        },
        {
            question: "Can I remove someone from the account?",
            answer: "This requires closing the existing account and opening a new one with revised membership, unless all parties consent to changes."
        }
    ];

    return (
        <main>
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
                    'Minimum two adult applicants',
                    'Valid government-issued identification',
                    'Proof of address for all parties',
                    'Tax identification documentation'
                ]}
                benefits={[
                    'Simplified household money management',
                    'Combined savings earn higher interest tiers',
                    'Streamlined bill payments from pooled funds',
                    'Reduced transfer fees between holders'
                ]}
                usageTips={[
                    'Establish clear usage guidelines with co-holders',
                    'Utilize account alerts for all transactions',
                    'Schedule regular financial reviews together',
                    'Designate specific savings purposes for clarity'
                ]}
            />
            
            <ComparisonTable 
                accountType="Joint Savings"
                comparisons={comparisons}
            />
            <AccountTypesSection  accountTypes={accountTypes}/>
            <FAQSection faqs={faqs} />
        </main>
    );
};

export default JointSavingsAccount;