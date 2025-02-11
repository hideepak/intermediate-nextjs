// components/SubmitButton.tsx
'use client';

import React from 'react';
// Import useFormStatus (make sure your React version supports it)
import { useFormStatus } from 'react-dom';

export default function SubmitSigninButton() {
  // useFormStatus returns an object containing the pending state.
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Signing in...' : 'Sign In'}
    </button>
  );
}
