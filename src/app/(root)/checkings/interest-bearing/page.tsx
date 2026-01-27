'use client';
import React from 'react';
import { Briefcase, CreditCard, PiggyBank, Bell, Laptop, ShieldCheck, Percent, Banknote, Coins, HandCoins } from 'lucide-react';
import AccountHero from '@/components/roots/savings/checking/Hero4';
import CheckingAccountSummary from '@/components/roots/savings/checking/SummaryCHecking';
import FeatureList from '@/components/roots/savings/checking/FeaturesList';
import BenefitsComparison from '@/components/roots/savings/checking/BenefitsComparism';
import EligibilitySection from '@/components/roots/savings/checking/EligibilitySection';
import FAQSection from '@/components/roots/savings/checking/FAQSection';
import CTASection from '@/components/roots/savings/checking/CTA';
import AccountOverview from '@/components/roots/savings/checking/AccountOverview';

const InterestCheckingPage: React.FC = () => {
    const heroData = {
        accountType: "Interest-Bearing",
        description: "Earn while you spend with our checking account that combines daily convenience with competitive interest earnings.",
        interestRate: [1.25, 1.75] // Range of possible rates
    };

    const features = [
        {
            id: 1,
            title: "Interest Earnings",
            description: "Your balance earns competitive interest rates, helping your money grow while remaining accessible",
            icon: <div className="bg-blue-600 rounded-full p-2 mr-4"><Percent className="h-5 w-5 text-white" /></div>
        },
        {
            id: 2,
            title: "Premium Debit Card",
            description: "Includes a metal debit card with contactless technology and enhanced security features",
            icon: <div className="bg-blue-600 rounded-full p-2 mr-4"><CreditCard className="h-5 w-5 text-white" /></div>
        },
        {
            id: 3,
            title: "Digital Banking Suite",
            description: "Full-featured mobile app with mobile check deposit, bill pay, and real-time notifications",
            icon: <div className="bg-blue-600 rounded-full p-2 mr-4"><Laptop className="h-5 w-5 text-white" /></div>
        },
        {
            id: 4,
            title: "Tiered Interest Rates",
            description: "Higher balances qualify for better interest rates, maximizing your earning potential",
            icon: <div className="bg-blue-600 rounded-full p-2 mr-4"><Coins className="h-5 w-5 text-white" /></div>
        },
        {
            id: 5,
            title: "Overdraft Solutions",
            description: "Multiple protection options including transfers from savings and discretionary overdraft coverage",
            icon: <div className="bg-blue-600 rounded-full p-2 mr-4"><ShieldCheck className="h-5 w-5 text-white" /></div>
        },
        {
            id: 6,
            title: "Balance Alerts",
            description: "Customizable notifications help you maintain required balances and track interest earnings",
            icon: <div className="bg-blue-600 rounded-full p-2 mr-4"><Bell className="h-5 w-5 text-white" /></div>
        }
    ];

    const accountTypes = [
        {
            id: 'interest',
            name: 'Interest Checking',
            description: 'Earn interest with higher balance requirements',
            monthlyFee: '$15 (waivable)',
            minBalance: '$2,500',
            features: {
                interestEarning: true,
                debitCard: true,
                mobileBanking: true,
                overdraftProtection: true,
                atmFeeRefunds: true,
                freeChecks: true,
            },
            recommended: true,
        },
        {
            id: 'standard',
            name: 'Standard Checking',
            description: 'Basic account with no interest',
            monthlyFee: '$10 (waivable)',
            minBalance: '$500',
            features: {
                interestEarning: false,
                debitCard: true,
                mobileBanking: true,
                overdraftProtection: true,
                atmFeeRefunds: false,
                freeChecks: false,
            },
            recommended: false,
        },
        {
            id: 'premium',
            name: 'Premium Checking',
            description: 'Highest interest rates with exclusive benefits',
            monthlyFee: '$25 (waivable)',
            minBalance: '$10,000',
            features: {
                interestEarning: true,
                debitCard: true,
                mobileBanking: true,
                overdraftProtection: true,
                atmFeeRefunds: true,
                freeChecks: true,
            },
            recommended: false,
        }
    ];

    const featureLabels = {
        interestEarning: 'Interest Earning',
        debitCard: 'Premium Debit Card',
        mobileBanking: 'Mobile Banking',
        overdraftProtection: 'Overdraft Protection',
        atmFeeRefunds: 'ATM Fee Refunds',
        freeChecks: 'Free Checks'
    };

    const eligibilityItems = [
        {
            id: 1,
            text: 'Minimum opening deposit of $1,000',
            required: true,
        },
        {
            id: 2,
            text: 'Maintain $2,500 minimum daily balance',
            required: true,
        },
        {
            id: 3,
            text: 'Government-issued photo ID',
            required: true,
        },
        {
            id: 4,
            text: 'Social Security or Tax ID number',
            required: true,
        },
        {
            id: 5,
            text: 'Existing Apex Finance account',
            required: false,
        }
    ];

    const faqs = [
        {
            id: 1,
            question: 'How often is interest paid on this account?',
            answer: 'Interest is compounded daily and credited to your account monthly, based on your average daily balance.'
        },
        {
            id: 2,
            question: 'What happens if my balance falls below $2,500?',
            answer: 'If your balance drops below $2,500 at any time during the statement cycle, you will incur the $15 monthly service fee.'
        },
        {
            id: 3,
            question: 'Can I link this to my savings account?',
            answer: 'Yes, you can link up to 3 accounts for overdraft protection and easy transfers between accounts.'
        },
        {
            id: 4,
            question: 'Are there transaction limits on this account?',
            answer: 'No, unlike savings accounts, this checking account has no federal transaction limits.'
        },
        {
            id: 5,
            question: 'Do I need to maintain a direct deposit?',
            answer: 'While not required, setting up direct deposit is one way to help maintain your minimum balance requirement.'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <AccountHero {...heroData} />
            
            <AccountOverview
          title="Standard Checking Account"
          description="An Interest-Bearing Checking Account at Apex Finance is the cornerstone of modern banking, designed to meet the everyday financial needs of individuals and businesses. With essential features like unlimited transactions, debit card access, and online banking, it's the perfect solution for managing your daily finances with ease."
          ctaText="Open An Account"
          ctaLink="/apply/checking/standard"
          theme="dark"
        />
            
            <FeatureList
                title="Account Features"
                subtitle="Everything you need for smart banking"
                features={features}
                columns={3}
                theme="dark"
            />
            
            <BenefitsComparison
                title="Compare Account Options"
                subtitle="Find the perfect checking solution for your needs"
                accountTypes={accountTypes}
                featureLabels={featureLabels}
                theme="light"
            />


              
                <FeatureList
                title="Account Features"
                subtitle="Everything you need for smart banking"
                features={features}
                columns={3}
                theme="dark"
            />
            
            
            <EligibilitySection
                title="Eligibility Requirements"
                description="To qualify for our Interest-Bearing Checking Account"
                items={eligibilityItems}
                image1="/landing-page/altpro.jpg"
                image2="/landing-page/altbiz.jpg"
                theme="blue"
            />
            
            <FAQSection
                title="Frequently Asked Questions"
                faqs={faqs}
                theme="dark"
            />
            
            <CTASection
                title="Start Earning On Your Checking Balance"
                description="Open your Interest-Bearing Checking Account today and put your money to work while keeping it accessible."
                primaryButtonText="Apply Now"
                secondaryButtonText="Schedule Consultation"
                theme="blue"
            />
        </div>
    );
};

export default InterestCheckingPage;