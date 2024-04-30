import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import WithdrawalPopup from './WithdrawalPopup';
import { MEMBERS_TABLE } from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import ToastUi from '@/common/ToastUi';
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
  const toastStyle = {
    width: '343px',
    height: '50px',
    top: '200px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '8px'
  };
  const [isAdmin, setIsAdmin] = useState(false);
  const handleResign = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (user) {
      try {
        const { data } = await supabase
          .from('members')
          .select('role')
          .eq('club_id', clubId)
          .eq('user_id', user.id)
          .single();
        if (data?.role === 'admin') {
          // alert('너 방장');
          setIsAdmin(true);

          return;
        }
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
          className={`fixed mx-auto inset-0 z-50 flex items-end justify-center sm:w-full md:w-[375px] ${
            isModal ? '' : 'hidden'
          }`}
          onClick={onClose}>
          <div className='absolute inset-0 bg-black opacity-60'></div>
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
      {isAdmin && (
        <ToastUi
          message='방장은 탈퇴할 수 없습니다.'
          onClose={() => {
            setIsAdmin(false);
          }}
          isSuccess={false}
          duration={1000}
          style={toastStyle}
        />
      )}
    </>
  );
};

export default ResignModal;
