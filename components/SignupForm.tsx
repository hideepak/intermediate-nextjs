// components/SignupForm.tsx
'use client';

import React from 'react';
// Assume that useFormState is our React Hook Form–based hook for handling form state
import { useFormState } from 'react-dom'; // (This is a conceptual hook in this context.)
import { registerUser, ActionResponse } from '@/actions/auth';

// Define the initial state matching ActionResponse.
const initialState: ActionResponse = {
  errors: null,
  formState: {
    success: false,
    isSubmitting: false,
  }
};

export default function SignupForm() {
  // useFormState takes the server action and an initial state.
  // It returns [formState, action], where action is bound to the form.
  const [formState, action] = useFormState(registerUser, initialState);

  return (
    <form action={action}>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" name="email" placeholder="Enter your email" />
        {formState.errors?.email && (
          <p style={{ color: 'red' }}>{formState.errors.email.join(', ')}</p>
        )}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" name="password" placeholder="Enter your password" />
        {formState.errors?.password && (
          <p style={{ color: 'red' }}>{formState.errors.password.join(', ')}</p>
        )}
      </div>
      <button type="submit" disabled={formState.formState.isSubmitting}>
        {formState.formState.isSubmitting ? 'Submitting...' : 'Sign Up'}
      </button>
      {formState.formState.success && formState.formState.message && (
        <p style={{ color: 'green' }}>{formState.formState.message}</p>
      )}
    </form>
  );
}
