// actions/auth.ts
'use server';

import { z } from 'zod';
import { db } from '@/db/db'
import { users } from '@/db/schema'
import jwt from 'jsonwebtoken'
import { eq } from 'drizzle-orm'
import { COOKIENAME, JWT_SECRET } from '@/config'
import { cookies } from 'next/headers'

// Define the Zod schema for our sign‑up data
const authSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
});

// Define the Zod schema for sign‑in
const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

// Define the type for the action's response
export type ActionResponse = {
  errors: Record<string, string[]> | null;
  formState: {
    success: boolean;
    message?: string;
    isSubmitting: boolean;

  };
};

// The server action for registering a user
export async function registerUser(state: ActionResponse, formData: FormData): Promise<ActionResponse> {
  // Extract values from the FormData object
  const email = formData.get('email')?.toString() || '';
  const password = formData.get('password')?.toString() || '';

  // Validate the input using Zod
  const result = authSchema.safeParse({ email, password });
  if (!result.success) {
    // Return the errors in a structured format
    return {
      errors: result.error.flatten().fieldErrors,
      formState: { success: false, isSubmitting: false },
    };
  }

  // Here you would normally register the user (e.g., save to your database)
  try {
    await db.insert(users).values({
      email,
      password,
    });
  } catch (error: any) {
    console.error('Error inserting user:', error);
    return {
      errors: { general: ['Error registering user.'] },
      formState: { success: false, isSubmitting: false },
    };
  }
  // For demonstration, assume registration is always successful:
  return {
    errors: null,
    formState: { success: true, message: 'User registered successfully!', isSubmitting: false },
  };
}

/**
 * signinUser is the server action bound to the sign‑in form.
 * It validates the input with Zod and (optionally) checks the credentials.
 */
export async function signinUser(
  state: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  // Extract values from the form data
  const email = formData.get('email')?.toString() || '';
  const password = formData.get('password')?.toString() || '';

  // Validate the input with Zod
  const result = signInSchema.safeParse({ email, password });
  if (!result.success) {
    // Return validation errors in a structured format
    return {
      errors: result.error.flatten().fieldErrors,
      formState: { success: false, isSubmitting: false },
    };
  }

  // OPTIONAL: Check the credentials against your database
   const resultDb = await db.select().from(users).where(eq(users.email, email));
   const user = resultDb.length > 0 ? resultDb[0] : null;
   if (!user || user.password !== password) {
     return {
      errors: { general: ['Invalid email or password'] },
      formState: { success: false, isSubmitting: false },
    };
   }

  // Generate a JWT token containing essential user information.
  // The token is set to expire in 1 hour.
  const token = jwt.sign(
                            {
                              id: user.id,
                              email: user.email
                            },
                            JWT_SECRET,
                            {
                              expiresIn: '1h',
                            }
                          );

  // Set the JWT token in a secure HTTP-only cookie.
  // Using next/headers' mutable cookies API allows you to set the cookie in a server action.
  cookies().set({
    name: COOKIENAME,
    value: token,
    path: '/', // Cookie available on all routes.
    httpOnly: true, // Not accessible from client-side JavaScript.
    secure: process.env.NODE_ENV === 'production', // Only transmit over HTTPS in production.
    sameSite: 'strict', // Helps prevent CSRF.
    maxAge: 3600, // 1 hour expressed in seconds.
  });

  // Optionally, you can perform a redirect here instead of returning a response.
  // For example, redirect('/dashboard');

  // For demonstration purposes, we assume the sign‑in is successful.
  return {
    errors: null,
    formState: {
      success: true,
      message: 'User signed in successfully!',
      isSubmitting: false,
    },
  };
}
