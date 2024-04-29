import { createClient } from '@/utils/supabase/client';
// import { getCallbackURL } from '../getCallBackURL';

const supabase = createClient();

export const signInWithSocialLogin = async (provider: 'google' | 'kakao') => {
  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/auth/callback`
    }
  });
};

export const signInCheckUsers = async () => {
  const { data: profileUsers } = await supabase
    .from('profiles')
    .select('email');

  return profileUsers;
};
