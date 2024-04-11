import React, { useState, useEffect } from 'react';
import { Tables } from '@/lib/types/supabase';
type Club = Tables<'clubs'>;
import Image from 'next/image';
import ProgressBar from '@/app/readbook/ProgressBar';
import { createClient } from '@/utils/supabase/client';
import { CLUB_ACTIVITIES_TABLE } from '@/common/constants/tableNames';

const ClubBook = ({ club }: { club: Club | null }) => {
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    const fetchUserAndProgress = async () => {
      const supabase = createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user && club) {
        const { data: activity, error: activityError } = await supabase
          .from(CLUB_ACTIVITIES_TABLE)
          .select('progress')
          .eq('user_id', user.id)
          .eq('club_id', club.id)
          .single();

        if (activity && !activityError) {
          setPercentage(activity.progress || 0);
        }
      }
    };

    fetchUserAndProgress();
  }, [club]);

  if (!club) {
    return null;
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='bg-[#EEEFF3] w-[343px] h-[320px] rounded-xl flex flex-col items-center justify-center '>
        <Image
          src={club.book_cover || '/booktiquereadblue.png'}
          alt='책 사진'
          width={100}
          height={100}
          priority={true}
          className='w-[156px] h-[244px]'
        />

        <ProgressBar progress={percentage} backgroundColor='white' />
      </div>
      <div className='flex flex-col w-full mt-4'>
        <p className='font-bold text-[14px] text-[#3F3E4E]'>
          {club.book_title}
        </p>
        <p className='text-[12px] text-[#3F3E4E] font-medium'>
          {club.book_author}
        </p>
        <p className='text-[#3F3E4E] text-[12px]'>{club.book_category}</p>
      </div>
    </div>
  );
};

export default ClubBook;
