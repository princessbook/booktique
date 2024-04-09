import React, { useEffect, useState } from 'react';
import { Tables } from '@/lib/types/supabase';
type Clubs = Tables<'clubs'>;
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
const MyBookClub = async ({ userId }: { userId: string }) => {
  const supabase = createClient();

  const { data } = await supabase
    .from('members')
    .select('club_id')
    .eq('user_id', userId);
  const clubIds = data?.map((row: any) => row.club_id) || [];
  if (clubIds.length === 0) {
    return [];
  }
  const { data: clubData } = await supabase
    .from('clubs')
    .select('*')
    .in('id', clubIds);

  return (
    <div className='mt-6'>
      <div className='flex flex-row mb-4'>
        <h2 className='font-bold'>내 북클럽</h2>
        <p className='ml-auto'>더보기</p>
      </div>

      <ul>
        {clubData?.map((club) => (
          <li
            key={club.id}
            className='bg-[#F6F7F9] rounded-lg p-4 mt-2 flex flex-row items-center'>
            <div className='flex flex-col'>
              {club.archive ? (
                <p className='text-center w-[37px] h-[17px] px-1 border text-[10px] text-white bg-subblue rounded-md'>
                  진행중
                </p>
              ) : (
                <p className='text-center px-1 border w-12 text-sm text-white bg-[#B3C1CC] rounded-md'>
                  종료
                </p>
              )}
              {club.name}
            </div>

            <div className='ml-auto'>
              <Link href={'/'}>
                <svg
                  width='22'
                  height='22'
                  viewBox='0 0 22 22'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M7.56294 4.03125L14.4379 10.9062L7.375 17.9688'
                    stroke='#B3C1CC'
                    strokeWidth='1.6'
                    strokeLinecap='round'
                  />
                </svg>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookClub;
