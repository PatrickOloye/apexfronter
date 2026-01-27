'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: string;
  gradient: string;
  features: string[];
  benefits: string[];
}

const services: Service[] = [
  {
    id: 'trade',
    title: 'Structured Trade Finance',
    subtitle: 'Global Commerce Solutions',
    description: 'Navigate international trade with confidence. Our bespoke solutions help businesses mitigate risks and optimize working capital.',
    image: '/landing-page/trade-finance.jpg',
    icon: '🌐',
    gradient: 'from-blue-600 to-cyan-500',
    features: ['Pre-Export Financing', 'Import/Export Trade Credit', 'Letter of Credit Services', 'Receivables Financing', 'Warehouse Receipt Financing'],
    benefits: ['Mitigate cross-border risks', 'Flexible payment terms', 'Competitive rates', 'Expedited processing', 'Transparent fees']
  },
  {
    id: 'digital',
    title: 'Digital Banking',
    subtitle: 'Bank Anywhere, Anytime',
    description: 'Complete control over your finances with our award-winning mobile and web platforms. Secure, fast, and intuitive.',
    image: '/landing-page/dollar2.jpg',
    icon: '📱',
    gradient: 'from-violet-600 to-purple-500',
    features: ['Real-time Account Management', 'Biometric Authentication', 'Multi-Currency Transactions', 'Portfolio Tracking', '24/7 Customer Support'],
    benefits: ['Bank from anywhere', 'Instant transfers', 'Custom alerts', 'Advanced security', 'Seamless integration']
  },
  {
    id: 'investment',
    title: 'Investment Solutions',
    subtitle: 'Grow Your Wealth',
    description: 'Access diverse investment opportunities with expert guidance. Build wealth for you and your family with smart strategies.',
    image: '/landing-page/dollar1.jpg',
    icon: '📈',
    gradient: 'from-emerald-600 to-teal-500',
    features: ['Real-time Stock Updates', 'Daily Market Analysis', 'Expert Investment Guides', 'Portfolio Tracking', 'Automated Investing'],
    benefits: ['Diversified options', 'Expert insights', 'Low fees', 'Risk management', 'Long-term growth']
  }
];

const ServiceCard = ({ service, isReversed }: { service: Service; isReversed: boolean }) => {
  const [activeTab, setActiveTab] = useState<'features' | 'benefits'>('features');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center py-16 lg:py-24`}
    >
      {/* Image Section */}
      <div className="w-full lg:w-1/2">
        <motion.div
          whileHover={{ scale: 1.02, rotate: isReversed ? -1 : 1 }}
          transition={{ duration: 0.4 }}
          className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-40`} />
          
          {/* Icon Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring" }}
            className={`absolute top-6 ${isReversed ? 'right-6' : 'left-6'} w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center text-3xl`}
          >
            {service.icon}
          </motion.div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2">
        {/* Subtitle Badge */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${service.gradient} text-white text-sm font-semibold mb-4`}
        >
          {service.subtitle}
        </motion.span>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
        >
          {service.title}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-lg text-slate-600 mb-8 leading-relaxed"
        >
          {service.description}
        </motion.p>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('features')}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'features'
                  ? `bg-gradient-to-r ${service.gradient} text-white shadow-lg`
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Features
            </button>
            <button
              onClick={() => setActiveTab('benefits')}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'benefits'
                  ? `bg-gradient-to-r ${service.gradient} text-white shadow-lg`
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Benefits
            </button>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              {(activeTab === 'features' ? service.features : service.benefits).map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${service.gradient} flex items-center justify-center text-white text-sm`}>
                    ✓
                  </div>
                  <span className="text-slate-700 text-sm font-medium">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.98 }}
              className={`px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r ${service.gradient} shadow-lg inline-flex items-center gap-2`}
            >
              Learn More
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

const BankingServices = () => {
  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Comprehensive{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Banking Solutions
            </span>
          </h2>
          <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            From trade finance to digital banking, we provide everything you need to manage and grow your wealth.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="divide-y divide-slate-100">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              isReversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BankingServices;