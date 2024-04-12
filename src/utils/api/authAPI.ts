import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const signInWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `http://localhost:3000/myclubinfo2`,
      queryParams: { access_type: 'offline', prompt: 'consent' }
    }
  });
};

export const kakaoLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: `http://localhost:3000/myclubinfo2`,
      queryParams: { access_type: 'offline', prompt: 'consent' }
    }
  });
  if (data) {
    return console.log('카카오 로그인 성공');
  }
  if (error) {
    return console.error('카카오 로그인 에러: ', error);
  }
};