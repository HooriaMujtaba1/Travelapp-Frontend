// middleware.js (at root of project)
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('accessToken')?.value;
  const pathname = request.nextUrl.pathname;

 // console.log('🔥 Middleware triggered on:', pathname);
 // console.log('✅ Token exists?', !!token);

  const isLogin = pathname === '/login';

  // Redirect unauthenticated users to /login
  //if (!token && !isLogin) {
  //  return NextResponse.redirect(new URL('/login', request.url));
 // }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'], // applies to all pages except assets
};
