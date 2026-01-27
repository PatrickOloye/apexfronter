import { z } from 'zod';

export interface FormState {
  error?: {
    [key: string]: string[] | undefined;
  };
  message?: string;
}

export interface SessionUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
}

export interface Session {
  user: SessionUser;
  token: string;
}

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  phoneCountryCode: z.string().optional(),
  phoneNumber: z.string().optional(),
  ssn: z.string().optional(),
  maritalStatus: z.string().optional(),
  countryOfOrigin: z.string().optional(),
  dateOfBirth: z.string().optional(),
  postalCode: z.string().optional()
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;

export function authFormSchema(mode: "sign-in" | "sign-up") {
  return mode === "sign-up" ? signUpSchema : signInSchema;
}