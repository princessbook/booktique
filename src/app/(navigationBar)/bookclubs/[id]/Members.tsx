'use client';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Tables } from '@/lib/types/supabase';
import { PROFILES_TABLE } from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/client';
import MemberCard from '@/components/my-clubs/info/MemberCard';
const Members = ({
  member,
  index,
  height
}: {
  member: any;
  index: number;
  height?: string;
}) => {
  const [userProfile, setUserProfile] = useState<Tables<'profiles'> | null>();

  const getUserProfile = async (userId: string) => {
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

  useEffect(() => {
    if (member.user_id) {
      getUserProfile(member.user_id);
    }
  }, [member.user_id]);
  return (
    <MemberCard
      height={'118px'}
      index={index}
      photoURL={userProfile?.photo_URL || '/defaultImage.svg'}
      displayName={userProfile?.display_name || ''}
      isAdmin={member.role === 'admin'}
    />
  );
};

export default Members;
