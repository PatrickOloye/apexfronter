// 1. LOAN OVERVIEW CARD COMPONENT
// This component provides a quick summary of unsecured personal loans

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface LoanFeatureProps {
  icon: string;
  title: string;
  description: string;
}

const LoanFeature: React.FC<LoanFeatureProps> = ({ icon, title, description }) => (
  <div className="flex items-start space-x-3 mb-4">
    <div className="bg-blue-100 p-2 rounded-lg">
      <Image src={icon} alt={title} width={24} height={24} />
    </div>
    <div>
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

interface LoanOverviewCardProps {
  backgroundColor?: string;
  textColor?: string;
}

export const LoanOverviewCard: React.FC<LoanOverviewCardProps> = ({ 
  backgroundColor = "bg-gradient-to-r from-blue-900 to-blue-900",
  textColor = "text-white"
}) => {
  const features = [
    {
      icon: "/icons/shield.svg",
      title: "No Collateral Required",
      description: "Borrow without risking your valuable assets"
    },
    {
      icon: "/icons/clock.svg",
      title: "Quick Approval",
      description: "Get funds deposited as soon as next business day"
    },
    {
      icon: "/icons/chart.svg",
      title: "Fixed Rates",
      description: "Enjoy predictable monthly payments"
    },
    {
      icon: "/icons/check.svg",
      title: "Flexible Use",
      description: "Use funds for almost any legitimate purpose"
    }
  ];

  return (
    <div className={` overflow-hidden shadow-lg ${backgroundColor}`}>
      <div className="p-8">
        <h2 className={`text-2xl font-bold mb-2 ${textColor}`}>Unsecured Personal Loans</h2>
        <p className={`mb-6 ${textColor} opacity-90`}>
          Access the funds you need without putting up collateral, with competitive rates and flexible terms.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {features.map((feature, index) => (
            <div key={index} className={`${textColor} opacity-90`}>
              <LoanFeature
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
        
        <button className="flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition duration-300">
          <span>Apply Now</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};