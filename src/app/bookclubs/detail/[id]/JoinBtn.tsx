'use client';
import { MEMBERS_TABLE } from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/client';
import React, { PropsWithChildren } from 'react';

const JoinBtn = ({ clubId }: PropsWithChildren<{ clubId: string }>) => {
  const supabase = createClient();

  const handleJoin = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      const { data: members, error } = await supabase
        .from(MEMBERS_TABLE)
        .insert([{ club_id: clubId, user_id: user?.id, role: 'member' }]);
      console.log('성공');
      if (error) {
        throw error;
      }
    }
  };
  return (
    <button
      onClick={handleJoin}
      className='fixed bottom-32 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-blue-500 text-white'>
      참가하기
    </button>
  );
};

export default JoinBtn;
