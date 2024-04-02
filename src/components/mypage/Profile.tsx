import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useEffect } from 'react';
import { Tables } from '@/lib/types/supabase';
import { getUserProfile } from '@/lib/api/Fns';
import { getUserId } from '@/lib/api/authAPI';
import { useQuery } from '@tanstack/react-query';
import ProfileDetail from './ProfileDetail';
type Profile = Tables<'profiles'>;

const Profile = async () => {
  const userId = await getUserId();
  const {
    data: profiles,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getUserProfile
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  const userProfile = profiles?.find((profile) => profile.id === userId);
  return (
    <div className='p-4 bg-bookwhite w-[350px] h-24'>
      <div className='flex items-center'>
        <div className='w-12 h-12 bg-gray-300 rounded-full'>
          <Image
            src={userProfile?.photo_URL || '/default_img.png'}
            alt='프로필이미지'
            width={64}
            height={64}
            className='rounded-full'
            priority
          />
        </div>
        <p className='text-lg font-semibold'>{userProfile?.display_name}</p>
      </div>
      <div className='flex justify-end'>
        <button className='border rounded-md'>프로필 상세보기</button>
      </div>
      <ProfileDetail userProfile={userProfile} />
    </div>
  );
};

export default Profile;
