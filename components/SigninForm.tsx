// components/SigninForm.tsx
'use client';

import React from 'react';
// This is a conceptual hook that binds server actions to form state
import { useFormState } from 'react-dom';
import { signinUser, ActionResponse } from '@/actions/auth';
import SubmitSigninButton from '@/components/SubmitSigninButton'

// Define an initial state matching the ActionResponse structure.
const initialState: ActionResponse = {
  errors: null,
  formState: {
    success: false,
    isSubmitting: false,
  },
};

export default function SigninForm() {
  // useFormState takes the server action and an initial state, and returns a tuple:
  // [formState, action]. The action function is passed to the form’s action attribute.
  const [formState, action] = useFormState(signinUser, initialState);

  // Optionally, you could add a ref to the form element if you want to clear it on success:
  // const formRef = React.useRef<HTMLFormElement>(null);
  // React.useEffect(() => {
  //   if (formState.formState.success && formRef.current) {
  //     formRef.current.reset();
  //   }
  // }, [formState.formState.success]);

  return (
    <form action={action} /* ref={formRef} */>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
        />
        {formState.errors?.email && (
          <p style={{ color: 'red' }}>{formState.errors.email.join(', ')}</p>
        )}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        {formState.errors?.password && (
          <p style={{ color: 'red' }}>{formState.errors.password.join(', ')}</p>
        )}
      </div>
      <SubmitSigninButton />
      {formState.formState.success && formState.formState.message && (
        <p style={{ color: 'green' }}>{formState.formState.message}</p>
      )}
    </form>
  );
}
