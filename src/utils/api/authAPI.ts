import { createClient } from '@/utils/supabase/client';
import { getCallbackURL } from '../getCallBackURL';

const supabase = createClient();

export const signInWithSocialLogin = async (provider: 'google' | 'kakao') => {
  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/auth/callback`
    }
  });
};

// export const signInWithGoogle = async () => {
//   await supabase.auth.signInWithOAuth({
//     provider: 'google',
//     options: {
//       redirectTo: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/auth/callback`,
//       queryParams: {
//         access_type: 'offline',
//         prompt: 'consent'
//       }
//     }
//   });
// };

// export const kakaoLogin = async () => {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'kakao',
//     options: {
//       redirectTo: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/auth/callback`
//     }
//   });
//   if (data) {
//     return console.log('카카오 로그인 성공');
//   }
//   if (error) {
//     return console.error('카카오 로그인 에러: ', error);
//   }
// };
