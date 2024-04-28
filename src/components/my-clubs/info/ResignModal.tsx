import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import WithdrawalPopup from './WithdrawalPopup';
import { MEMBERS_TABLE } from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
const ResignModal = ({
  isModal,
  onClose,
  clubId
}: {
  isModal: boolean;
  clubId: string;
  onClose: () => void;
}) => {
  const supabase = createClient();
  const router = useRouter();

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
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  return (
    <>
      {isModal && (
        <div
          className={`fixed w-[375px] mx-auto inset-0 z-50 flex items-end justify-center ${
            isModal ? '' : 'hidden'
          }`}
          onClick={onClose}>
          <div className='absolute inset-0 bg-black opacity-50'></div>
          <div className='bg-white rounded-t-[20px] z-10 relative w-full px-4 py-6 h-[116px]'>
            <div
              className='bg-[#F6F7F9] h-[52px] rounded-[10px] flex items-center px-4'
              onClick={() => setIsOpenPopup(true)}>
              <Image
                src={'/Resign.svg'}
                alt='탈퇴하기'
                width={22}
                height={22}
              />
              <p className='text-[14px] font-bold text-fontMain m-2'>
                북클럽 탈퇴하기
              </p>
            </div>
          </div>
        </div>
      )}
      {isOpenPopup && (
        <WithdrawalPopup
          isOpen={isOpenPopup}
          onClose={() => setIsOpenPopup(false)}
          onWithdraw={() => handleResign()}
        />
      )}
    </>
  );
};

export default ResignModal;
