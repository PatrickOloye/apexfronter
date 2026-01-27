'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLoading } from '../../../components/LoadingProvider';
import { BRAND } from '../../../config/brand';
import { AuthService } from '../../../libs/server-actions/auth';

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const { startLoading, stopLoading, isLoading } = useLoading();

  useEffect(() => {
    if (!token) {
        setErrorMessage('Invalid or missing reset token.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    
    if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
    }

    if (password.length < 8) {
        setErrorMessage('Password must be at least 8 characters');
        return;
    }

    setErrorMessage('');
    startLoading('Resetting password...');

    try {
      await AuthService.resetPassword(password, token);
      setSuccess(true);
      setTimeout(() => {
          router.push('/signin');
      }, 3000);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to reset password');
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
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
            <span className="text-2xl font-bold text-white">{BRAND.name}</span>
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
                    <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
                    <p className="text-slate-400">Enter your new password below</p>
                </div>

                {success ? (
                    <div className="text-center p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
                        <h3 className="text-green-400 font-bold text-lg mb-2">Password Reset Successful!</h3>
                        <p className="text-green-300/80 mb-4">Redirecting you to sign in...</p>
                    </div>
                ) : (
                    <>
                        {errorMessage && (
                            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="peer w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all"
                                    placeholder="New Password"
                                />
                                <label className="absolute left-4 top-4 text-slate-400 text-sm transition-all pointer-events-none peer-focus:-top-6 peer-focus:left-1 peer-focus:text-xs peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:left-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-400">
                                    New Password
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="peer w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all"
                                    placeholder="Confirm Password"
                                />
                                <label className="absolute left-4 top-4 text-slate-400 text-sm transition-all pointer-events-none peer-focus:-top-6 peer-focus:left-1 peer-focus:text-xs peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:left-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-400">
                                    Confirm Password
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !token}
                                className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg transition-all disabled:opacity-50"
                            >
                                {isLoading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </motion.div>
      </main>
    </div>
  );
}
