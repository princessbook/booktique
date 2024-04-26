import React from 'react';
import useModalStore from '@/store/modalstore';
import EndModal from './EndModal';
interface EndButtonProps {
  clubId: string;
}

const EndButton = ({ clubId }: EndButtonProps) => {
  const { isModalOpen, toggleModal } = useModalStore();

  return (
    <>
      <button
        className={`fixed left-0 right-0 mx-auto w-[343px] h-[56px] bottom-0 mb-[32px] text-white bg-[#3F3E4E] shadow-md rounded-lg ${
          isModalOpen ? 'hidden' : '' // 모달 열려있을 때는 버튼 숨기기
        }`}
        onClick={toggleModal}>
        종료하기
      </button>
      {isModalOpen && <EndModal clubId={clubId} />}
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
