'use client'
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  button1: {
    text: string;
    link: string;
  };
  button2: {
    text: string;
    link: string;
  };
}

// Enhanced slide content with modern messaging
const slides: Slide[] = [
  {
    image: "/landing-page/hero1.jpg",
    title: "Banking Reimagined",
    subtitle: "For the Modern Era",
    description: "Experience premium banking with cutting-edge technology, personalized service, and world-class financial solutions tailored to your ambitions.",
    accent: "from-blue-600 to-cyan-400",
    button1: { text: "Open Account", link: "/signup" },
    button2: { text: "Explore Services", link: "/savings" }
  },
  {
    image: "/landing-page/hero4.jpg",
    title: "Global Without Borders",
    subtitle: "Your World, Your Bank",
    description: "Seamlessly manage assets across 50+ countries with real-time currency conversion, competitive rates, and localized expertise wherever you are.",
    accent: "from-emerald-500 to-teal-400",
    button1: { text: "Go Global", link: "/signup" },
    button2: { text: "Currency Solutions", link: "/signup" }
  },
  {
    image: "/landing-page/hero3.jpg", 
    title: "Intelligent Finance",
    subtitle: "AI-Powered Insights",
    description: "Our intelligent platform learns your habits, anticipates your needs, and provides personalized insights that help your money work smarter.",
    accent: "from-violet-600 to-purple-400",
    button1: { text: "Get Started", link: "/" },
    button2: { text: "See Features", link: "/Signup" }
  }
];

// Typewriter Component
const Typewriter = ({ texts, speed = 50 }: { texts: string[]; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  useEffect(() => {
    const currentText = texts[loopNum % texts.length];
    
    const timer = setTimeout(() => {
      if (isDeleting) {
        setDisplayedText(currentText.substring(0, displayedText.length - 1));
        setTypingSpeed(speed / 2);
      } else {
        setDisplayedText(currentText.substring(0, displayedText.length + 1));
        setTypingSpeed(speed);
      }

      if (!isDeleting && displayedText === currentText) {
        setTypingSpeed(2000);
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(speed * 2);
      }
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopNum, texts, speed, typingSpeed]);

  return (
    <span className="inline-block min-h-[2.5rem]">
      <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent font-bold text-xl md:text-2xl lg:text-3xl">
        {displayedText}
      </span>
      <motion.span 
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="text-amber-400 ml-1"
      >
        |
      </motion.span>
    </span>
  );
};

// Stat Counter Component
const StatCounter = ({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 50);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-white">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-white/60 mt-1">{label}</div>
    </div>
  );
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Slide-specific typewriter texts
  const typewriterTextsBySlide = [
    ["Premium Wealth Management", "Secure Investment Solutions", "Next-Gen Technology"],
    ["Multi-Currency Accounts", "Seamless Global Transfers", "Local Expertise Worldwide"],
    ["AI-Powered Insights", "Smart Recommendations", "Automated Wealth Building"]
  ];
  
  const typewriterTexts = typewriterTextsBySlide[currentSlide];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Handle autoplay
  useEffect(() => {
    if (isAutoPlaying) {
      if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = setInterval(nextSlide, 6000);
    }
    return () => {
      if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
    };
  }, [isAutoPlaying, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) nextSlide();
    if (touchEnd - touchStart > 50) prevSlide();
  };

  return (
    <div className="relative w-full bg-slate-950">
      <div 
        className="relative h-screen w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Images with Slide Transition */}
        <div className="absolute inset-0 bg-slate-950">
          <AnimatePresence initial={false}>
            <motion.div
              key={`image-${currentSlide}`}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              
              {/* Multi-layer gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60" />
              
              {/* Animated grid pattern */}
              <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <div className="hidden md:block">
          <motion.button 
            onClick={prevSlide}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-6 top-1/2 z-30 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full text-white border border-white/10 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </motion.button>
          
          <motion.button 
            onClick={nextSlide}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-6 top-1/2 z-30 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full text-white border border-white/10 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center z-20 pt-20 md:pt-0">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div 
              key={`content-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl"
            >
              {/* Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight text-balance"
              >
                {slides[currentSlide].title.split(' ').map((word, i) => (
                  <span key={i}>
                    {i === slides[currentSlide].title.split(' ').length - 1 ? (
                      <span className={`bg-gradient-to-r ${slides[currentSlide].accent} bg-clip-text text-transparent`}>{word}</span>
                    ) : (
                      word + ' '
                    )}
                  </span>
                ))}
              </motion.h1>

              {/* Typewriter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-6 h-8 md:h-10"
              >
                <Typewriter texts={typewriterTexts} speed={45} />
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-base md:text-xl text-white/70 max-w-2xl mb-8 leading-relaxed max-w-[90vw] md:max-w-2xl"
              >
                {slides[currentSlide].description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <Link href={slides[currentSlide].button1.link}>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r ${slides[currentSlide].accent} text-white font-semibold rounded-xl overflow-hidden shadow-xl text-sm md:text-base`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {slides[currentSlide].button1.text}
                      <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </motion.button>
                </Link>
                
                <Link href={slides[currentSlide].button2.link}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 md:px-8 md:py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all text-sm md:text-base"
                  >
                    {slides[currentSlide].button2.text}
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-32 lg:bottom-12 left-0 right-0 z-30 flex items-center justify-center gap-6 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-6">
           {/* Slide Indicators - Moved up slightly to avoid stats bar overlap on mobile */}
          <div className="flex items-center gap-3 mb-12 md:mb-0">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="group flex items-center"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div className={`h-1.5 transition-all duration-500 rounded-full ${
                  currentSlide === index 
                    ? `w-12 bg-gradient-to-r ${slide.accent}` 
                    : "w-1.5 bg-white/30 group-hover:bg-white/50"
                }`} />
              </button>
            ))}
          </div>
          
          {/* Autoplay Toggle Removed - Auto-play is always on */}
        </div>
      </div>
    </div>

      {/* Stats Bar - Positioned to overlap - moved outside overflow-hidden */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute -bottom-10 lg:-bottom-10 left-4 right-4 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 z-40 px-6 py-6 lg:px-12 rounded-2xl backdrop-blur-xl bg-slate-900/90 md:bg-slate-900/80 border border-white/10 shadow-2xl"
      >
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
           <div className="grid grid-cols-2 gap-6 md:flex md:gap-12 w-full md:w-auto">
            <StatCounter value={500000} suffix="+" label="Active Users" />
            <div className="hidden md:block w-px h-12 bg-white/20" />
            <StatCounter value={50} suffix="+" label="Countries" />
            <div className="hidden md:block w-px h-12 bg-white/20" />
            <StatCounter value={10} suffix="B+" label="Assets Managed" />
            <div className="hidden md:block w-px h-12 bg-white/20" />
            <StatCounter value={99.9} suffix="%" label="Uptime" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;