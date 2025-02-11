// components/SignupForm.tsx
'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUser } from '@/actions/auth';

// Use the same schema as in the server action
const authSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
});

// Create a TypeScript type for our form values based on the schema
type FormValues = z.infer<typeof authSchema>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(authSchema),
  });

  // onSubmit handler that converts form data to FormData and calls the server action
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Create a FormData object and append form values
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    // Call the server action and await its response
    const response = await registerUser(null, formData);

    // If there are errors returned from the server action, use setError to show them in the form
    if (response.errors) {
      for (const [field, messages] of Object.entries(response.errors)) {
        setError(field as keyof FormValues, {
          type: 'server',
          message: messages.join(', '),
        });
      }
    } else {
      // Optionally, handle successful registration (e.g., reset the form or display a success message)
      console.log(response.formState.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" placeholder="Enter your email" {...register('email')} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" placeholder="Enter your password" {...register('password')} />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Sign Up'}
      </button>
    </form>
  );
}
