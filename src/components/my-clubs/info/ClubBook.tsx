'use client';
import React, { useState, useEffect } from 'react';
import { Tables } from '@/lib/types/supabase';
type Club = Tables<'clubs'>;
import Image from 'next/image';
import ProgressBar from '@/app/(navigationBar)/readbook/ProgressBar';
import { createClient } from '@/utils/supabase/client';
import { CLUB_ACTIVITIES_TABLE } from '@/common/constants/tableNames';
import { useQuery } from '@tanstack/react-query';
import { getUserId } from '@/utils/userAPIs/authAPI';

const ClubBook = ({ club }: { club: Club | null }) => {
  const [percentage, setPercentage] = useState<number>(0);
  //승희 개선
  const {
    data: user,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['user_id'],
    queryFn: getUserId,
    staleTime: 1000 * 5
  });
  useEffect(() => {
    const fetchUserAndProgress = async () => {
      const supabase = createClient();
      // const {
      //   data: { user }
      // } = await supabase.auth.getUser();

      if (user && club) {
        const { data: activity, error: activityError } = await supabase
          .from(CLUB_ACTIVITIES_TABLE)
          .select('progress')
          .eq('user_id', user)
          .eq('club_id', club.id);

        if (activity && !activityError && activity.length > 0) {
          setPercentage(activity[0].progress || 0);
        } else {
          // activity가 null이거나 비어 있다면 기본값 0으로 설정
          setPercentage(0);
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
      <div className='mt-4 relative bg-[#EDEEF2] w-[343px] h-[320px] rounded-xl flex flex-col items-center justify-center '>
        <div className='flex justify-center items-center w-[156px] max-h-[244px] mb-4'>
          <Image
            src={club.book_cover || '/readbook_yet_read.png'}
            alt='책 사진'
            width={100}
            height={100}
            priority={true}
            className='w-[156px] max-h-[244px]'
          />
        </div>
        <div className='absolute -bottom-3 '>
          <ProgressBar progress={percentage} backgroundColor='white' />
        </div>
      </div>
      <div className='flex flex-col w-full mt-4'>
        <p className='font-bold text-[14px] text-fontMain'>{club.book_title}</p>
        <p className='text-[12px] text-fontMain font-medium'>
          {club.book_author}
        </p>
        <p className='text-fontMain text-opacity-60 text-[12px] font-medium'>
          {club.book_category}
        </p>
      </div>
    </div>
  );
};

export default ClubBook;
