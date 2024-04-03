'use client';
import { MEMBERS_TABLE } from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/client';
import React, { PropsWithChildren, useEffect, useState } from 'react';

const JoinBtn = ({ clubId }: PropsWithChildren<{ clubId: string }>) => {
  const supabase = createClient();
  const [isMember, setIsMember] = useState(false);
  useEffect(() => {
    const userIsClubMember = async () => {
      try {
        const {
          data: { user }
        } = await supabase.auth.getUser();
        if (user) {
          const { data: members, error } = await supabase
            .from(MEMBERS_TABLE)
            .select('*')
            .eq('user_id', user.id)
            .eq('club_id', clubId);
          if (members && members.length > 0) {
            setIsMember(true);
          }
          if (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    userIsClubMember();
  }, [clubId, supabase]);

  const handleJoin = async () => {
    if (isMember) return;
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
    } else {
      alert('로그인 한 유저만 이용할 수 있음');
    }
  };

  return (
    <button
      onClick={handleJoin}
      className='fixed bottom-32 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-blue-500 text-white'>
      {isMember ? '이미참가함' : '참가하기'}
    </button>
  );
};

export default JoinBtn;