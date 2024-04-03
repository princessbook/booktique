'use client';

import { PROFILES_TABLE } from '@/common/constants/tableNames';
import { Tables } from '@/lib/types/supabase';
import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';

const ClubMemberProfile = ({ member }: { member: Tables<'members'> }) => {
  const [userProfile, setUserProfile] = useState<Tables<'profiles'> | null>();
  useEffect(() => {
    const getUserProfile = async (userId: string) => {
      console.log('userId', userId);

      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from(PROFILES_TABLE)
          .select('*')
          .eq('id', userId)
          .single();

        setUserProfile(data);
        if (error) {
          throw error;
        }

        return data;
      } catch (error) {
        console.error('error');
        return null;
      }
    };
    if (member.user_id) {
      getUserProfile(member.user_id);
    }
  }, [member.user_id]);
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='w-10 h-10 bg-gray-500 rounded-full'></div>
      <p>{member.role === 'admin' ? '방장' : '일반멤버'}</p>
      <div>{userProfile?.display_name}</div>
    </div>
  );
};

export default ClubMemberProfile;
