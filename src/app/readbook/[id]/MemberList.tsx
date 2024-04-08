'use client';
import { Tables } from '@/lib/types/supabase';
import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';
import EndButton from './EndButton';

interface MemberListProps {
  clubMembers: Tables<'members'>[];
  id: string;
}

const MemberList = ({ clubMembers, id }: MemberListProps) => {
  const supabase = createClient();
  const [profiles, setProfiles] = useState<Tables<'profiles'>[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [activitiesData, setActivitiesData] = useState<{ progress: number }[]>(
    []
  );
  console.log('clubMembers', clubMembers);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profilePromises = clubMembers?.map(async (clubMember) => {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', clubMember.user_id as string)
            .single();
          // console.log('data', data);
          if (error) {
            throw new Error('프로필 정보를 가져오는 도중 오류가 발생했습니다');
          }
          return data;
        });

        const profilesData = await Promise.all(profilePromises || []);
        // console.log('profilesData', profilesData);
        setProfiles(profilesData);
        setLoading(false);

        const activitiesPromises = profilesData.map(async (profile) => {
          const { data: activities, error: activitiesError } = await supabase
            .from('club_activities')
            .select('progress')
            .eq('user_id', profile.id)
            .eq('club_id', id);
          if (activitiesError) {
            throw new Error('클럽 활동을 가져오는 도중 오류가 발생했습니다.');
          }
          return activities[0] || { progress: 0 };
        });

        const activitiesData = await Promise.all(activitiesPromises);
        console.log('activitiesData', activitiesData);
        setActivitiesData(activitiesData as []);
      } catch (error) {
        console.error('알수없는 오류가 발생했습니다 새로고침 해주세요');
        setLoading(false);
      }
    };
    fetchProfiles();
  }, [clubMembers, supabase, id]);

  // if (loading) {
  //   return <LoadingOverlay show={loading} />;
  // }

  return (
    <div className='flex flex-col'>
      {/* 나중에 멤버데이터많으면 여기 h-full확인 */}
      <div className='mt-[32px] mb-[16px] ml-[16px] font-bold text-[16px] leading-[22px]'>
        함께 책 읽기
      </div>
      <div className='flex flex-wrap ml-[16px] gap-[8px] justify-start'>
        {profiles?.map((profile, index) => (
          <div
            key={index}
            className='flex flex-col bg-[#d9d9d9] rounded-[10px]'>
            {profile?.photo_URL && (
              <figure className='w-[109px] h-[150px] mt-[15px] relative'>
                <div className='relative'>
                  <img
                    src={profile.photo_URL}
                    alt='프로필 이미지'
                    className='mx-auto rounded-full object-cover w-[56px] h-[56px]'
                  />
                  {clubMembers[index]?.role === 'admin' && (
                    <img
                      src='/badge.png'
                      alt='admin'
                      className='absolute w-[16px] h-[16px] right-[24px] bottom-0'
                    />
                  )}
                </div>
                <p className='text-center mt-[4px] font-bold text-xs leading-4'>
                  {profile?.display_name}
                </p>
                <div className='text-center mt-2 font-bold text-lg leading-6 text-subblue'>
                  {activitiesData[index]?.progress}%
                </div>
              </figure>
            )}
          </div>
        ))}
      </div>
      <EndButton id={id} />
    </div>
  );
};

export default MemberList;
