import React, { useState } from 'react';
import Modal from './EndModal'; // 모달 컴포넌트 import

const EndButton = () => {
  // 모달 상태를 관리하는 상태 변수
  const [modalOpen, setModalOpen] = useState(false);

  // 모달을 열고 닫는 함수
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      {/* 종료하기 버튼 */}
      <button
        className={`absolute ml-[16px] w-[343px] h-[56px] bottom-[32px] text-white bg-[#3F3E4E] shadow-md rounded-lg ${
          modalOpen ? 'hidden' : '' // 모달 열려있을 때는 버튼 숨기기
        }`}
        onClick={toggleModal} // 버튼 클릭 시 모달 표시
      >
        종료하기
      </button>
      {/* 모달 컴포넌트 */}
      {modalOpen && <Modal onClose={toggleModal} />}{' '}
      {/* 모달 열려있을 때만 렌더링 */}
    </>
  );
};

export default EndButton;
