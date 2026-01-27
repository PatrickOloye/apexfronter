// components/SavingsOverview.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import AccountTypesSection from '../landing-page/ui/AccountTypeSection';
;

const SavingsOverview: React.FC = () => {
  // Feature cards data
  const features = [
    {
      icon: <TrendingUp className="w-12 h-12 text-blue-600" />,
      title: "Competitive Returns",
      description: "Enjoy attractive interest rates that help your money grow faster across all our savings products."
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-blue-600" />,
      title: "Security & Reliability",
      description: "Rest easy knowing your funds are protected by industry-leading security technology and practices."
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Financial Inclusion",
      description: "Savings solutions designed for everyone, from children to retirees and small businesses."
    }
  ];

  // Account types data
  const accountTypes = [
    {
      title: "Regular Savings",
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
  ];

  return (
    <div className="w-full bg-black">
      {/* Hero Section */}
      <section className="pt-16 pb-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                More Than Just a Savings Account
              </h1>
              <p className="text-lg text-white mb-6">
                Apex Bank savings accounts are a gateway to financial security, growth, and empowerment with competitive interest rates and innovative features.
              </p>
              <Link href="/apply" className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Open an Account <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-lg">
              <Image 
                src="/landing-page/altpro.jpg" 
                alt="Family planning their savings" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Account Types Section - Using the reusable component */}
      <AccountTypesSection accountTypes={accountTypes} />

      {/* Empowerment Section */}
      <section className="py-12 px-4 md:px-8 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Making a Financial Change
              </h2>
              <p className="text-gray-600 mb-4">
                Whether it&apos;s helping families save for their first home, providing business owners a financial cushion for growth, or enabling students to fund their dreams of higher education, our savings accounts have transformed lives across the globe.
              </p>
              <p className="text-gray-600">
                By providing personalized guidance and exclusive perks to account holders, we ensure that saving is not just an obligation but an enriching journey toward achieving financial milestones.
              </p>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-lg">
              <Image 
                src="/landing-page/account-opening.jpg" 
                alt="Customer using Apex Bank digital services" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Start Your Savings Journey?</h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of satisfied customers who trust Apex Bank with their financial future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Open an Account
            </Link>
            <Link href="/contact" className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-700 transition-colors">
              Speak with an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SavingsOverview;