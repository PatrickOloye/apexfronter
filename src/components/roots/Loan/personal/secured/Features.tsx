// components/investments/FeatureCardsGrid.tsx
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
  bgColor?: string;
  textColor?: string;
}

interface FeatureCardsGridProps {
  features: FeatureCardProps[];
  title: string;
  subtitle: string;
  columns?: 2 | 3 | 4;
  bgColor?: string;
  textColor?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  iconAlt,
  bgColor = "bg-white",
  textColor = "text-gray-800"
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
      className={`${bgColor} rounded-xl p-6 shadow-lg flex flex-col items-start`}
    >
      <div className="bg-blue-600/10 p-3 rounded-lg mb-4">
        <Image 
          src={icon} 
          alt={iconAlt} 
          width={40} 
          height={40}
          className="object-contain" 
        />
      </div>
      <h3 className={`text-xl font-bold mb-3 ${textColor}`}>{title}</h3>
      <p className={`${textColor} opacity-80`}>{description}</p>
    </motion.div>
  );
};

const FeatureCardsGrid: React.FC<FeatureCardsGridProps> = ({
  features,
  title,
  subtitle,
  columns = 3,
  bgColor = "bg-gray-50",
  textColor = "text-gray-900"
}) => {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <section className={`${bgColor} py-16 px-4 md:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>{title}</h2>
          <p className={`${textColor} opacity-80 max-w-3xl mx-auto`}>{subtitle}</p>
        </div>
        
        <div className={`grid ${gridCols[columns]} gap-8`}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              bgColor={feature.bgColor || "bg-white"}
              textColor={feature.textColor || textColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCardsGrid;