import MyBookClub from '@/components/mypage/clubs/MyBookClub';
import React from 'react';
import MySentencesStore from '@/components/mypage/sentences/MySentencesStore';
import ProfileDetail from '@/components/mypage/profile/ProfileDetail';
export const dynamic = 'force-dynamic';
import { createClient } from '@/utils/supabase/server';
import LogoutButton from '@/components/mypage/profile/LogoutButton';
import Profile from '@/components/mypage/profile/Profile';
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
      <header className='bg-white sticky top-0 left-0 right-0 z-10 flex items-center mb-8 border-b-[1px] h-[58px] p-4'>
        <p className='text-[22px] font-bold text-fontTitle'>마이페이지</p>
      </header>
      <div className='px-4 mb-[78px] overflow-y-auto'>
        <div>
          <Profile userId={user.id} />
          <div className='flex flex-row mb-4 mt-6'>
            <h2 className='font-bold text-[16px] flex items-center text-fontTitle'>
              내 북클럽
            </h2>
            <Link href={'/mypage/mybookclubs'} className='ml-auto'>
              <p className=' text-[14px] font-medium text-[#B3C1CC] px-1 py-2'>
                더보기
              </p>
            </Link>
          </div>
          <MyBookClub userId={user.id} />
          <div className='flex flex-row mb-4 mt-6'>
            <h2 className='font-bold text-[16px] flex items-center text-fontTitle'>
              내가 작성한 문장
            </h2>
            <Link href={'/mypage/mysentences'} className='ml-auto'>
              <button className=' text-[14px] font-medium text-[#B3C1CC] px-1 py-2'>
                더보기
              </button>
            </Link>
          </div>
          <MySentencesStore userId={user.id} />
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};
export default MyPage;
