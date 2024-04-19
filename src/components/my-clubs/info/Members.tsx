import React from 'react';

import { createClient } from '@/utils/supabase/server';
import MemberCard from './MemberCard';
const Members = async ({ member, index }: { member: any; index: number }) => {
  const supabase = createClient();
  const { data: userProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', member.user_id)
    .single();
  return (
    <MemberCard
      index={index}
      photoURL={userProfile?.photo_URL || '/booktique.png'}
      displayName={userProfile?.display_name || ''}
      progress={member.progress}
      isAdmin={member.role === 'admin'}
    />
  );
};

export default Members;
