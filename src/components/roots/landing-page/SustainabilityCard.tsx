// src/app/page.tsx
import React from 'react';
import SustainabilityCard from './ui/sustainabilityCard';

const Cards = () => {
  return (
    <div className="flex flex-wrap gap-6 p-8 bg-gray-50">
      <SustainabilityCard
        title="Corporate sustainability"
        description="We focus on the long-term sustainability of BlackRock so we can continue to deliver value to our clients, shareholders, employees, and communities."
        link="/corporate-sustainability"
      />
      <SustainabilityCard
        title="Investment stewardship"
        description="We engage with companies to inform our voting and promote sound corporate governance that is consistent with long-term financial value creation."
        link="/investment-stewardship"
      />
    </div>
  );
};

export default Cards;