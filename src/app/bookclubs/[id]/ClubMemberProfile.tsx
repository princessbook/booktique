'use client';
import { PROFILES_TABLE } from '@/common/constants/tableNames';
import { Tables } from '@/lib/types/supabase';
import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';

const ClubMemberProfile = ({ member }: { member: Tables<'members'> }) => {
  const supabase = createClient();
  const [profile, setProfile] = useState<Tables<'profiles'>>();
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from(PROFILES_TABLE)
        .select('*')
        .eq('id', member.user_id)
        .single();
      if (data) {
        setProfile(data);
      }

      if (error) {
        throw error;
      }
    };
    fetchProfile();
  }, [member.user_id, supabase]);

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='w-10 h-10 bg-gray-500 rounded-full'></div>
      <p>{member.role === 'admin' ? '방장' : '일반멤버'}</p>
      <div>{profile?.display_name}</div>
    </div>
  );
};

export default ClubMemberProfile;
