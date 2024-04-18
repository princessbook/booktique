import { chain } from '@/utils/middlewares/chain';
import { authToken } from '@/utils/middlewares/authToken';
import { protectRoute } from '@/utils/middlewares/protectRoute';

//middleware체인: 여러단계의 요청처리를 분할해서 chain으로 관리를합니다
// export default chain([authToken, protectRoute]);
import { type NextRequest } from 'next/server';
import { updateSession } from './utils/middlewares/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
};
