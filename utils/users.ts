// utils/users.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserFromToken } from './authTools'; // Your helper to decode/verify JWTs
import { COOKIENAME } from '@/config'; // Your constant for the cookie name
import { cache } from 'react';

/**
 * Define a TypeScript interface for the authenticated user.
 */
export interface User {
  id: string;
  createdAt: string;
  email: string;
  // Add any additional properties you expect to have on your user object
}

/**
 * Retrieves the current authenticated user based on the JWT stored in cookies.
 * If no token is found or token verification fails, the function redirects to the sign-in page.
 *
 * @returns {Promise<User>} A promise that resolves to the authenticated user object.
 */
export const getCurrentUser = cache(
  async (): Promise<User> => {
  // Retrieve the token from cookies using Next.js's headers API.
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get(COOKIENAME);

  // If there is no token, immediately redirect to the sign-in route.
  if (!tokenCookie) {
    redirect('/signin');
  }

  // const token = tokenCookie!.value; // Non-null assertion as we know tokenCookie exists here

  let user: User | undefined = undefined;
  try {
    // Decode and verify the token. This function should throw an error
    // if the token is invalid or expired.
    user = await getUserFromToken(tokenCookie);
  } catch (error) {
    console.error('Error verifying user token:', error);
    // Redirect if token verification fails.
    redirect('/signin');
  }

  // If user information is not obtained, redirect to sign-in.
  if (!user) {
    redirect('/signin');
  }

  return user;
});
