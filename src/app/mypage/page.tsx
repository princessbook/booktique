import MyBookClub from '@/components/mypage/MyBookClub';
import React from 'react';
import MySentencesStore from '@/components/mypage/MySentencesStore';
import ProfileDetail from '@/components/mypage/ProfileDetail';
export const dynamic = 'force-dynamic';
import { createClient } from '@/utils/supabase/server';
import LogoutButton from '@/components/mypage/LogoutButton';
import Profile from '@/components/mypage/Profile';
const MyPage = async () => {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }

  return (
    //head부분
    <div className='p-3 flex flex-col'>
      <header className=' flex items-center mb-6'>
        <p className='text-lg font-bold'>마이페이지</p>
      </header>
      <div>
        <Profile userId={user.id} />
        {/* <ProfileDetail userId={user.id} /> */}
        <MyBookClub userId={user.id} />
        <MySentencesStore userId={user.id} />
      </div>
      <LogoutButton />
    </div>
  );
};
export default MyPage;
