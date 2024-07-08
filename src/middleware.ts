import { chain } from '@/utils/middlewares/chain';
import { authToken } from '@/utils/middlewares/authToken';
import { protectRoute } from '@/utils/middlewares/protectRoute';

//middleware체인: 여러단계의 요청처리를 분할해서 chain으로 관리를합니다
export default chain([authToken, protectRoute]);

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
};
