import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data } = await supabase.auth.getSession();
  console.log(data);
  console.log('123');
  if (
    !data.session &&
    !req.nextUrl.pathname.startsWith('/login') &&
    !(req.nextUrl.pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  if (data.session && req.nextUrl.pathname.startsWith('/login')) {
    console.log(data);
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths "except for" the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)'
  ]
};
