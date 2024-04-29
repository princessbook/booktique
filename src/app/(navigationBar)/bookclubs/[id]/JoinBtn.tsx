'use client';
import { MEMBERS_TABLE } from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import JoinPopUp from './joinPopUp';

const JoinBtn = ({
  clubId,
  isMember,
  setUserIsClubMember,
  setIsJoinOrResign
}: PropsWithChildren<{
  clubId: string;
  isMember: boolean;
  setUserIsClubMember: React.Dispatch<React.SetStateAction<boolean>>;
  setIsJoinOrResign: React.Dispatch<React.SetStateAction<boolean>>;
}>) => {
  const supabase = createClient();
  const router = useRouter();

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const getUserClubs = async (userId: string) => {
    const { data: joinClubs, error } = await supabase
      .from(MEMBERS_TABLE)
      .select('*')
      .eq('user_id', userId);

    return joinClubs;
  };
  const handleJoin = async () => {
    if (isMember) return;

    const {
      data: { user }
    } = await supabase.auth.getUser();
    const userClubs = await getUserClubs(user!.id);
    console.log('userClubs', userClubs);
    if (userClubs!.length >= 10) {
      alert('10개 이상의 북클럽에 가입할 수 없습니다.');
      return;
    }
    if (user) {
      const { data: members, error } = await supabase
        .from(MEMBERS_TABLE)
        .insert([{ club_id: clubId, user_id: user?.id, role: 'member' }]);

      setUserIsClubMember(true);

      //router.refresh();
      setIsPopUpOpen(true);
      if (error) {
        throw error;
      }
    } else {
      alert('로그인 한 유저만 이용할 수 있음');
    }
  };

  return (
    <>
      <div className='px-4 fixed bottom-[106px] w-full left-1/2 transform -translate-x-1/2  sm:w-full md:w-[375px]'>
        {!isMember ? (
          <div
            onClick={handleJoin}
            className='bg-mainblue w-full h-[56px] rounded-xl text-white flex items-center justify-center cursor-pointer'>
            참가하기
          </div>
        ) : (
          <div className='fixed bottom-32 left-1/2 transform -translate-x-1/2'></div>
        )}
      </div>
      <JoinPopUp
        onClose={() => {
          setIsPopUpOpen(false);
          setIsJoinOrResign((prev) => !prev);
        }}
        isOpen={isPopUpOpen}
        onConfirm={() => {
          router.push(`/my-clubs/${clubId}/info`);
        }}
      />
    </>
  );
};

export default JoinBtn;
