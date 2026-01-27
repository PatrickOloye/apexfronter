import { z } from "zod";


export type FormState =
  | {
    // Field-specific validation errors
    error?: {
      firstName?: string[]; // For first name field
      lastName?: string[];  // For last name field
      address1?: string[];  // For address field
      city?: string[];      // For city field
      state?: string[];     // For state field
      postalCode?: string[]; // For postal code field
      dateOfBirth?: string[]; // For date of birth field
      ssn?: string[];       // For SSN field
      email?: string[];     // For email field
      password?: string[];  // For password field
    };
    message?: string;  // A general message for the form (e.g., "Invalid credentials!")
  }
  | undefined;


export enum Role {
  SYSTEM_ADMIN = "SYSTEM_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}


export interface User {
  id: string;
  email: string;
  firstName?: string | null;  // Optional fields match Prisma schema
  lastName?: string | null;
  username: string;
  isVerified: boolean;
  role?: 'SYSTEM_ADMIN' | 'ADMIN' | 'USER';
  // Add all other fields from your Prisma User model
  phoneNumber?: string | null;
  country?: string | null;
  department?: string | null;
  openingBalance: number;
  clearedBalance: number;
  // ... include all other fields you need in the frontend
}

// Optional: Type for login/signup responses
export interface AuthResponse {
  user: User;
  accessToken: string;
}

