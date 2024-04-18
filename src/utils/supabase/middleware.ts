import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          const cookieOptions = {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60, // 24시간 (24 hours * 60 minutes * 60 seconds)
            ...options
          };
          request.cookies.set({
            name,
            value,
            ...cookieOptions
          });
          response = NextResponse.next({
            request: {
              headers: request.headers
            }
          });
          response.cookies.set({
            name,
            value,
            ...cookieOptions
          });
        },
        remove(name: string, options: CookieOptions) {
          const cookieOptions = {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 0, // 즉시 만료
            ...options
          };

          request.cookies.set({
            name,
            value: '',
            ...cookieOptions
          });
          response = NextResponse.next({
            request: {
              headers: request.headers
            }
          });
          response.cookies.set({
            name,
            value: '',
            ...cookieOptions
          });
        }
      }
    }
  );

  await supabase.auth.getUser();
  console.log('진짜뭔데');

  return response;
}
