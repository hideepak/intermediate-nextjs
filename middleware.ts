import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware Function
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token');

  // Check if the user is authenticated
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next(); // Allow request if authenticated
}

// Apply middleware only to these routes
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
