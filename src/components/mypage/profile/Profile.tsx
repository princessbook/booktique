'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tables } from '@/lib/types/supabase';
type Profile = Tables<'profiles'>;
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/utils/userAPIs/Fns';
import { createClient } from '@/utils/supabase/client';
import useRealtimePostgresChanges from '@/hooks/useRealtimePostgresChanges';
import { Skeleton } from '@nextui-org/react';
const Profile = ({ userId }: { userId: string | null }) => {
  const {
    data: profiles,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['profiles'],
    queryFn: getUserProfile
  });
  if (isLoading) {
    return (
      <div className='max-w-[300px] w-full flex items-center gap-3'>
        <div>
          <Skeleton className='flex rounded-full w-12 h-12' />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <Skeleton className='h-3 w-3/5 rounded-lg' />
          <Skeleton className='h-3 w-4/5 rounded-lg' />
        </div>
      </div>
    );
  }
  const userProfile = profiles?.find((profile) => profile.id === userId);

  return (
    <div className='flex flex-col w-full bg-[#F6F7F9] rounded-[10px] p-2'>
      <div className='flex flex-col p-2'>
        <div className='flex flex-row'>
          <div className='flex justify-center align-middle w-[56px] h-[56px] max-w-full max-h-auto rounded-full'>
            {userProfile?.photo_URL ? (
              <img
                src={userProfile.photo_URL}
                alt='미리보기'
                width={96}
                height={96}
                className='rounded-full object-cover w-[56px] h-[56px]'
              />
            ) : (
              <Image
                src='/defaultImage.svg'
                alt='프로필사진 없음'
                width={96}
                height={96}
                className='rounded-full object-cover'
              />
            )}
          </div>
          <div className='flex items-center ml-2'>
            <p className='text-[18px] font-bold text-fontTitle'>
              {userProfile?.display_name}
            </p>
          </div>
        </div>

        <div className='mt-4 text-[14px] text-fontMain opacity-80'>
          <p>{userProfile?.introduction}</p>
        </div>

        <div className='mt-4 mb-1'>
          <Link href={`/mypage/${userId}`}>
            <button className=' border-[#B3C1CC] w-full text-[#8A9DB3] text-[14px] border h-[35px] rounded-full '>
              프로필 수정
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
