import { useRouter } from 'next/navigation';
import React from 'react';
interface ModalProps {
  onClose: () => void;
  id: string;
}
const EndModal = ({ onClose, id }: ModalProps) => {
  const router = useRouter();
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white w-[327px] h-[332px] rounded-[20px] flex flex-col items-center'>
        <h2 className=' mb-4 font-bold text-[16px] text-center text-blue-500'>
          아직 책 읽기로한 시간을 채우지 못했어요
        </h2>
        <div className='flex flex-col gap-3 w-[279px] '>
          <button
            className='px-4 py-2 text-white bg-subblue rounded-full text-[14px]'
            onClick={onClose}>
            계속 읽기
          </button>
          <button
            className='px-4 py-2 text-[#8A9DB3] rounded-full border border-[#DBE3EB] text-[14px]'
            onClick={() => router.push(`/readbook/${id}/save`)}>
            그만 읽기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndModal;
/* btn */

// box-sizing: border-box;

// /* Auto layout */
// display: flex;
// flex-direction: row;
// justify-content: center;
// align-items: center;
// padding: 12px 43px;
// gap: 10px;

// width: 279px;
// height: 44px;

// /* line gray */
// border: 1px solid #DBE3EB;
// border-radius: 9999px;

// /* Inside auto layout */
// flex: none;
// order: 1;
// flex-grow: 0;
