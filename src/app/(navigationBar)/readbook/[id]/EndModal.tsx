import Image from 'next/image';
import React from 'react';
import readbook_yet_read from '../../../../../public/readbook_yet_read.png';
import useModalStore from '@/store/modalstore';
import Link from 'next/link';

interface ModalProps {
  clubId: string;
}
const EndModal = ({ clubId }: ModalProps) => {
  const { toggleModal } = useModalStore();

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20'>
      <div className='bg-white w-[327px] h-[412px] rounded-[20px] flex flex-col items-center'>
        <Image
          src={readbook_yet_read}
          alt='end'
          width={144}
          height={144}
          priority={true}
          className='mt-[38px] mb-[16px] w-[144px] h-[144px]'
        />
        <h1 className=' mb-[32px] font-medium text-[16px] leading-[22px] text-center text-[#3F3E4E]'>
          아직 책 읽기로한 시간을 채우지 못했어요. <br />
          정말 책 읽기를 종료하시나요?
        </h1>
        <div className='flex flex-col gap-[12px]'>
          <button
            className='px-4 py-2 w-[279px] text-white bg-subblue rounded-full text-[14px] h-[44px]'
            onClick={toggleModal}>
            계속 읽기
          </button>
          <Link prefetch href={`/readbook/${clubId}/save`}>
            <button className='w-[279px] h-[44px] px-4 py-2 text-[#8A9DB3] rounded-full border border-[#DBE3EB] text-[14px]'>
              그만 읽기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EndModal;
