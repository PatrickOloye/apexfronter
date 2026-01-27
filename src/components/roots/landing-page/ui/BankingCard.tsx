// src/components/BankingCard.tsx
'use client';
import Image from 'next/image';
import React from 'react';
import  Button  from '../../../ui/Button'; 
import { BankingCardContent } from '../../../../libs/bankingContent'; 
import { MdPlayCircleFilled } from "react-icons/md";

interface BankingCardProps {
  content: BankingCardContent;
}

const BankingCard: React.FC<BankingCardProps> = ({ content }) => {
  return (
    <div className="flex flex-col items-start p-6 bg-white shadow-md rounded-lg w-80 h-96 transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:bg-gray-100">
      {/* Card Image */}
      <Image
        src={content.image}
        alt={content.title}
        width={320}
        height={192}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
      {/* Card Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2 text-left">{content.title}</h3>
      {/* Card Description */}
      <p className="text-sm text-gray-600 mb-4 flex-grow text-left">{content.description}</p>
      {/* Read More Button */}
      <Button
       text="Watch Now"
       icon={MdPlayCircleFilled}
       onClick={() => console.log("Button clicked!")}
      >
        Read more
      </Button>
    </div>
  );
};

export default BankingCard;