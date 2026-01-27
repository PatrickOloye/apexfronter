
'use client';
// pages/checking/standard.tsx
import React from 'react';
import { Briefcase, CreditCard, PiggyBank, Bell, Laptop, ShieldCheck } from 'lucide-react';
import AccountOverview from '../../../../components/roots/savings/checking/AccountOverview';
import FeatureList from '@/components/roots/savings/checking/FeaturesList';
import BenefitsComparison from '@/components/roots/savings/checking/BenefitsComparism';
import EligibilitySection from '@/components/roots/savings/checking/EligibilitySection';
import FAQSection from '@/components/roots/savings/checking/FAQSection';
import CTASection from '@/components/roots/savings/checking/CTA';
import AccountHero1 from '@/components/roots/savings/checking/Hero3';
import CheckingAccountSummary from '@/components/roots/savings/checking/SummaryCHecking';

const StandardCheckingPage: React.FC = () => {

    
    const heroData = {
        accountType: "Basic",
        description: "Start your savings journey with our no-frills account featuring no minimum balance and easy access to your funds.",
        interestRate: 1.5
    };
  // Feature list data
  const features = [
    {
      id: 1,
      title: "Deposits & Withdrawals",
      description: "Enjoy unlimited transactions with easy deposits and withdrawals from our extensive ATM network without restrictions.",
      icon: <div className="bg-blue-600 rounded-full p-2 mr-4"><Briefcase className="h-5 w-5 text-white" /></div>
    },
    {
      id: 2,
      title: "Debit Card Access",
      description: "Receive a personalized debit card for instant access to your funds for purchases and cash withdrawals anywhere in the world.",
      icon: <div className="bg-blue-600 rounded-full p-2 mr-4"><CreditCard className="h-5 w-5 text-white" /></div>
    },
    {
      id: 3,
      title: "Online Banking Integration",
      description: "Access your account 24/7 through our secure mobile app and web portal to monitor balances, pay bills, and manage payments.",
      icon: <div className="bg-blue-600 rounded-full p-2 mr-4"><Laptop className="h-5 w-5 text-white" /></div>
    },
    {
      id: 4,
      title: "Flexible Fee Structure",
      description: "Nominal monthly fee that can be easily waived by meeting specific balance requirements or qualifying direct deposit activities.",
      icon: <div className="bg-blue-600 rounded-full p-2 mr-4"><PiggyBank className="h-5 w-5 text-white" /></div>
    },
    {
      id: 5,
      title: "Overdraft Protection",
      description: "Optional protection ensures transactions go through even with insufficient funds, avoiding declined payments and embarrassment.",
      icon: <div className="bg-blue-600 rounded-full p-2 mr-4"><ShieldCheck className="h-5 w-5 text-white" /></div>
    },
    {
      id: 6,
      title: "Customizable Alerts",
      description: "Stay informed with real-time updates on balances, transactions, and upcoming payments through email or push notifications.",
      icon: <div className="bg-blue-600 rounded-full p-2 mr-4"><Bell className="h-5 w-5 text-white" /></div>
    },
  ];

  // Comparison data
  const accountTypes = [
    {
      id: 'standard',
      name: 'Standard Checking',
      description: 'Basic everyday banking with essential features',
      monthlyFee: '$5',
      minBalance: '$100',
      features: {
        onlineBanking: true,
        mobileBanking: true,
        overdraftProtection: true,
        interestEarning: false,
        noForeignTransactionFees: false,
        unlimitedTransactions: true,
      },
      recommended: true,
    },
    {
      id: 'premium',
      name: 'Premium Checking',
      description: 'Enhanced banking with additional benefits',
      monthlyFee: '$12',
      minBalance: '$1,500',
      features: {
        onlineBanking: true,
        mobileBanking: true,
        overdraftProtection: true,
        interestEarning: true,
        noForeignTransactionFees: true,
        unlimitedTransactions: true,
      },
      recommended: false,
    },
    {
      id: 'student',
      name: 'Student Checking',
      description: 'Designed for students with no monthly fee',
      monthlyFee: '$0',
      minBalance: '$0',
      features: {
        onlineBanking: true,
        mobileBanking: true,
        overdraftProtection: true,
        interestEarning: false,
        noForeignTransactionFees: false,
        unlimitedTransactions: true,
      },
      recommended: false,
    }
  ];

  const featureLabels = {
    onlineBanking: 'Online Banking',
    mobileBanking: 'Mobile Banking',
    overdraftProtection: 'Overdraft Protection',
    interestEarning: 'Interest Earning',
    noForeignTransactionFees: 'No Foreign Transaction Fees',
    unlimitedTransactions: 'Unlimited Transactions'
  };

  // Eligibility data
  const eligibilityItems = [
    {
      id: 1,
      text: 'Valid government-issued ID (Passport, Driver\'s License)',
      required: true,
    },
    {
      id: 2,
      text: 'Proof of address (Utility bill, Bank statement)',
      required: true,
    },
    {
      id: 3,
      text: 'Initial deposit of at least $100',
      required: true,
    },
    {
      id: 4,
      text: 'Social Security Number or Tax ID',
      required: true,
    },
    {
      id: 5,
      text: 'Previous banking information',
      required: false,
    }
  ];

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: 'What is the minimum balance requirement?',
      answer: 'The Standard Checking Account requires a minimum balance of $100 to avoid the monthly service fee. Otherwise, there is a $5 monthly maintenance fee.'
    },
    {
      id: 2,
      question: 'How can I waive the monthly fee?',
      answer: 'You can waive the $5 monthly fee by maintaining a minimum daily balance of $100 or setting up a qualifying direct deposit of at least $500 per month.'
    },
    {
      id: 3,
      question: 'Is there a limit to how many transactions I can make?',
      answer: 'No, the Standard Checking Account offers unlimited transactions, including deposits, withdrawals, transfers, and payments.'
    },
    {
      id: 4,
      question: 'Can I earn interest on my Standard Checking Account?',
      answer: 'No, the Standard Checking Account does not earn interest. If you\'re looking for an interest-bearing account, we recommend our Premium Checking or Savings accounts.'
    },
    {
      id: 5,
      question: 'What happens if I overdraw my account?',
      answer: 'If you opt into overdraft protection, we\'ll cover the transaction for a $35 fee per instance. Without overdraft protection, the transaction will be declined. We also offer Overdraft Protection Transfers from a linked savings account for a smaller fee.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section would go here - you mentioned you already have one */}
      <AccountHero1  {...heroData} />
      {/* Account Overview */}
      <div className="container mx-auto">
        <AccountOverview
          title="Standard Checking Account"
          description="A Standard Checking Account at Apex Finance is the cornerstone of modern banking, designed to meet the everyday financial needs of individuals and businesses. With essential features like unlimited transactions, debit card access, and online banking, it's the perfect solution for managing your daily finances with ease."
          ctaText="Open An Account"
          ctaLink="/apply/checking/standard"
          theme="dark"
        />
        
        {/* Features */}
        <BenefitsComparison
          title="Compare Our Checking Accounts"
          subtitle="Find the right checking account for your needs"
          accountTypes={accountTypes}
          featureLabels={featureLabels}
          theme="light"
        />
        <FeatureList
          title="Key Features"
          subtitle="Everything you need for everyday banking"
          features={features}
          columns={3}
          theme="dark"
        />
        
        {/* Comparison */}
      
        
        {/* Eligibility */}
        <EligibilitySection
          title="Eligibility Requirements"
          description="To open a Standard Checking Account, you'll need to meet the following requirements"
          items={eligibilityItems}
          image1="/landing-page/altbiz.jpg"
          image2="/landing-page/altbiz.jpg"
          imagePosition="right"
        />
        <CheckingAccountSummary/>
        {/* FAQs */}
        <FAQSection
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our Standard Checking Account"
          faqs={faqs}
          theme="dark"
        />
        
        {/* Call to Action */}
        <CTASection
          title="Ready to Get Started?"
          description="Open a Standard Checking Account with Apex Finance today and experience the freedom and flexibility of managing your finances with ease."
          primaryButtonText="Open an Account"
          primaryButtonLink="/apply/checking/standard"
          secondaryButtonText="Contact a Banker"
          secondaryButtonLink="/contact"
          theme="dark"
        />
      </div>
    </div>
  );
};

export default StandardCheckingPage;