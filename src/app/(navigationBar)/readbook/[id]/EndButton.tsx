import React, { useState } from 'react';
import Modal from './EndModal';
import useModalStore from '@/store/modalstore';
interface EndButtonProps {
  id: string;
}

const EndButton = ({ id }: EndButtonProps) => {
  const { isModalOpen, toggleModal } = useModalStore();

  return (
    <>
      {/* 종료하기 버튼 */}
      <button
        className={`fixed ml-[16px] w-[343px] h-[56px] bottom-0 mb-[110px] text-white bg-[#3F3E4E] shadow-md rounded-lg ${
          isModalOpen ? 'hidden' : '' // 모달 열려있을 때는 버튼 숨기기
        }`}
        onClick={toggleModal}>
        종료하기
      </button>
      {/* 모달 컴포넌트 */}
      {isModalOpen && <Modal id={id} onClose={toggleModal} />}{' '}
    </>
  );
};

export default EndButton;
