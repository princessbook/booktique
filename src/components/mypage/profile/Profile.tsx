'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tables } from '@/lib/types/supabase';
import ProfileDetail from './ProfileDetail';
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
  const [userClubs, setUserClubs] = useState<string[]>([]);
  console.log('userClubs', userClubs);
  useEffect(() => {
    const fetchData = async () => {
      const { data: members, error } = await supabase
        .from('members')
        .select('club_id')
        .eq('user_id', userId as string);
      console.log('members', members);
      if (error) {
        // 오류 처리
        console.error(
          '멤버 정보를 가져오는 중 오류가 발생했습니다:',
          error.message
        );
      } else {
        // 사용자가 가입한 클럽 id만 배열로
        const clubIds = members.map((membership) => membership.club_id);
        setUserClubs(clubIds);
        // 사용자가 가입한 클럽 정보 배열
        const { data: userClubs, error: clubError } = await supabase
          .from('clubs')
          .select('*')
          .in('id', clubIds);
        if (clubError) {
          console.error(
            '클럽 정보를 가져오는 중 오류가 발생했습니다:',
            clubError.message
          );
        } else {
          console.log('사용자가 가입한 클럽:', userClubs);
        }
      }

      // const { data: clubMembers, error: membersError } = await supabase
      //   .from('members')
      //   .select('*')
      //   .eq('club_id', id);
      // if (membersError) {
      //   throw new Error('멤버 정보를 가져오는 도중 오류가 발생했습니다.');
      // }
    };
    fetchData();
  }, [supabase, userId]);

  useRealtimePostgresChanges(
    'post',
    `club_id=in.(${userClubs})`,
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
    <div className='flex flex-col w-full bg-[#F6F7F9] rounded-md p-2'>
      <div className='flex flex-col p-2'>
        <div className='flex flex-row'>
          <div className='flex justify-center align-middle w-20 h-20 max-w-full max-h-auto rounded-full'>
            {userProfile?.photo_URL ? (
              <img
                src={`${userProfile.photo_URL}?${new Date().getTime()}`}
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

        <div className='mt-4 text-[14px] text-[#3F3E4E] opacity-80'>
          <p>{userProfile?.introduction}</p>
        </div>

        <div className=''>
          <Link href={`/mypage/${userId}`}>
            <button className='border-[#8A9DB3] w-full text-[#B3C1CC] text-[14px] border h-[35px] rounded-full mt-4'>
              프로필 수정
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
