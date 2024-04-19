'use client';
import { Tables } from '@/lib/types/supabase';
import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';
import EndButton from './EndButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '@/common/LoadingOverlay';
interface MemberListProps {
  clubMembers: Tables<'members'>[];
  id: string;
  endButtonVisible: boolean;
  timerVisible: boolean;
  userId: string | null;
}
interface UserProfile extends Tables<'profiles'> {
  club_activities: {
    time: number;
    progress: number;
  };
}
// const MemberList = ({ clubMembers, id }: MemberListProps) => {
const MemberList = ({
  clubMembers,
  id,
  endButtonVisible,
  timerVisible,
  userId
}: MemberListProps) => {
  const supabase = createClient();
  const [profiles, setProfiles] = useState<UserProfile[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profilePromises = clubMembers?.map(async (clubMember) => {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', clubMember.user_id as string)
            .single();
          if (profileError) {
            throw new Error('프로필 정보를 가져오는 도중 오류가 발생했습니다');
          }
          // console.log('profileData', profileData);
          // 해당 멤버의 클럽 활동 정보도 가져오기
          const { data: activitiesData, error: activitiesError } =
            await supabase
              .from('club_activities')
              .select('progress, time')
              .eq('user_id', clubMember.user_id as string)
              .eq('club_id', id);
          if (activitiesError) {
            throw new Error('클럽 활동을 가져오는 도중 오류가 발생했습니다.');
          }
          // 프로필 정보에 클럽 활동 정보를 추가하여 반환
          return {
            ...profileData,
            club_activities: {
              progress: activitiesData[0]?.progress || 0,
              time: activitiesData[0]?.time || 0
            }
          };
        });
        const profilesData = await Promise.all(profilePromises || []);
        // console.log('profilesData', profilesData);
        setProfiles(profilesData);
        setLoading(false);
      } catch (error) {
        console.error('알수없는 오류가 발생했습니다 새로고침 해주세요');
        setLoading(false);
      }
    };
    fetchProfiles();
  }, [clubMembers, supabase, id, timerVisible]);
  if (loading) {
    return (
      <>
        <div className='mt-[32px] mb-[16px] ml-[16px] font-bold text-[16px] leading-[22px] text-[#3F3E4E]'>
          함께 책 읽기
          <button className='ml-10'>채팅참여하기</button>
        </div>
        <div className='flex flex-wrap mx-auto gap-[9px] justify-start ml-[16px] mt-[16px]'>
          {Array.from({ length: clubMembers.length }).map((_, index) => (
            <div
              key={index}
              className='flex bg-[#EDEEF2] rounded-[10px] w-[108px] h-[146px]'
            />
          ))}
        </div>
      </>
    );
  }

  const handleChatting = () => {
    router.push(`/chat/${id}`);
  };
  return (
    <>
      <div className='flex flex-col h-full'>
        <div className='mt-[32px] mb-[16px] ml-[16px] font-bold text-[16px] leading-[22px] text-[#3F3E4E]'>
          함께 책 읽기
          <button className='ml-10' onClick={handleChatting}>
            채팅참여하기
          </button>
        </div>
        <div className='flex flex-wrap mx-auto gap-[9px] justify-start ml-[16px]'>
          {profiles?.map((profile, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                profile?.club_activities?.time > 0
                  ? 'bg-[#EDEEF2]'
                  : 'bg-[#EDEEF2] bg-opacity-50'
              } rounded-[10px] w-[108px] h-[146px]`}>
              <div className='relative'>
                {profile?.club_activities?.time > 0 && (
                  <div className='p-1 gap-2 absolute w-[42px] h-[17px] left-[11px] top-[10px] bg-[#269AED] rounded-md text-[11px] leading-[10px] font-medium text-white'>
                    독서중
                  </div>
                )}
                {/* 나는 바보다 책 읽기 시작하기 누르면 아래에 내 프로필에 독서중 나타남*/}
                {profile?.id === userId && timerVisible && (
                  <div className='p-1 gap-2 absolute w-[42px] h-[17px] left-[11px] top-[10px] bg-[#269AED] rounded-md text-[11px] leading-[10px] font-medium text-white '>
                    독서중
                  </div>
                )}
                {profile?.photo_URL ? (
                  <Image
                    src={profile.photo_URL}
                    alt='profile_image'
                    width={56}
                    height={56}
                    className='mx-auto rounded-full object-cover w-[56px] h-[56px] mt-[11px] mb-1 '
                  />
                ) : (
                  <Image
                    src='/booktique.png'
                    width={56}
                    height={56}
                    alt='default_profile_image'
                    className='mx-auto rounded-full object-cover w-[56px] h-[56px] mt-[11px] mb-1'
                  />
                )}
                {clubMembers[index]?.role === 'admin' && (
                  <Image
                    src='/badge.png'
                    alt='admin'
                    width={16}
                    height={16}
                    className='absolute w-[16px] h-[16px] bottom-2 right-0 mr-[19px] '
                  />
                )}
              </div>
              <p className='text-center mt-[4px] font-bold text-xs leading-4 h-[36px]'>
                {profile?.display_name}
              </p>
              <div className='text-center mt-2 font-bold text-lg leading-6 text-[#8A9DB3] mb-[11px]'>
                {profile?.club_activities?.progress}%
              </div>
            </div>
          ))}
        </div>
        {!endButtonVisible && <EndButton id={id} />}
      </div>
    </>
  );
};
export default MemberList;
