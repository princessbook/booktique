'use client';
import { MEMBERS_TABLE } from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/client';
import React, { Dispatch, PropsWithChildren, SetStateAction } from 'react';

const ResignBtn = ({
  clubId,
  isMember,
  setUserIsClubMember,
  setIsJoinOrResign
}: PropsWithChildren<{
  clubId: string;
  isMember: boolean;
  setUserIsClubMember: Dispatch<SetStateAction<boolean>>;
  setIsJoinOrResign: Dispatch<SetStateAction<boolean>>;
}>) => {
  const supabase = createClient();

  const handleResign = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (user) {
      try {
        const { error } = await supabase
          .from(MEMBERS_TABLE)
          .delete()
          .eq('club_id', clubId)
          .eq('user_id', user.id);
        setUserIsClubMember(false);
        setIsJoinOrResign((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      onClick={handleResign}
      className='fixed bottom-32 left-3/4 transform -translate-x-1/2 px-4 py-2 rounded-full bg-blue-500 text-white'>
      {isMember ? '탈퇴하기' : '이미탈퇴'}
    </div>
  );
};

export default ResignBtn;
