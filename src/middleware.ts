import { chain } from '@/utils/middlewares/chain';
import { authToken } from '@/utils/middlewares/authToken';
import { protectRoute } from '@/utils/middlewares/protectRoute';

export default chain([authToken, protectRoute]);

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
