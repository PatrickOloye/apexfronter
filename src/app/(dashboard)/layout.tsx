"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Menu from "@/libs/Menu";
import Navbar from "@/components/Nevbar";
import AppLink from "@/components/AppLink";
import AuthGuard from "@/components/AuthGuard";
import { BRAND } from "@/config/brand";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isChatPage = pathname?.includes('/chats');

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handleScroll = () => {
      setIsScrolled(el.scrollTop > 8);
    };
    el.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (window.innerWidth < 768 && isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = previousOverflow || '';
    };
  }, [isSidebarOpen]);

  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-slate-50">
      {/* MOBILE OVERLAY & DRAWER */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9998] md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-slate-900 shadow-2xl z-[9999] md:hidden border-r border-slate-800 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-800/50">
                <div className="flex items-center gap-3">
                   <Image 
                      src={BRAND.logoSrc} 
                      alt={`${BRAND.name} Logo`}
                      width={32} 
                      height={32} 
                      className="brightness-0 invert object-contain" 
                   />
                   <div className="flex flex-col">
                      <span className="text-emerald-400 text-[10px] font-bold leading-none tracking-widest uppercase">{BRAND.shortName}</span>
                      <span className="text-white font-bold text-lg leading-none tracking-tight">BANK</span>
                   </div>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <div onClick={(e) => {
                  if ((e.target as HTMLElement).closest('a')) {
                    setIsSidebarOpen(false);
                  }
                }}>
                  <Menu />
                </div>
              </div>
              
              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-800/50 bg-slate-900/50">
                <p className="text-xs text-center text-slate-500 font-medium">© {new Date().getFullYear()} {BRAND.name}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex flex-col fixed md:static inset-y-0 left-0 z-50 w-64 md:w-[8%] lg:w-[16%] xl:w-[14%] bg-gradient-to-b from-slate-800 via-slate-800 to-slate-900 shadow-xl h-full">
        {/* Logo */}
        <div className="flex-shrink-0 p-4 border-b border-slate-700/50 flex items-center justify-between">
          <AppLink
            href="/"
            className="flex items-center justify-center lg:justify-start gap-2 w-full"
          >
             <Image 
                src={BRAND.logoSrc} 
                alt={`${BRAND.name} Logo`} 
                width={32} 
                height={32}
                className="brightness-0 invert object-contain"
             />
             <div className="hidden lg:flex flex-col">
                <span className="text-emerald-400 text-[10px] font-bold leading-none tracking-widest uppercase">{BRAND.shortName}</span>
                <span className="text-white font-bold text-lg leading-none tracking-tight">BANK</span>
             </div>
          </AppLink>
        </div>
        {/* Menu */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <Menu />
        </div>
      </div>
      
      {/* RIGHT CONTENT AREA */}
      <div ref={contentRef} className={`flex-1 w-full md:w-[92%] lg:w-[84%] xl:w-[86%] bg-slate-50 ${isChatPage ? 'overflow-hidden' : 'overflow-auto no-scrollbar'} overscroll-none flex flex-col`}>
        <Navbar 
          isScrolled={isScrolled} 
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <div className={`flex-1 relative ${isChatPage ? 'p-0 overflow-hidden flex flex-col' : 'px-4 md:px-6 pt-4 pb-24 md:pb-4'}`}>
          {isChatPage ? (
             <div className="h-full w-full">
               <AuthGuard>{children}</AuthGuard>
             </div>
          ) : (
            <AuthGuard>{children}</AuthGuard>
          )}
        </div>
      </div>
    </div>
  );
}