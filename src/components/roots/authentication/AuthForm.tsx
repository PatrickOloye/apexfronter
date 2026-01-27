import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import countryList from 'react-select-country-list';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SignupFormData, SigninFormData } from '@/libs/server-actions/types';

// Type for the form mode
type FormMode = 'signin' | 'signup';

// Props interface for our component
interface AuthFormProps {
  mode: FormMode;
  onSubmit: (data: SignupFormData | SigninFormData) => void;
  isSubmitting?: boolean;
}

// Define schemas outside the component
const signupSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
  addressLine1: z.string().min(5, { message: 'Address is required' }),
  addressLine2: z.string().optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  phoneCountryCode: z.string(),
  phoneNumber: z.string().regex(/^\d{6,15}$/, { message: 'Phone number must be between 6-15 digits' }),
  ssn: z.string(),
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed']),
  countryOfOrigin: z.string(),
  dateOfBirth: z.date({
    required_error: 'Date of birth is required',
    invalid_type_error: 'Invalid date format',
  }).refine((date) => {
    const today = new Date();
    const eighteenYearsAgo = new Date(today);
    eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
    return date <= eighteenYearsAgo;
  }, { message: 'You must be at least 18 years old' }),
  postalCode: z.string().regex(/^\d{5}(-\d{4})?$/, { message: 'Invalid postal code format' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string().min(8, { message: 'Confirm password is required' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const signinSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

// Type helpers
type SignupValues = z.infer<typeof signupSchema>;
type SigninValues = z.infer<typeof signinSchema>;

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, isSubmitting = false }) => {
  // Get countries for dropdown
  const countries = countryList().getData();

  // Form setup based on mode
  const isSignup = mode === 'signup';

  // Define a type-safe hook instantiation based on form mode
  const signupForm = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      email: '',
      phoneCountryCode: '+1', // Default to US
      phoneNumber: '',
      ssn: '',
      maritalStatus: 'single' as const,
      countryOfOrigin: 'US',
      dateOfBirth: undefined,
      postalCode: '',
      password: '',
      confirmPassword: '',
    }
  });

  const signinForm = useForm<SigninValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  // Use the appropriate form based on mode
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = isSignup ? signupForm : signinForm;

  // Marital status options
  const maritalStatusOptions = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' },
  ];

  // Country code options (just a sample)
  const countryCodes = [
    { value: '+1', label: 'USA (+1)' },
    { value: '+44', label: 'UK (+44)' },
    { value: '+91', label: 'India (+91)' },
    // Add more as needed
  ];

  // Handle form submission with type safety
  const processSignupSubmit = (data: SignupValues) => {
    // Format date for API
    const formattedData = {
      ...data,
      dateOfBirth: format(data.dateOfBirth, 'yyyy-MM-dd')
    };

    // Pass data to parent component's onSubmit handler
    onSubmit(formattedData as SignupFormData);

    // Reset form after successful submission
    signupForm.reset();
  };

  const processSigninSubmit = (data: SigninValues) => {
    // Pass data to parent component's onSubmit handler
    onSubmit(data as SigninFormData);

    // Reset form after successful submission
    signinForm.reset();
  };

  // Improved input style
  const inputClass = "mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 bg-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const errorClass = "mt-1 text-sm text-red-600";
  const selectClass = "mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 bg-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150";

  return (
    <div className="w-full">
      <form
        onSubmit={
          isSignup
            ? signupForm.handleSubmit(processSignupSubmit)
            : signinForm.handleSubmit(processSigninSubmit)
        }
        className="space-y-6"
      >
        {isSignup && (
          <>
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className={labelClass}>First Name</label>
                <input
                  id="firstName"
                  type="text"
                  {...signupForm.register('firstName')}
                  className={inputClass}
                  disabled={isSubmitting}
                />
                {signupForm.formState.errors.firstName && (
                  <p className={errorClass}>{signupForm.formState.errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className={labelClass}>Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  {...signupForm.register('lastName')}
                  className={inputClass}
                  disabled={isSubmitting}
                />
                {signupForm.formState.errors.lastName && (
                  <p className={errorClass}>{signupForm.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="addressLine1" className={labelClass}>Address Line 1</label>
              <input
                id="addressLine1"
                type="text"
                {...signupForm.register('addressLine1')}
                className={inputClass}
                disabled={isSubmitting}
              />
              {signupForm.formState.errors.addressLine1 && (
                <p className={errorClass}>{signupForm.formState.errors.addressLine1.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="addressLine2" className={labelClass}>Address Line 2 (Optional)</label>
              <input
                id="addressLine2"
                type="text"
                {...signupForm.register('addressLine2')}
                className={inputClass}
                disabled={isSubmitting}
              />
            </div>

            {/* SSN and Date of Birth - Side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ssn" className={labelClass}>Social Security Number</label>
                <input
                  id="ssn"
                  type="text"
                  {...signupForm.register('ssn')}
                  className={inputClass}
                  placeholder="XXX-XX-XXXX"
                  disabled={isSubmitting}
                />
                {signupForm.formState.errors.ssn && (
                  <p className={errorClass}>{signupForm.formState.errors.ssn.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="dateOfBirth" className={labelClass}>Date of Birth</label>
                <Controller
                  control={signupForm.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <DatePicker
                      id="dateOfBirth"
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      dateFormat="MM/dd/yyyy"
                      showYearDropdown
                      yearDropdownItemNumber={100}
                      scrollableYearDropdown
                      maxDate={new Date()}
                      className={inputClass}
                      placeholderText="Select date of birth"
                      disabled={isSubmitting}
                    />
                  )}
                />
                {signupForm.formState.errors.dateOfBirth && (
                  <p className={errorClass}>{signupForm.formState.errors.dateOfBirth.message}</p>
                )}
              </div>
            </div>

            {/* Phone Number and Marital Status - Side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="phoneCountryCode" className={labelClass}>Code</label>
                  <select
                    id="phoneCountryCode"
                    {...signupForm.register('phoneCountryCode')}
                    className={selectClass}
                    disabled={isSubmitting}
                  >
                    {countryCodes.map((code) => (
                      <option key={code.value} value={code.value}>{code.label}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label htmlFor="phoneNumber" className={labelClass}>Phone Number</label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    {...signupForm.register('phoneNumber')}
                    className={inputClass}
                    placeholder="Enter phone number"
                    disabled={isSubmitting}
                  />
                  {signupForm.formState.errors.phoneNumber && (
                    <p className={errorClass}>{signupForm.formState.errors.phoneNumber.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="maritalStatus" className={labelClass}>Marital Status</label>
                <select
                  id="maritalStatus"
                  {...signupForm.register('maritalStatus')}
                  className={selectClass}
                  disabled={isSubmitting}
                >
                  {maritalStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {signupForm.formState.errors.maritalStatus && (
                  <p className={errorClass}>{signupForm.formState.errors.maritalStatus.message}</p>
                )}
              </div>
            </div>

            {/* Postal Code and Email - Side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="postalCode" className={labelClass}>Postal Code</label>
                <input
                  id="postalCode"
                  type="text"
                  {...signupForm.register('postalCode')}
                  className={inputClass}
                  placeholder="12345 or 12345-6789"
                  disabled={isSubmitting}
                />
                {signupForm.formState.errors.postalCode && (
                  <p className={errorClass}>{signupForm.formState.errors.postalCode.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email</label>
                <input
                  id="email"
                  type="email"
                  {...signupForm.register('email')}
                  className={inputClass}
                  disabled={isSubmitting}
                />
                {signupForm.formState.errors.email && (
                  <p className={errorClass}>{signupForm.formState.errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Country of Origin */}
            <div>
              <label htmlFor="countryOfOrigin" className={labelClass}>Country of Origin</label>
              <select
                id="countryOfOrigin"
                {...signupForm.register('countryOfOrigin')}
                className={selectClass}
                disabled={isSubmitting}
              >
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>{country.label}</option>
                ))}
              </select>
              {signupForm.formState.errors.countryOfOrigin && (
                <p className={errorClass}>{signupForm.formState.errors.countryOfOrigin.message}</p>
              )}
            </div>
          </>
        )}

        {/* Email - Only for signin mode since we moved it above for signup */}
        {!isSignup && (
          <div>
            <label htmlFor="email" className={labelClass}>Email</label>
            <input
              id="email"
              type="email"
              {...signinForm.register('email')}
              className={inputClass}
              disabled={isSubmitting}
            />
            {signinForm.formState.errors.email && (
              <p className={errorClass}>{signinForm.formState.errors.email.message}</p>
            )}
          </div>
        )}

        {/* Password - Common for both forms but handled differently */}
        <div>
          <label htmlFor="password" className={labelClass}>Password</label>
          <input
            id="password"
            type="password"
            {...(isSignup ? signupForm.register('password') : signinForm.register('password'))}
            className={inputClass}
            disabled={isSubmitting}
          />
          {isSignup ?
            (signupForm.formState.errors.password && (
              <p className={errorClass}>{signupForm.formState.errors.password.message}</p>
            )) :
            (signinForm.formState.errors.password && (
              <p className={errorClass}>{signinForm.formState.errors.password.message}</p>
            ))
          }
        </div>

        {/* Confirm Password - Only for signup */}
        {isSignup && (
          <div>
            <label htmlFor="confirmPassword" className={labelClass}>Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              {...signupForm.register('confirmPassword')}
              className={inputClass}
              disabled={isSubmitting}
            />
            {signupForm.formState.errors.confirmPassword && (
              <p className={errorClass}>{signupForm.formState.errors.confirmPassword.message}</p>
            )}
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition duration-150"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isSignup ? 'Creating Account...' : 'Signing In...'}
              </>
            ) : (
              isSignup ? 'Sign Up' : 'Login'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;