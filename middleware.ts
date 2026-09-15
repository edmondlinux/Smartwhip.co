import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { hostname, protocol } = url;

  // Redirect http -> https and www -> non-www (production only — local dev has no TLS cert)
  if (process.env.NODE_ENV === 'production') {
    const isHttp = protocol === 'http:';
    const isWww = hostname.startsWith('www.');

    if (isHttp || isWww) {
      url.protocol = 'https:';
      url.hostname = isWww ? hostname.slice(4) : hostname;
      return NextResponse.redirect(url, { status: 301 });
    }
  }

  const response = NextResponse.next();

  // Add Security Headers
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|txt|xml)).*)',
  ],
};
