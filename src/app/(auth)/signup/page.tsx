'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore, getRoleBasedRedirect } from '../../../store/AuthStore';
import { api } from '../../../libs/http/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLoading } from '../../../components/LoadingProvider';
import { BRAND } from '../../../config/brand';
import SearchableSelect from '../../../components/ui/SearchableSelect';
import CountrySelect from '../../../components/ui/CountrySelect';
import PhoneCodeSelect from '../../../components/ui/PhoneCodeSelect';

const STEPS = [
  { id: 1, title: 'Personal', icon: 'user' },
  { id: 2, title: 'Contact', icon: 'phone' },
  { id: 3, title: 'Security', icon: 'lock' },
];

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  countryOfOrigin: string;
  maritalStatus: string;
  ssn: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);

  // Redirect away from signup page if already authenticated
  useEffect(() => {
    if (user) {
      const role = user?.role ?? useAuthStore.getState().user?.role;
      const redirectPath = getRoleBasedRedirect(role);
      router.replace(redirectPath);
    }
  }, [user, router]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { startLoading } = useLoading();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    email: '',
    phoneCountryCode: '+1',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    postalCode: '',
    countryOfOrigin: 'US',
    maritalStatus: 'single',
    ssn: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateStep = (step: number): boolean => {
    setErrorMessage('');
    
    switch (step) {
      case 1:
        if (!formData.firstName || formData.firstName.length < 2) {
          setErrorMessage('First name must be at least 2 characters');
          return false;
        }
        if (!formData.lastName || formData.lastName.length < 2) {
          setErrorMessage('Last name must be at least 2 characters');
          return false;
        }
        if (!formData.dateOfBirth) {
          setErrorMessage('Date of birth is required');
          return false;
        }
        return true;
      case 2:
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          setErrorMessage('Valid email address is required');
          return false;
        }
        if (!formData.phoneNumber || formData.phoneNumber.length < 6) {
          setErrorMessage('Valid phone number is required');
          return false;
        }
        if (!formData.addressLine1 || formData.addressLine1.length < 5) {
          setErrorMessage('Address is required');
          return false;
        }
        return true;
      case 3:
        if (!formData.password || formData.password.length < 8) {
          setErrorMessage('Password must be at least 8 characters');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setErrorMessage('Passwords do not match');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await api.post('/auth/signup', {
        ...formData,
        dateOfBirth: formData.dateOfBirth?.toISOString().split('T')[0],
      });

      setSuccessMessage('Account created successfully!');
      const response = await login(formData.email, formData.password);
      const role = response?.user?.role ?? useAuthStore.getState().user?.role;
      const redirectPath = getRoleBasedRedirect(role);
      startLoading('Redirecting...');
      setTimeout(() => router.push(redirectPath), 300);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

const inputClass = "peer w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300 disabled:opacity-50";
  const labelClass = "absolute left-4 top-4 text-slate-400 text-sm transition-all duration-300 pointer-events-none peer-focus:-top-6 peer-focus:left-1 peer-focus:text-xs peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:left-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-400";

  return (
    <div className="min-h-screen relative overflow-x-hidden overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 w-full py-6 px-8"
      >
        <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="h-8 w-8 relative">
                <Image
                  src={BRAND.logoSrc}
                  alt={`${BRAND.name} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="relative whitespace-nowrap">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-500"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.780 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.540-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.810 23.239-7.825 27.934-10.149 28.304-14.005 .417-4.348-3.529-6-16.878-7.066Z" />
                </svg>
                <span className="relative text-2xl font-bold text-white">{BRAND.name.split(' ')[0]} <span className="text-blue-500">{BRAND.name.split(' ').slice(1).join(' ')}</span></span>
              </span>
        </Link>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-2xl"
        >
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
              <p className="text-slate-400">Join {BRAND.name} and start your journey</p>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      currentStep === step.id
                        ? 'bg-blue-500 text-white'
                        : currentStep > step.id
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-white/5 text-slate-500 border border-white/10'
                    }`}
                  >
                    <span className="w-6 h-6 flex items-center justify-center text-sm font-bold">
                      {currentStep > step.id ? '✓' : step.id}
                    </span>
                    <span className="hidden sm:block text-sm font-medium">{step.title}</span>
                  </button>
                  {index < STEPS.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 ${currentStep > step.id ? 'bg-green-500' : 'bg-white/10'}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Error/Success Messages */}
            {errorMessage && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errorMessage}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} className={inputClass} placeholder="First Name" disabled={isLoading} autoComplete="off" />
                        <label htmlFor="firstName" className={labelClass}>First Name</label>
                      </div>
                      <div className="relative">
                        <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} className={inputClass} placeholder="Last Name" disabled={isLoading} autoComplete="off" />
                        <label htmlFor="lastName" className={labelClass}>Last Name</label>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <div className="relative">
                          <DatePicker
                            selected={formData.dateOfBirth}
                            onChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
                            dateFormat="MM/dd/yyyy"
                            showYearDropdown
                            yearDropdownItemNumber={100}
                            scrollableYearDropdown
                            maxDate={new Date()}
                            className={inputClass}
                            placeholderText="Date of Birth"
                            disabled={isLoading}
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        <label className="absolute left-1 -top-6 text-xs text-blue-400">Date of Birth</label>
                      </div>
                      
                      <SearchableSelect
                        label="Marital Status"
                        value={formData.maritalStatus}
                        onChange={(val) => handleSelectChange('maritalStatus', val)}
                        options={[
                          { value: 'single', label: 'Single' },
                          { value: 'married', label: 'Married' },
                          { value: 'divorced', label: 'Divorced' },
                          { value: 'widowed', label: 'Widowed' },
                        ]}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="relative">
                      <input id="ssn" name="ssn" type="text" value={formData.ssn} onChange={handleChange} className={inputClass} placeholder="SSN" disabled={isLoading} />
                      <label htmlFor="ssn" className={labelClass}>Social Security Number</label>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Contact Information */}
                {currentStep === 2 && (
                  <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                    <div className="relative">
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="Email" disabled={isLoading} autoComplete="off" />
                      <label htmlFor="email" className={labelClass}>Email Address</label>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      
                      <PhoneCodeSelect
                        value={formData.phoneCountryCode}
                        onChange={(val) => handleSelectChange('phoneCountryCode', val)}
                        disabled={isLoading}
                        className="col-span-1"
                      />

                      <div className="relative col-span-2">
                        <input id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} className={inputClass} placeholder="Phone" disabled={isLoading} autoComplete="off" />
                        <label htmlFor="phoneNumber" className={labelClass}>Phone Number</label>
                      </div>
                    </div>
                    <div className="relative">
                      <input id="addressLine1" name="addressLine1" type="text" value={formData.addressLine1} onChange={handleChange} className={inputClass} placeholder="Address" disabled={isLoading} />
                      <label htmlFor="addressLine1" className={labelClass}>Address Line 1</label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <input id="postalCode" name="postalCode" type="text" value={formData.postalCode} onChange={handleChange} className={inputClass} placeholder="Postal" disabled={isLoading} />
                        <label htmlFor="postalCode" className={labelClass}>Postal Code</label>
                      </div>
                      
                      <CountrySelect
                        value={formData.countryOfOrigin}
                        onChange={(val) => handleSelectChange('countryOfOrigin', val)}
                        disabled={isLoading}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Security */}
                {currentStep === 3 && (
                  <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                    <div className="relative">
                      <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} className={`${inputClass} pr-12`} placeholder="Password" disabled={isLoading} autoComplete="new-password" />
                      <label htmlFor="password" className={labelClass}>Password</label>
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                        {showPassword ? '👁' : '👁‍🗨'}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="flex gap-1">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className={`h-1 flex-1 rounded ${i < (formData.password.length >= 12 ? 4 : formData.password.length >= 10 ? 3 : formData.password.length >= 8 ? 2 : 1) ? (formData.password.length >= 12 ? 'bg-green-500' : formData.password.length >= 10 ? 'bg-yellow-500' : 'bg-orange-500') : 'bg-white/10'}`} />
                        ))}
                      </div>
                    )}
                    <div className="relative">
                      <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} className={`${inputClass} pr-12`} placeholder="Confirm" disabled={isLoading} autoComplete="new-password" />
                      <label htmlFor="confirmPassword" className={labelClass}>Confirm Password</label>
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                        {showConfirmPassword ? '👁' : '👁‍🗨'}
                      </button>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm text-blue-300">
                      <p className="font-medium mb-2">Password Requirements:</p>
                      <ul className="space-y-1 text-xs">
                        <li className={formData.password.length >= 8 ? 'text-green-400' : ''}>• At least 8 characters</li>
                        <li className={/[A-Z]/.test(formData.password) ? 'text-green-400' : ''}>• One uppercase letter</li>
                        <li className={/[0-9]/.test(formData.password) ? 'text-green-400' : ''}>• One number</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {currentStep > 1 && (
                  <motion.button type="button" onClick={prevStep} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex-1 py-4 px-6 rounded-xl font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    Back
                  </motion.button>
                )}
                {currentStep < 3 ? (
                  <motion.button type="button" onClick={nextStep} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex-1 py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/25 transition-all"
                  >
                    Continue
                  </motion.button>
                ) : (
                  <motion.button type="submit" disabled={isLoading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex-1 py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 shadow-lg shadow-green-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </>
                    ) : 'Create Account'}
                  </motion.button>
                )}
              </div>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-slate-400 mt-6">
              Already have an account?{' '}
              <Link 
                href="/signin" 
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
                  'Sign in'
                )}
              </Link>
            </p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
      </footer>
    </div>
  );
}