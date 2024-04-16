import React, { useState } from 'react';
import Modal from './EndModal';
interface EndButtonProps {
  id: string;
}

const EndButton = ({ id }: EndButtonProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      {/* 종료하기 버튼 */}
      <button
        className={`fixed ml-[16px] w-[343px] h-[56px] bottom-0 mb-[110px] text-white bg-[#3F3E4E] shadow-md rounded-lg ${
          modalOpen ? 'hidden' : '' // 모달 열려있을 때는 버튼 숨기기
        }`}
        onClick={toggleModal}>
        종료하기
      </button>
      {/* 모달 컴포넌트 */}
      {modalOpen && <Modal id={id} onClose={toggleModal} />}{' '}
    </>
  );
};

export default EndButton;
