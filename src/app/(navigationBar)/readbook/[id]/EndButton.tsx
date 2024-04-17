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
      {isModalOpen && <Modal id={id} onClose={toggleModal} />}
      {/* 모달이 열려 있을 때, 주변 영역에 스크롤을 비활성화하는 스타일 적용 */}
      {isModalOpen && (
        <style jsx global>{`
          body {
            overflow: hidden;
          }
        `}</style>
      )}
    </>
  );
};

export default EndButton;
