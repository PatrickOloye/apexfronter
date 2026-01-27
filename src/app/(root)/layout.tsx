'use client'
import { Inter } from 'next/font/google';
import Footer from "../../components/roots/landing-page/Footer";
import Navbar from "../../components/roots/landing-page/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow w-full overflow-x-hidden">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}