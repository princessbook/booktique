'use client';
import { MEMBERS_TABLE } from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren, useState } from 'react';
import WithdrawalPopup from './WithdrawalPopup';

const ResignBtn = ({
  clubId
}: PropsWithChildren<{
  clubId: string;
}>) => {
  const supabase = createClient();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

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

        router.push(`/my-clubs/`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      {/* <div onClick={() => setIsOpen(true)}></div> */}
      <WithdrawalPopup
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        onWithdraw={() => {
          handleResign();
        }}
      />
    </>
  );
};

export default ResignBtn;
