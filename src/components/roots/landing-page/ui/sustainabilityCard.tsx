// src/components/SustainabilityCard.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import  Button  from '../../../ui/Button'; 
import { MdPlayCircleFilled } from "react-icons/md";

interface SustainabilityCardProps {
  title: string;
  description: string;
  link: string;
}

const SustainabilityCard: React.FC<SustainabilityCardProps> = ({ title, description, link }) => {
  return (
    <motion.div
      className="flex flex-col items-start p-6  bg-gradient-to-r from-blue-300 to-blue-600 text-white shadow-lg rounded-lg w-80 hover:shadow-xl transition-shadow duration-300 ease-in-out"
      whileHover={{ y: -5 }} // Subtle lift animation on hover
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Card Title */}
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      {/* Card Description */}
      <p className="text-sm text-white mb-6">{description}</p>
      {/* Learn More Button */}
      <Button
        text="Watch Now"
        icon={MdPlayCircleFilled}
        onClick={() => console.log("Button clicked!")}
      >
        <span className="text-lg">→</span> Learn more
      </Button>
    </motion.div>
  );
};

export default SustainabilityCard;