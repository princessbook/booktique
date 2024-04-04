'use client';
import LoadingOverlay from '@/common/LoadingOverlay';
import { Tables } from '@/lib/types/supabase';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface MemberListProps {
  clubMembers: Tables<'members'>[] | null;
}

const MemberList = ({ clubMembers }: MemberListProps) => {
  const supabase = createClient();
  const [profiles, setProfiles] = useState<Tables<'profiles'>[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profilePromises = clubMembers?.map(async (clubMember) => {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', clubMember.user_id)
            .single();
          console.log('data', data);
          if (error) {
            throw new Error('프로필 정보를 가져오는 도중 오류가 발생했습니다');
          }
          return data;
        });

        const profilesData = await Promise.all(profilePromises || []);
        console.log('profilesData', profilesData);
        setProfiles(profilesData);
        setLoading(false);
      } catch (error) {
        console.error('알수없는 오류가 발생했습니다 새로고침 해주세요');
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [clubMembers, supabase]);
  if (loading) {
    return <LoadingOverlay show={loading} />;
  }
  return (
    <div>
      <div>
        북클럽 멤버
        <div className='mx-auto flex flex-wrap gap-2 justify-center'>
          {profiles?.map((profile, index) => (
            <div
              key={index}
              className='flex flex-col border-2 border-b-gray-200'>
              {profile?.photo_URL && (
                <div className='relative h-[100px] w-[100px]'>
                  <Image
                    src={profile.photo_URL}
                    layout='fill'
                    objectFit='cover'
                    alt='프로필 이미지'
                  />
                </div>
              )}
              {profile?.display_name}
              타이머
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberList;
