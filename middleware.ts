import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const deb = {
    geo: request.geo,
    ip: request.ip || request.headers.get('X-Forwarded-For'),
    agent: request.headers.get('user-agent'),
    patform: request.headers.get('sec-ch-ua-platform'),
    lang: request.headers.get('accept-language'),
    url: decodeURIComponent(request.url)
  }

  console.log('[LOGGER TRACK]', deb);
  
  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}