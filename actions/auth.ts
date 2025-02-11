// actions/auth.ts
'use server';

import { z } from 'zod';

// Define the Zod schema for our sign‑up data
const authSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
});

// Define the type for the action's response
type ActionResponse = {
  errors: Record<string, string[]> | null;
  formState: {
    success: boolean;
    message?: string;
  };
};

// The server action for registering a user
export async function registerUser(prevState: unknown, formData: FormData): Promise<ActionResponse> {
  // Extract values from the FormData object
  const email = formData.get('email')?.toString() || '';
  const password = formData.get('password')?.toString() || '';

  // Validate the input using Zod
  const result = authSchema.safeParse({ email, password });
  if (!result.success) {
    // Return the errors in a structured format
    return {
      errors: result.error.flatten().fieldErrors,
      formState: { success: false },
    };
  }

  // Here you would normally register the user (e.g., save to your database)
  // For demonstration, assume registration is always successful:
  return {
    errors: null,
    formState: { success: true, message: 'User registered successfully!' },
  };
}
