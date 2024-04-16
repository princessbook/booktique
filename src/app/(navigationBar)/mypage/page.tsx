import MyBookClub from '@/components/mypage/MyBookClub';
import React from 'react';
import MySentencesStore from '@/components/mypage/MySentencesStore';
import ProfileDetail from '@/components/mypage/ProfileDetail';
export const dynamic = 'force-dynamic';
import { createClient } from '@/utils/supabase/server';
import LogoutButton from '@/components/mypage/LogoutButton';
import Profile from '@/components/mypage/Profile';
import Link from 'next/link';
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
    <div className='flex flex-col '>
      <header className='bg-white sticky top-0 left-0 right-0 z-10 flex items-center mb-6 border-b-2 h-[58px] p-4'>
        <p className='text-[22px] font-bold'>마이페이지</p>
      </header>
      <div className='p-4 mb-[78px] overflow-y-auto'>
        <div>
          <Profile userId={user.id} />
          <div className='flex flex-row mb-4 mt-6'>
            <h2 className='font-bold text-[16px]'>내 북클럽</h2>
            <Link href={'/mypage/mybookclubs'} className='ml-auto'>
              <p className=' text-[14px] font-medium text-[#B3C1CC]'>더보기</p>
            </Link>
          </div>
          <MyBookClub userId={user.id} />
          <MySentencesStore userId={user.id} />
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};
export default MyPage;
