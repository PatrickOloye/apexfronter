'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLoading } from '../../../components/LoadingProvider';
import { BrandMark } from '../../../components/BrandMark';
import { AuthService } from '../../../libs/server-actions/auth';
import { useAuthRedirect } from '../../../hooks/useAuthRedirect';

export default function ResetPassword() {
  useAuthRedirect();
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

  const inputClass = "peer w-full min-w-0 px-3 py-4 text-xs sm:px-4 sm:text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all";
  const labelClass = "absolute left-3 top-4 max-w-[calc(100%-1.5rem)] break-words text-xs leading-snug text-slate-400 transition-all pointer-events-none sm:left-4 sm:text-sm peer-focus:-top-6 peer-focus:left-1 peer-focus:text-[11px] peer-focus:text-blue-400 sm:peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:left-1 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-blue-400 sm:peer-[:not(:placeholder-shown)]:text-xs";

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
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
                    <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Reset Password</h1>
                    <p className="break-words text-sm text-slate-400 sm:text-base">Enter your new password below</p>
                </div>

                {success ? (
                    <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-5 text-center sm:p-6">
                        <h3 className="mb-2 break-words text-base font-bold text-green-400 sm:text-lg">Password Reset Successful!</h3>
                        <p className="mb-4 break-words text-sm text-green-300/80 sm:text-base">Redirecting you to sign in...</p>
                    </div>
                ) : (
                    <>
                        {errorMessage && (
                            <div className="mb-6 break-words rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs text-red-300 sm:text-sm">
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
                                    className={inputClass}
                                    placeholder="New Password"
                                />
                                <label className={labelClass}>
                                    New Password
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className={inputClass}
                                    placeholder="Confirm Password"
                                />
                                <label className={labelClass}>
                                    Confirm Password
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !token}
                                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 sm:px-6 sm:text-base"
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
