'use client';
import { Tables } from '@/lib/types/supabase';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import booktique from '../../../../public/defaultImage.svg';
import Image from 'next/image';

type Profiles = Tables<'profiles'>;

const SentenceUser = ({ sentenceId }: { sentenceId: string }) => {
  const [sentenceProfile, setSentenceProfile] = useState<Profiles>();
  useEffect(() => {
    const fetchProfile = async (sentenceId: string) => {
      try {
        const supabase = createClient();
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', sentenceId)
          .single();
        if (profileError) {
          console.error('Error fetching profile:', profileError.message);
          return;
        }
        setSentenceProfile(profileData);
      } catch (error) {}
    };

    fetchProfile(sentenceId);
  }, [sentenceId]);
  // console.log(sentenceProfile?.photo_URL);
  return (
    <div>
      {sentenceProfile ? (
        <div>
          <div className='flex items-center'>
            {sentenceProfile.photo_URL ? (
              <Image
                width={24}
                height={24}
                className='w-[24px] h-[24px] rounded-[24px]'
                src={sentenceProfile.photo_URL}
                alt='프로필'
              />
            ) : (
              <Image
                width={40}
                height={40}
                src={booktique}
                alt='기본 이미지'
                className='rounded-xl'
              />
            )}
            <span className='text-[12px] ml-1'>
              {sentenceProfile.display_name}
            </span>
          </div>
          {/* 필요한 다른 정보들을 여기에 추가 */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SentenceUser;
