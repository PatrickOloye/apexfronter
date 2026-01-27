

// User interface used across the application
export interface User {
  id: string;
  email: string;
  accountNumber: string;
  password?: string; // Only included for form handling, not stored in client state
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  country?: string | null;
  department?: string | null;
  createdAt?: string;
  updatedAt?: string;
  isVerified: boolean;
  resetPasswordToken?: string | null;
  verificationCode?: number | null;
  verificationCodeExpiry?: Date | null;
  resetPasswordExpire?: Date | null;
  role: 'SYSTEM_ADMIN' | 'ADMIN' | 'USER';
  username: string;
  referralCode: string;
  openingBalance: number;
  clearedBalance: number;
  totalCredits: number;
  totalDebits: number;
  pendingCredits: number;
  pendingDebits: number;
  availableBalance: number;
  loanViability: boolean;
  overdraft: boolean;
  accounts?: Account[];
  loans?: Loan[];
}


export interface Loan {
  id: string;
  amount: number;
  interestRate: number;
  term: number; // in months
  status: LoanStatus;
  approvedAt?: Date;
  disbursedAt?: Date;
  nextPaymentDue?: Date;
  totalRepaid: number;
  remainingBalance: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum LoanStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DISBURSED = 'DISBURSED',
  REPAYING = 'REPAYING',
  PAID = 'PAID',
  DEFAULTED = 'DEFAULTED',
  REJECTED = 'REJECTED'
}

// Session interface for authentication
export interface Session {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role?: string;
  };
  token: string;
}

// Form state for auth operations
export interface FormState {
  error?: Record<string, string[]>;
  message?: string;
  success?: boolean;
  user?: User | null;
  token?: string | null;
}

// Auth form data types
export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  addressLine1?: string;
  addressLine2?: string;
  phoneCountryCode?: string;
  phoneNumber?: string;
  ssn?: string;
  maritalStatus?: string;
  countryOfOrigin?: string;
  dateOfBirth?: string;
  postalCode?: string;
}

export interface SigninFormData {
  email: string;
  password: string;
}


export enum TransactionStatus {
  PENDING = "PENDING",
  CLEARED = "CLEARED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum TransactionType {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}

export enum TransactionForm {
  WIRE_DEPOSIT = "WIRE_DEPOSIT",
  WIRE_TRANSFER = "WIRE_TRANSFER",
  ONLINE_TRANSACTION = "ONLINE_TRANSACTION",
  INVESTMENT_TRANSACTION = "INVESTMENT_TRANSACTION",
  LOAN_REPAYMENT = "LOAN_REPAYMENT",
}

export enum TransactionCategory {
  WITHIN_APEX = "WITHIN_APEX",
  OUTSIDE_APEX = "OUTSIDE_APEX",
  INTERNATIONAL = "INTERNATIONAL",
  FOREX = "FOREX",
}



export interface CreateTransactionDto {
  amount: number;
  type: TransactionType;
  form: TransactionForm;
  category: TransactionCategory;
  description?: string;
  accountNumber: string;
  accountName: string;
  bankName?: string;
  narration?: string;
  isBeneficiary?: boolean;
  isInternational?: boolean;
  currency?: string;
  exchangeRate?: number;
  notes?: string;
}

export interface UpdateTransactionDto {
  status?: TransactionStatus;
  comments?: string;
}


export type Transaction = {
  id: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  form: 'WIRE_DEPOSIT' | 'WIRE_TRANSFER' | 'ONLINE_TRANSACTION' | 'INVESTMENT_TRANSACTION' | 'LOAN_REPAYMENT';
  category: 'WITHIN_APEX' | 'OUTSIDE_APEX' | 'INTERNATIONAL' | 'FOREX';
  description?: string;
  status: TransactionStatus;
  reference: string;
  createdAt: string;
  updatedAt: string;
  clearedAt?: string;
  comments?: string;
  accountNumber: string;
  accountName: string;
  bankName?: string;
  swiftIbanCode: string;
  narration: string;
  isBeneficiary: boolean;
  isInternational: boolean;
  currency: string;
  exchangeRate?: number;
};

export type TransactionStats = {
  totalTransactions: number;
  PENDING: number;
  CLEARED: number;
  FAILED: number;
  CANCELLED: number;
};

export type CreateTransactionFormData = {
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  form: 'WIRE_DEPOSIT' | 'WIRE_TRANSFER' | 'ONLINE_TRANSACTION' | 'INVESTMENT_TRANSACTION' | 'LOAN_REPAYMENT';
  category: 'WITHIN_APEX' | 'OUTSIDE_APEX' | 'INTERNATIONAL' | 'FOREX';
  description?: string;
  accountNumber: string;
  accountName: string;
  bankName?: string;
  narration?: string;
  isBeneficiary?: boolean;
  isInternational?: boolean;
  currency?: string;
  exchangeRate?: number;
};


export interface AccountHeroProps {
  accountType: string;
  description: string;
  interestRate: number | number[]; // Can be single number or array for rotating rates
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface AccountDetailsProps {
  eligibility: string[];
  benefits: string[];
  usageTips: string[];
}

export interface CallToActionProps {
  title: string;
  buttonText: string;
  buttonLink: string;
}

export interface Account {
  id: string;
  accountType: string;
  accountNumber: string;
  balance: number;
  currency: string;
  isActive: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  country?: string;
  referralCode?: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyEmailData {
  email: string;
  code: number;
}

// Profile update data
export interface ProfileUpdateData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  country?: string;
  department?: string;
}

// User stats for dashboard
export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  verifiedUsers: number;
  newUsersToday: number;
}