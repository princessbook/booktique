import React from 'react';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import AllMyBookClubs from '@/components/mypage/clubs/AllMyBookClubs';
const MyBookClubsPage = async () => {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }
  return (
    <div>
      <div className='w-full flex-row sticky top-0 left-0 right-0 z-10 flex items-center mb-6 border-b-2 h-[58px] p-4 bg-white'>
        <Link href='/mypage'>
          <svg
            width='23'
            height='24'
            viewBox='0 0 23 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M14.4546 18.9439L7.56158 12.087L14.6059 5.00591'
              stroke='#292929'
              strokeWidth='1.6'
              strokeLinecap='round'
            />
          </svg>
        </Link>
        <p className='items-center flex-grow text-center font-bold text-[17px] mr-4'>
          내 북클럽
        </p>
      </div>
      <div className='p-4 mb-[78px] overflow-y-auto'>
        <AllMyBookClubs userId={user.id} />
      </div>
    </div>
  );
};

export default MyBookClubsPage;
