'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLoading } from '../../../components/LoadingProvider';
import { BrandMark } from '../../../components/BrandMark';
import { AuthService } from '../../../libs/server-actions/auth';
import { useAuthRedirect } from '../../../hooks/useAuthRedirect';

export default function ForgotPassword() {
  useAuthRedirect();
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { startLoading, stopLoading, isLoading } = useLoading();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    startLoading('Sending reset link...');

    try {
      await AuthService.forgotPassword(email);
      setSuccessMessage('If an account exists with this email, you will receive a password reset link shortly.');
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      stopLoading();
    }
  };

  const inputClass = "peer w-full min-w-0 px-3 py-4 text-xs sm:px-4 sm:text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all";
  const labelClass = "absolute left-3 top-4 max-w-[calc(100%-1.5rem)] break-words text-xs leading-snug text-slate-400 transition-all pointer-events-none sm:left-4 sm:text-sm peer-focus:-top-6 peer-focus:left-1 peer-focus:text-[11px] peer-focus:text-blue-400 sm:peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:left-1 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-blue-400 sm:peer-[:not(:placeholder-shown)]:text-xs";

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      {/* Background Elements (Same as SignIn) */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <header className="relative z-10 w-full px-4 py-6 sm:px-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <BrandMark variant="dark" size="md" />
        </Link>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-md"
        >
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-5 shadow-2xl sm:p-8">
                <div className="text-center mb-8">
                    <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Forgot Password?</h1>
                    <p className="break-words text-sm text-slate-400 sm:text-base">Enter your email to receive a reset link</p>
                </div>

                {successMessage && (
                    <div className="mb-6 break-words rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-xs text-green-300 sm:text-sm">
                        {successMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="mb-6 break-words rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs text-red-300 sm:text-sm">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={inputClass}
                            placeholder="Email"
                        />
                        <label className={labelClass}>
                            Email Address
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 sm:px-6 sm:text-base"
                    >
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link href="/signin" className="break-words text-xs text-slate-400 transition-colors hover:text-white sm:text-sm">
                        Back to Sign In
                    </Link>
                </div>
            </div>
        </motion.div>
      </main>
    </div>
  );
}
