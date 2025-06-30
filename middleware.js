// middleware.js (or middleware.ts if you're using TypeScript)

import { NextResponse } from 'next/server';
import { parseCookies } from 'cookies';  // Utility to parse cookies

export function middleware(req) {
  const { cookies } = req;  // You can access cookies directly from req.cookies

  const token = cookies['auth-token'];  // Assuming the token is stored under 'auth-token'

  if (!token) {
    // Redirect to the login page if no token is found
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If token exists, allow the request to proceed
  return NextResponse.next();
}

// Middleware to handle matching for specific paths
export const config = {
  matcher: ['/listings', ], // Apply middleware to these routes
};
