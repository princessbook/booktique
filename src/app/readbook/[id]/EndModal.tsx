import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import badege from '../../../../public/badge.png';
interface ModalProps {
  onClose: () => void;
  id: string;
}
const EndModal = ({ onClose, id }: ModalProps) => {
  const router = useRouter();
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20'>
      <div className='bg-white w-[327px] h-[352px] rounded-[20px] flex flex-col items-center'>
        <Image
          src={badege}
          alt='end'
          width={68}
          height={89}
          className='mt-[30px] mb-[13px]'
        />
        <h1 className=' mb-4 font-bold text-[16px] text-center text-blue-500'>
          아직 책 읽기로한 시간을 채우지 못했어요 <br />
          정말 책 읽기를 종료하시나요?
        </h1>
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
