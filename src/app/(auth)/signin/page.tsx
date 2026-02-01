'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SigninFormData } from '@/libs/server-actions/types';
import { useAuthStore, getRoleBasedRedirect } from '../../../store/AuthStore';
import { useAuthRedirect } from '../../../hooks/useAuthRedirect';
import { motion } from 'framer-motion';
import { useLoading } from '../../../components/LoadingProvider';
import { BRAND } from '../../../config/brand';
import { BrandMark } from '../../../components/BrandMark';

import { toast } from 'sonner';

export default function SignIn() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);
  
  // Use persistent redirect hook to handle Back button / fast navigation
  useAuthRedirect();
  // Removed errorMessage state
  const isLoading = useAuthStore((state) => state.isLoading);
  const { startLoading } = useLoading();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await login(formData.email, formData.password);
      const role = response?.user?.role ?? useAuthStore.getState().user?.role;
      const redirectPath = getRoleBasedRedirect(role);
      
      // Start loading overlay BEFORE toast so user sees smooth transition
      startLoading('Redirecting to your dashboard...');
      toast.success('Successfully signed in!');
      
      // CRITICAL: Wait for Zustand persist to write token to localStorage
      // The persist middleware is async - we must wait before navigating
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Verify token is actually in localStorage before navigating
      const verifyStorage = (): boolean => {
        try {
          const stored = localStorage.getItem('apex-auth');
          if (stored) {
            const parsed = JSON.parse(stored);
            return !!parsed?.state?.token;
          }
        } catch (e) {
          console.warn('[SignIn] Storage verification failed:', e);
        }
        return false;
      };
      
      // If still not written, wait a bit more (handles slow iOS devices)
      if (!verifyStorage()) {
        console.warn('[SignIn] Token not in storage yet, waiting longer...');
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // Use hard navigation to ensure clean slate and avoid Next.js router race
      window.location.href = redirectPath;
    } catch (error) {
      console.error('Signin error:', error);
      const msg = error instanceof Error ? error.message : 'An error occurred during sign in';
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -40, 0], 
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 60, 0], 
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full py-6 px-8"
      >
        <Link href="/" className="inline-flex items-center gap-2 group">
          <BrandMark variant="dark" size="md" />
        </Link>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/20">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-slate-400">Sign in to access your {BRAND.shortName} account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  autoComplete="off"
                  className="peer w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300 disabled:opacity-50"
                  placeholder="Email"
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-4 top-4 text-slate-400 text-sm transition-all duration-300 pointer-events-none peer-focus:-top-6 peer-focus:left-1 peer-focus:text-xs peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:left-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-400"
                >
                  Email Address
                </label>
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                  className="peer w-full px-4 py-4 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300 disabled:opacity-50"
                  placeholder="Password"
                />
                <label 
                  htmlFor="password" 
                  className="absolute left-4 top-4 text-slate-400 text-sm transition-all duration-300 pointer-events-none peer-focus:-top-6 peer-focus:left-1 peer-focus:text-xs peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:left-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-400"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full py-4 px-6 overflow-hidden rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <motion.svg 
                        className="w-5 h-5" 
                        viewBox="0 0 24 24"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </motion.svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </motion.button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="text-slate-500 text-sm">or</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-slate-400">
              Don&apos;t have an account?{' '}
              <Link 
                href="/signup" 
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors inline-flex items-center gap-1"
                onClick={() => {
                  setIsNavigating(true);
                  startLoading('Loading...');
                }}
              >
                {isNavigating ? (
                  <>
                    <motion.svg 
                      className="w-4 h-4" 
                      viewBox="0 0 24 24"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </motion.svg>
                    Loading...
                  </>
                ) : (
                  'Create account'
                )}
              </Link>
            </p>
          </div>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex items-center justify-center gap-6"
          >
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              256-bit SSL
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              FDIC Insured
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
              </svg>
              2FA Protected
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
      </footer>
    </div>
  );
}