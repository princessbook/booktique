'use client';
import { Tables } from '@/lib/types/supabase';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

type Profiles = Tables<'profiles'>;

const SentenceUser = ({ sentenceId }: { sentenceId: string }) => {
  console.log('!23');
  console.log(sentenceId);
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
        console.log(profileData);
        console.log('12');
        if (profileError) {
          console.error('Error fetching profile:', profileError.message);
          return;
        }
        setSentenceProfile(profileData);
      } catch (error) {}
    };

    fetchProfile(sentenceId);
  }, [sentenceId]);
  return (
    <div>
      {sentenceProfile ? (
        <div>
          <div className='flex items-center'>
            <img
              className='w-[24px] h-[24px] rounded-[24px]'
              src={sentenceProfile.photo_URL as string}
              alt='프로필'
            />
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
