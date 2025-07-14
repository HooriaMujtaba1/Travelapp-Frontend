// middleware.js
import { NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/login', '/register', '/_next', '/api'];

export function middleware(req) {
  const { pathname } = req.nextUrl;
  console.log("⚡ Middleware triggered:", req.nextUrl.pathname);
  console.log("🍪 Token from cookies:", req.cookies.get('accessToken'));


  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = req.cookies.get('accessToken');
  if (!token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/listings/:path*', '/bookings/:path*'],
};
