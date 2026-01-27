// Component 1: MortgageFeatureGrid
// A grid-based component highlighting key features of mortgage products

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home, Shield, Calendar, Wallet, PieChart } from 'lucide-react';
import Image from 'next/image';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
}

const Feature = ({ icon, title, description, color = "blue-600" }: FeatureProps) => {
  return (
    <motion.div 
      className={`p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-${color}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={`inline-flex p-3 rounded-full bg-${color}/10 text-${color} mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export const MortgageFeatureGrid = ({ color = "blue-600" }) => {
  const features = [
    {
      icon: <Home size={24} />,
      title: "Stable Interest Rate",
      description: "Lock your rate at closing with no surprises throughout the entire loan term."
    },
    {
      icon: <Shield size={24} />,
      title: "Protection from Market Fluctuations",
      description: "Your rate stays the same regardless of how the market changes."
    },
    {
      icon: <Calendar size={24} />,
      title: "Consistent Monthly Payments",
      description: "Budget with confidence knowing your principal and interest never change."
    },
    {
      icon: <Wallet size={24} />,
      title: "Flexible Terms",
      description: "Choose from 15, 20, or 30-year terms to match your financial goals."
    },
    {
      icon: <PieChart size={24} />,
      title: "Transparent Pricing",
      description: "Simple, straightforward structure that's easier to understand than adjustable options."
    },
    {
      icon: <ChevronRight size={24} />,
      title: "Long-Term Planning",
      description: "Ideal for those planning to stay in their home for many years."
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.h2 
            className={`text-3xl md:text-4xl font-bold mb-4 text-${color}`}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Key Features of Fixed-Rate Mortgages
          </motion.h2>
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Our fixed-rate mortgages offer stability, predictability, and peace of mind for your homeownership journey.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
              color={color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
