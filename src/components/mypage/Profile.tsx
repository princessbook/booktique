'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tables } from '@/lib/types/supabase';
import ProfileDetail from './ProfileDetail';
type Profile = Tables<'profiles'>;
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/utils/userAPIs/Fns';
const Profile = ({ userId }: { userId: string | null }) => {
  const {
    data: profiles,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['profiles'],
    queryFn: getUserProfile
  });
  const userProfile = profiles?.find((profile) => profile.id === userId);
  return (
    <div className='flex flex-col w-full bg-[#F6F7F9] rounded-md p-2'>
      <div className='flex flex-row items-center p-2'>
        <div className='flex justify-center align-middle w-20 h-20 max-w-full max-h-auto rounded-full'>
          {userProfile?.photo_URL ? (
            <img
              src={`${userProfile.photo_URL}?${new Date().getTime()}`}
              alt='미리보기'
              width={96}
              height={96}
              className='rounded-full'
            />
          ) : (
            <img
              src='/booktique.png'
              alt='프로필사진 없음'
              width={96}
              height={96}
              className='rounded-full'
            />
          )}
        </div>
        <div className='ml-4'>
          <p className='text-lg font-semibold'>{userProfile?.display_name}</p>
          <Link href={`/mypage/${userId}`}>
            <button className='w-full text-[#3F3E4E] text-sm'>
              프로필 수정
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
