import React, { useEffect, useState } from 'react';
import { Tables } from '@/lib/types/supabase';
type Clubs = Tables<'clubs'>;
import { createClient } from '@/utils/supabase/server';
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
                <p className='text-center px-1 border w-12 text-sm text-white bg-subblue rounded-md'>
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
              <button>바로가기</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookClub;
