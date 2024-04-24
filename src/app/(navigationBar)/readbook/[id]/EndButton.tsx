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
      {/* 종료하기 버튼 */}
      <button
        className={`fixed left-0 right-0 mx-auto w-[343px] h-[56px] bottom-0 mb-[32px] text-white bg-[#3F3E4E] shadow-md rounded-lg ${
          isModalOpen ? 'hidden' : '' // 모달 열려있을 때는 버튼 숨기기
        }`}
        onClick={toggleModal}>
        종료하기
      </button>
      {/* 모달 컴포넌트 */}
      {/* {isModalOpen && <Modal id={id} onClose={toggleModal} />} */}
      {isModalOpen && <EndModal clubId={clubId} />}
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
