// pages/savings-account.js
import React from 'react';
import Head from 'next/head';
import SavingsHero from '@/components/roots/savings/Hero';
import SavingsFeatures from '@/components/roots/savings/Savings-Features';
import SustainabilityCard from '../../../components/roots/landing-page/ui/sustainabilityCard';
import SavingsBenefits from '@/components/roots/savings/Savings-Benefits';
import SavingsOverview from '@/components/roots/savings/Savings-Overview';
import HowItWorks from '@/components/roots/savings/HoowItWorks';
import Testimonials from '@/components/roots/savings/Testimonials';

export default function SavingsAccountPage() {
  // Hero section props
  const heroProps = {
    title: "Savings Accounts",
    description: "Apex Bank savings accounts are more than just a place to store money—they are a gateway to financial security, growth, and empowerment. With competitive interest rates and innovative features, we ensure your money works harder for you.",
    imageSrc: "/images/savings-hero.jpg",
    buttonText: "Open an Account",
    buttonLink: "/apply"
  };

  // SavingsFeatures props
  const featuresProps = {
    sectionTitle: "What Sets Apex Bank Apart",
    sectionDescription: "Recognizing that every individual's saving journey is unique, we offer an array of account types tailored to specific needs with simplicity and flexibility.",
    imageSrc: "/images/customer-service.jpg"
  };

  // SavingsBenefits props
  const benefitsProps = {
    sectionTitle: "Empowering Your Financial Journey",
    sectionDescription: "Whether it's helping families save for their first home or providing business owners a financial cushion for growth, our savings accounts have transformed lives across the globe."
  };

  // Card section content
  const savingsCardData = [
    {
      title: "Regular Savings",
      description: "Our standard savings account with competitive interest rates and flexible access to your funds for everyday financial needs.",
      link: "/regular-savings"
    },
    {
      title: "High-Yield Savings",
      description: "Maximize your returns with our premium savings option offering higher interest rates for those seeking greater growth potential.",
      link: "/high-yield-savings"
    },
    {
      title: "youth Savings",
      description: "Help children develop healthy financial habits early with accounts specifically designed for young savers.",
      link: "/youth-savings"
    }
  ];

  return (
    <>
      <Head>
        <title>Savings Accounts | Apex Bank</title>
        <meta name="description" content="Discover Apex Bank's savings account options designed to help you achieve your financial goals with competitive rates and flexible features." />
      </Head>

      <main>
        {/* Hero Section */}
        <SavingsHero  />
        {/* Features Section */}
        <SavingsFeatures {...featuresProps} />
        <SavingsOverview/>
       <Testimonials/>
        <HowItWorks/>
        
        <SavingsBenefits {...benefitsProps} />
      </main>
    </>
  );
}