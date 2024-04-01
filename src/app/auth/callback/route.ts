import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get('code');

  if (code) {
    // 클라이언트에서 온 request에서 code가 있다면 쿠키를 만들고 세션으로 바꾸기
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }
  // 로그인이 끝나면(쎄션 exchange 성공 or 실패 후) 다시 클라이언트 페이지로 돌아가도록
  return NextResponse.redirect(requestUrl.origin);
};
