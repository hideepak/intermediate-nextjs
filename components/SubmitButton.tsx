'use client';

import React from 'react';
// Import the new useFormStatus hook (conceptual hook available in React 18)
import { useFormStatus } from 'react-dom'; // (This is a conceptual import for demonstration.)

export default function SubmitButton() {
  // useFormStatus provides a pending state that reflects the submission status.
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Sign Up'}
    </button>
  );
}
