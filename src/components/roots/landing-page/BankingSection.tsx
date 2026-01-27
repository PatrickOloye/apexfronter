"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface InsightItem {
  id: string;
  category: string;
  title: string;
  contentType: 'Podcast' | 'Video' | 'Article';
  date: string;
  imageUrl: string;
  duration?: string;
  featured?: boolean;
  gradient: string;
}

const insights: InsightItem[] = [
  {
    id: '1',
    category: 'APEX INSIGHTS',
    title: 'The Future of Digital Banking in Emerging Markets',
    contentType: 'Article',
    date: 'May 10, 2025',
    imageUrl: '/landing-page/altbiz.jpg',
    featured: true,
    gradient: 'from-blue-600/90 to-cyan-600/90'
  },
  {
    id: '2',
    category: 'LEADERSHIP',
    title: 'CEO Sarah Nguyen on Sustainable Banking Practices',
    contentType: 'Video',
    date: 'May 5, 2025',
    imageUrl: '/landing-page/altpro.jpg',
    duration: '22:15',
    gradient: 'from-violet-600/90 to-purple-600/90'
  },
  {
    id: '3',
    category: 'TECHNOLOGY',
    title: 'How AI is Transforming Financial Services',
    contentType: 'Podcast',
    date: 'May 3, 2025',
    imageUrl: '/landing-page/coin1.jpg',
    gradient: 'from-emerald-600/90 to-teal-600/90'
  },
  {
    id: '4',
    category: 'STRATEGY',
    title: 'Building Wealth in Volatile Economic Times',
    contentType: 'Article',
    date: 'Apr 28, 2025',
    imageUrl: '/landing-page/dollar2.jpg',
    gradient: 'from-amber-600/90 to-orange-600/90'
  }
];

const ContentTypeIcon = ({ type }: { type: 'Podcast' | 'Video' | 'Article' }) => {
  const icons = {
    Podcast: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    Video: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    Article: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  };
  return icons[type] || null;
};

// Featured Card Component
const FeaturedCard = ({ insight }: { insight: InsightItem }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="relative group h-[500px] rounded-3xl overflow-hidden"
  >
    <Image
      src={insight.imageUrl}
      alt={insight.title}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-110"
      sizes="(max-width: 1024px) 100vw, 50vw"
    />
    
    {/* Gradient Overlay */}
    <div className={`absolute inset-0 bg-gradient-to-t ${insight.gradient} opacity-80 group-hover:opacity-90 transition-opacity`} />
    
    {/* Content */}
    <div className="absolute inset-0 flex flex-col justify-end p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-4">
          {insight.category}
        </span>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          {insight.title}
        </h3>
        <div className="flex items-center gap-4 text-white/80 text-sm">
          <span className="flex items-center gap-2">
            <ContentTypeIcon type={insight.contentType} />
            {insight.contentType}
          </span>
          <span>•</span>
          <span>{insight.date}</span>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 px-6 py-3 bg-white text-slate-900 rounded-xl font-semibold inline-flex items-center gap-2 hover:shadow-xl transition-shadow"
        >
          Read Article
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  </motion.div>
);

// Small Card Component
const InsightCard = ({ insight, index }: { insight: InsightItem; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer"
  >
    {/* Image */}
    <div className="relative w-32 h-24 rounded-xl overflow-hidden shrink-0">
      <Image
        src={insight.imageUrl}
        alt={insight.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="128px"
      />
      {insight.contentType === 'Video' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-slate-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
      )}
      {insight.duration && (
        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded">
          {insight.duration}
        </span>
      )}
    </div>

    {/* Content */}
    <div className="flex-1 min-w-0">
      <span className={`text-xs font-bold bg-gradient-to-r ${insight.gradient} bg-clip-text text-transparent`}>
        {insight.category}
      </span>
      <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 mt-1">
        {insight.title}
      </h4>
      <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
        <ContentTypeIcon type={insight.contentType} />
        <span>{insight.contentType}</span>
        <span>•</span>
        <span>{insight.date}</span>
      </div>
    </div>
  </motion.div>
);

export default function FinancialInsights() {
  const featuredInsight = insights.find(item => item.featured);
  const sideInsights = insights.filter(item => !item.featured);

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Market Insights
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Financial Trends &{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Analysis
              </span>
            </h2>
            <p className="text-lg text-slate-600 mt-4 max-w-2xl">
              Stay ahead with expert insights on market trends, investment strategies, and the future of digital finance.
            </p>
          </div>
          
          <Link href="/insights">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg shadow-slate-900/20"
            >
              View All Insights
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
        
        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Card */}
          {featuredInsight && <FeaturedCard insight={featuredInsight} />}

          {/* Side Cards */}
          <div className="flex flex-col gap-2">
            {sideInsights.map((insight, index) => (
              <InsightCard key={insight.id} insight={insight} index={index} />
            ))}
            
            {/* APEX Description Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-4 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-lg">
                  A
                </div>
                <span className="font-semibold">About APEX Bank</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                At the forefront of digital finance innovation. We empower individuals and businesses with transparent, strategic, and impactful financial solutions for tomorrow&apos;s challenges.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
