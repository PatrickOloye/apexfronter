'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLoading } from '../../../components/LoadingProvider';
import { BrandMark } from '../../../components/BrandMark';
import { AuthService } from '../../../libs/server-actions/auth';

export default function ForgotPassword() {
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

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      {/* Background Elements (Same as SignIn) */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <header className="relative z-10 w-full py-6 px-8">
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
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
                    <p className="text-slate-400">Enter your email to receive a reset link</p>
                </div>

                {successMessage && (
                    <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-300 text-sm">
                        {successMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
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
                            className="peer w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all"
                            placeholder="Email"
                        />
                        <label className="absolute left-4 top-4 text-slate-400 text-sm transition-all pointer-events-none peer-focus:-top-6 peer-focus:left-1 peer-focus:text-xs peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:left-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-400">
                            Email Address
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg transition-all disabled:opacity-50"
                    >
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link href="/signin" className="text-slate-400 hover:text-white transition-colors text-sm">
                        Back to Sign In
                    </Link>
                </div>
            </div>
        </motion.div>
      </main>
    </div>
  );
}
