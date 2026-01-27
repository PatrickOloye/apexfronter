'use client';

import { useState, useEffect } from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "I've earned over $300 in interest this year alone with Apex's high-yield savings. Their mobile app makes tracking my goals so simple.",
      name: "Sarah K.",
      location: "Austin, TX",
      avatar: "👩🏽"
    },
    {
      quote: "As a freelancer with irregular income, the flexible withdrawal limits have been a lifesaver. I can save when I earn more and access funds when work is slow.",
      name: "Michael T.",
      location: "Portland, OR",
      avatar: "👨🏼"
    },
    {
      quote: "The 24/7 customer support has resolved my issues faster than any big bank. I actually feel valued as a customer, not just an account number.",
      name: "Priya M.",
      location: "Chicago, IL",
      avatar: "👩🏾"
    },
    {
      quote: "Switching to Apex's savings account was the best financial decision I made this year. The interest rates are unbeatable!",
      name: "David R.",
      location: "Miami, FL",
      avatar: "👨🏽"
    },
    {
      quote: "I love how easy it is to set up automatic savings goals. My vacation fund grew faster than I expected!",
      name: "Jennifer L.",
      location: "Denver, CO",
      avatar: "👩🏻"
    },
    {
      quote: "The round-up feature has helped me save hundreds without even noticing. Brilliant way to build savings effortlessly.",
      name: "Carlos G.",
      location: "San Diego, CA",
      avatar: "👨🏾"
    },
    {
      quote: "After years with traditional banks, Apex's modern approach to savings is refreshing. No hidden fees, just great service.",
      name: "Emily W.",
      location: "Seattle, WA",
      avatar: "👩🏼"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
          What Our Customers Say
        </h2>

        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Card with smooth transition */}
          <div 
            className="bg-white p-8 rounded-xl shadow-lg mb-8 min-h-[250px] transition-opacity duration-500"
            key={activeIndex} // Force re-render for animation
          >
            <blockquote className="text-xl italic text-gray-700 mb-6">
              &apos;{testimonials[activeIndex].quote}&apos;
            </blockquote>
            <div className="flex items-center">
              <div className="text-3xl mr-4">{testimonials[activeIndex].avatar}</div>
              <div>
                <p className="font-bold text-blue-800">{testimonials[activeIndex].name}</p>
                <p className="text-gray-600">{testimonials[activeIndex].location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators with glassmorphism effect */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {[
            { value: "4.8★", label: "App Store Rating" },
            { value: "250k+", label: "Happy Customers" },
            { value: "$1.2B", label: "Assets Protected" },
            { value: "24/7", label: "Customer Support" }
          ].map((item, index) => (
            <div 
              key={index}
              className="text-center bg-white/20 backdrop-blur-sm p-4 rounded-lg border border-white/30 shadow-[inset_1px_1px_5px_rgba(255,255,255,0.3)]"
            >
              <div className="text-4xl font-bold text-blue-600">{item.value}</div>
              <p className="text-gray-600 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;