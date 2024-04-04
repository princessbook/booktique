import { useRouter } from 'next/navigation';
import React from 'react';
interface ModalProps {
  onClose: () => void;
}
const EndModal = ({ onClose }: ModalProps) => {
  const router = useRouter();
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white w-[302px] h-[252px] rounded-lg flex flex-col items-center'>
        <h2 className=' mb-4 font-bold text-2xl text-blue-500'>
          책 읽기를 종료하고 싶으신가요?
        </h2>
        <div className='flex mx-auto'>
          <button
            className='px-4 py-2 bg-gray-200 rounded-lg '
            onClick={onClose} // 모달 닫기 버튼 클릭 시 onClose 함수 호출
          >
            책 읽기 종료하기
          </button>
          {/* 모달 닫기 버튼 */}
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded-lg'
            onClick={onClose} // 모달 닫기 버튼 클릭 시 onClose 함수 호출
            // onClick={() => router.push('/')} // 모달 닫기 버튼 클릭 시 onClose 함수 호출
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndModal;
/* 책 읽기를 종료하고 싶으신가요? */
