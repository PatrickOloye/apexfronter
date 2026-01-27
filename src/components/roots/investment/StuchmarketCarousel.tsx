'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type InvestmentType = {
  title: string;
  description: string;
  examples: string;
  riskLevel: string;
  imageSrc: string;
  imageAlt: string;
};

const colorThemes = {
  blue: { text: 'text-blue-600', bg: 'bg-blue-600', hover: 'hover:bg-blue-600' },
  emerald: { text: 'text-emerald-600', bg: 'bg-emerald-600', hover: 'hover:bg-emerald-600' },
  violet: { text: 'text-violet-600', bg: 'bg-violet-600', hover: 'hover:bg-violet-600' },
} as const;

type ColorTheme = keyof typeof colorThemes;

// Type guard to check valid color themes
function isColorTheme(theme: string): theme is ColorTheme {
  return theme in colorThemes;
}

const defaultInvestmentTypes: InvestmentType[] = [
  {
    title: "Blue-Chip Stocks",
    description: "Shares of large, well-established companies.",
    examples: "Apple, Microsoft",
    riskLevel: "Low to Medium",
    imageSrc: "/placeholder-stocks.jpg",
    imageAlt: "Blue-chip stocks"
  },
  // Add more items...
];

export default function InvestmentTypesCarousel({ 
  colorTheme = "blue",
  investmentData = defaultInvestmentTypes 
}: { 
  colorTheme?: string; // More flexible input
  investmentData?: InvestmentType[]; 
}) {
  // Validate color theme
  const validatedColorTheme = isColorTheme(colorTheme) ? colorTheme : "blue";
  const themeClasses = colorThemes[validatedColorTheme];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const investmentTypes = investmentData?.length ? investmentData : defaultInvestmentTypes;

  useEffect(() => {
    if (currentIndex >= investmentTypes.length) {
      setCurrentIndex(0);
    }
  }, [investmentTypes.length, currentIndex]);

  // Carousel logic...

  return (
    <div className="w-full py-12 bg-gray-50">
      {investmentTypes.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* SAFE THEME USAGE */}
              <h3 className={`text-xl font-bold ${themeClasses.text}`}>
                {investmentTypes[currentIndex]?.title || "Investment Option"}
              </h3>

              <div className="relative h-64 w-full">
                <Image
                  src={investmentTypes[currentIndex]?.imageSrc || "/placeholder-stocks.jpg"} 
                  alt={investmentTypes[currentIndex]?.imageAlt || "Investment image"}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-stocks.jpg";
                    target.onerror = null; // Prevent infinite loop
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <p className="text-center py-8">No investment data available</p>
      )}
    </div>
  );
}