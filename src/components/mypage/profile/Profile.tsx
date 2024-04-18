'use client';
import React from 'react';
import Link from 'next/link';
import { Tables } from '@/lib/types/supabase';
type Profile = Tables<'profiles'>;
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/utils/userAPIs/Fns';
import { createClient } from '@/utils/supabase/client';
import useRealtimePostgresChanges from '@/hooks/useRealtimePostgresChanges';
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

  // 대연 추가
  const supabase = createClient();
  useRealtimePostgresChanges(
    'post',
    `user_id=in.(${userId})`,
    async (payload) => {
      if (payload) {
        console.log('payload', payload);
        setTimeout(async () => {
          const { data: alarm } = await supabase
            .from('alarm')
            .select('*')
            .eq('target_user_id', userId as string)
            .order('created_at', { ascending: true });
          console.log('alarm', alarm);
          if (alarm) {
            alert(alarm[alarm.length - 1]?.content);
          }
        }, 1000); // 1초 지연  지연을 걸지 않았을 때 alarm테이블을 제대로 받아오지 못했음
      }
    }
  );

  // 대연 추가
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
                className='rounded-full object-cover'
              />
            ) : (
              <img
                src='/booktique.png'
                alt='프로필사진 없음'
                width={96}
                height={96}
                className='rounded-full object-cover'
              />
            )}
          </div>
          <div className='flex items-center ml-2'>
            <p className='text-[18px] font-bold '>
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
