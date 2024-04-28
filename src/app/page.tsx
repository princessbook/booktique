import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';
import { getOrCreateUserProfile } from './auth/authAPI';
import OnboardingPage from '@/components/register/OnboardingPage';

const supabase = createClient();
const MainPage = async () => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user?.id) {
    //비로그인시 로그인페이지
    return <OnboardingPage />;
    // redirect('/login');
  } else {
    //로그인시 my-clubs
    await getOrCreateUserProfile();
    redirect('/my-clubs');
  }
  return <OnboardingPage />;
};

export default MainPage;
