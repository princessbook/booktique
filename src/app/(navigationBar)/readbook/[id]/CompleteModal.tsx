import Image from 'next/image';
import React from 'react';
import readbook_completed_read from '../../../../../public/readbook_completed_read.png';
import { useRouter } from 'next/navigation';

const CompleteModal = ({ clubId }: { clubId: string }) => {
  const router = useRouter();
  const handleNavigateSave = () => {
    router.push(`/readbook/${clubId}/save`);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20'>
      <div className='bg-white w-[327px] h-[330px] rounded-[20px] flex flex-col items-center'>
        <Image
          src={readbook_completed_read}
          alt='end'
          width={144}
          height={144}
          className='mt-[38px] mb-[16px] w-[144px] h-[144px]'
        />
        <h1 className=' mb-[32px] font-medium text-[16px] leading-[22px] text-center text-[#3F3E4E]'>
          책 읽기를 완료했습니다.
        </h1>
        <button
          className='px-4 py-2 w-[279px] h-[44px] text-white bg-subblue rounded-full text-[14px] '
          onClick={handleNavigateSave}>
          책 읽기 종료하기
        </button>
      </div>
    </div>
  );
};

export default CompleteModal;
