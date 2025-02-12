// app/example/error.tsx
'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service if desired
    console.error('Error caught by Error Boundary:', error);
  }, [error]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Oops! Something went wrong.</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
