
import CallToActionSection from '@/components/roots/savings/Basic-savings.tsx/ui/CallToAction';
import FeaturesSection from '@/components/roots/savings/Basic-savings.tsx/ui/Features';
import AccountHero from '@/components/roots/savings/Basic-savings.tsx/ui/Hero';
import DetailedExplanation from '@/components/roots/savings/Basic-savings.tsx/ui/DetailedExplanation';
import React from 'react';
import { AccountHeroProps } from '@/libs/server-actions/types'; // Adjust the import 
import AccountDetailsSection from '@/components/roots/savings/Basic-savings.tsx/ui/AccountDetailsSection';
import FeatureGrid from '@/components/roots/savings/Basic-savings.tsx/ui/Features';
import ComparisonTable from '@/components/roots/savings/Basic-savings.tsx/ui/ComparismTable';
import FAQSection from '@/components/roots/savings/Basic-savings.tsx/ui/CallToAction';
import AccountTypesSection from '@/components/roots/landing-page/ui/AccountTypeSection';



const BasicSavingsAccount: React.FC = () => {

    const heroData = {
        accountType: "Basic",
        description: "Start your savings journey with our no-frills account featuring no minimum balance and easy access to your funds.",
        interestRate: 1.5
    };

    // Data for FeatureGrid
    const features = [
        {
            icon: "💰",
            title: "No Minimum Balance",
            description: "Maintain your account with any amount - perfect for first-time savers"
        },
        {
            icon: "🏦",
            title: "Easy Access",
            description: "Withdraw funds anytime at our nationwide ATM network"
        },
        {
            icon: "📱",
            title: "Mobile Banking",
            description: "Full account management through our award-winning app"
        },
        {
            icon: "🔒",
            title: "FDIC Insured",
            description: "Your deposits protected up to $250,000"
        },
        {
            icon: "💳",
            title: "Free Debit Card",
            description: "Comes with contactless payment technology"
        },
        {
            icon: "👨‍🎓",
            title: "Student Friendly",
            description: "Special benefits for students under 25"
        }
    ];

    // Data for DetailedExplanation
    const explanation = {
        title: "Understanding Your Basic Savings Account",
        paragraphs: [
            "Our Basic Savings Account is designed as an entry point into personal finance management. Unlike more complex accounts, it strips away unnecessary features to focus on what matters most - helping you develop consistent saving habits.",
            "The account earns a modest interest rate that compounds monthly. While the rate may be lower than premium offerings, the absence of fees and minimum balance requirements makes it ideal for those just starting their financial journey or maintaining smaller balances.",
            "You'll enjoy full digital banking capabilities including mobile check deposit, bill pay, and person-to-person transfers. The account can be linked to a checking account for overdraft protection or easy transfers between accounts.",
            "We recommend this account for students, young adults opening their first bank account, or anyone who wants a simple place to park emergency funds without worrying about maintaining high balances."
        ]
    };

    // Data for ComparisonTable
    const comparisons = [
        {
            feature: "Minimum Balance",
            currentAccount: "$0",
            basic: "$0",
            premium: "$1,000"
        },
        {
            feature: "Interest Rate",
            currentAccount: "1.5%",
            basic: "1.5%",
            premium: "4.5%"
        },
        {
            feature: "Monthly Fee",
            currentAccount: "$0",
            basic: "$0",
            premium: "$5 (waived if balance >$5k)"
        },
        {
            feature: "ATM Access",
            currentAccount: "Unlimited",
            basic: "Unlimited",
            premium: "Unlimited + fee reimbursements"
        }
    ];

    // Data for FAQSection
    const faqs = [
        {
            question: "What's the minimum age to open this account?",
            answer: "You must be at least 18 years old, or 13 with a parent/guardian as joint account holder."
        },
        {
            question: "Can I upgrade to a premium account later?",
            answer: "Yes, you can upgrade anytime once your balance reaches $1,000 with no additional paperwork."
        },
        {
            question: "Are there withdrawal limits?",
            answer: "Federal regulations limit certain withdrawals to 6 per month, but ATM and in-branch withdrawals are unlimited."
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
          title: "Joint Savings",
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


    const accountType = 'Basic Savings Account';
    const description = 'A simple savings account designed for everyday customers who want to save money without any restrictions.';
    const eligibility = ['Available to all individuals.', 'No age restrictions.', 'Requires basic identification documents.'];
    const benefits = ['Secure storage for your money.', 'Flexible deposits and withdrawals.', 'Affordable maintenance fees.'];
    const usageTips = ['Set clear savings goals.', 'Automate regular deposits.', 'Monitor your account activity regularly.'];

    return (
        <div>
            <AccountHero {...heroData} />
            {/* <FeaturesSection features={features} /> */}
            <FeatureGrid features={features} />
            <DetailedExplanation title={explanation.title} paragraphs={explanation.paragraphs} images={[
                "/landing-page/altbiz.jpg",
                "/landing-page/altbiz.jpg"
            ]} />
            <AccountDetailsSection eligibility=
                {
                    [
                        'Available to all individuals',
                        'No age restrictions',
                        'Basic ID documents required'
                    ]}
                benefits={[
                    'No minimum balance',
                    'Free online banking',
                    'FDIC insured'
                ]}
                usageTips={[
                    'Set up automatic transfers',
                    'Use for emergency funds',
                    'Link to checking account'
                ]} />
                
                
            <ComparisonTable
                accountType="Basic Savings"
                comparisons={comparisons}
            />
            <AccountTypesSection  accountTypes={accountTypes}/>
            <FAQSection faqs={faqs} />
        </div>
    );
};

export default BasicSavingsAccount;