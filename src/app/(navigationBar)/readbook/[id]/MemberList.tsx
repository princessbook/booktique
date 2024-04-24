'use client';
import { Tables } from '@/lib/types/supabase';
import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';
import EndButton from './EndButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getReadBookPageData } from '@/utils/testAPIs';

interface MemberListProps {
  // clubMembers: Tables<'members'>[];
  clubId: string;
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
  // clubMembers,
  clubId,
  endButtonVisible,
  timerVisible,
  userId
}: MemberListProps) => {
  const supabase = createClient();
  const [profiles, setProfiles] = useState<UserProfile[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // useEffect(() => {
  //   const fetchProfiles = async () => {
  //     try {
  //       const profilePromises = clubMembers?.map(async (clubMember) => {
  //         const { data: profileData, error: profileError } = await supabase
  //           .from('profiles')
  //           .select('*')
  //           .eq('id', clubMember.user_id as string)
  //           .single();
  //         if (profileError) {
  //           throw new Error('프로필 정보를 가져오는 도중 오류가 발생했습니다');
  //         }
  //         // console.log('profileData', profileData);
  //         // 해당 멤버의 클럽 활동 정보도 가져오기
  //         const { data: activitiesData, error: activitiesError } =
  //           await supabase
  //             .from('club_activities')
  //             .select('progress, time')
  //             .eq('user_id', clubMember.user_id as string)
  //             .eq('club_id', clubId);
  //         if (activitiesError) {
  //           throw new Error('클럽 활동을 가져오는 도중 오류가 발생했습니다.');
  //         }
  //         // 프로필 정보에 클럽 활동 정보를 추가하여 반환
  //         return {
  //           ...profileData,
  //           club_activities: {
  //             progress: activitiesData[0]?.progress || 0,
  //             time: activitiesData[0]?.time || 0
  //           }
  //         };
  //       });
  //       const profilesData = await Promise.all(profilePromises || []);
  //       // console.log('profilesData', profilesData);
  //       setProfiles(profilesData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('알수없는 오류가 발생했습니다 새로고침 해주세요');
  //       setLoading(false);
  //     }
  //   };
  //   fetchProfiles();
  // }, [clubMembers, supabase, clubId, timerVisible]);

  //승희가 변경중

  const { data, isLoading, isError } = useQuery({
    queryKey: ['readbook', clubId],
    queryFn: getReadBookPageData,
    staleTime: 1000 * 10
  });

  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (isLoading) {
    return (
      <div className='flex flex-col'>
        <div className='mt-[32px] mb-[16px] ml-[16px] font-bold text-[16px] leading-[22px] text-[#3F3E4E]'>
          함께 책 읽기
          <button className='ml-10'>채팅참여하기</button>
        </div>
        <div className='grid grid-cols-3 mx-auto gap-[9px] justify-start items-center '>
          {arr.map((_, index) => (
            <div
              key={index}
              className='flex bg-[#EDEEF2] rounded-[10px] w-[108px] h-[146px]'
            />
          ))}
        </div>
      </div>
    );
  }

  const handleChatting = () => {
    router.push(`/chat/${clubId}`);
  };
  return (
    <>
      <div className='flex flex-col h-full'>
        <div className='mt-[32px] mb-[16px] ml-[16px] font-bold text-[16px] leading-[22px] text-[#3F3E4E]'>
          함께 책 읽기
        </div>
        <div className='grid grid-cols-3 mx-auto gap-[9px] justify-start items-center text-center'>
          {data?.members?.map((member, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                (member?.club_activities[0]?.progress as number) > 0
                  ? 'bg-[#EDEEF2]'
                  : 'bg-[#EDEEF2] bg-opacity-50'
              } rounded-[10px] w-[108px] h-[146px]`}>
              <div className='relative'>
                {/*독서중 표기, 시간은 책 읽기를 한번도 하지 않은 사람은 아예 club_activities data가 없어용.. 비교 연산자를 쓸 수 없슴 ㅜㅜ*/}
                {(member?.club_activities[0]?.time as number) < 3600 && (
                  <div className='p-1 gap-2 absolute w-[42px] h-[17px] left-[11px] top-[10px] bg-[#269AED] rounded-md text-[11px] leading-[10px] font-medium text-white'>
                    독서중
                  </div>
                )}
                {/* 나는 바보다 책 읽기 시작하기 누르면 아래에 내 프로필에 독서중 나타남*/}
                {member.profiles?.id === userId && timerVisible && (
                  <div className='p-1 gap-2 absolute w-[42px] h-[17px] left-[11px] top-[10px] bg-[#269AED] rounded-md text-[11px] leading-[10px] font-medium text-white '>
                    독서중
                  </div>
                )}
                {member.profiles?.photo_URL ? (
                  <Image
                    src={member.profiles.photo_URL}
                    alt='profile_image'
                    width={56}
                    height={56}
                    priority={true}
                    className='mx-auto rounded-full object-cover w-[56px] h-[56px] mt-[11px] mb-1'
                  />
                ) : (
                  <Image
                    src='/defaultImage.svg'
                    width={56}
                    height={56}
                    alt='default_profile_image'
                    className='mx-auto rounded-full object-cover w-[56px] h-[56px] mt-[11px] mb-1'
                  />
                )}
                {data.members[index]?.role === 'admin' && (
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
                {member.profiles?.display_name}
              </p>
              <div className='text-center mt-2 font-bold text-lg leading-6 text-[#8A9DB3] mb-[11px]'>
                {member.club_activities[0]?.progress
                  ? `${member.club_activities[0].progress} %`
                  : '0%'}
              </div>
            </div>
          ))}
        </div>
        {!endButtonVisible && <EndButton clubId={clubId} />}
      </div>
    </>
  );
};
export default MemberList;
