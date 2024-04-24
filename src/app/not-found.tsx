'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const NotFound = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center align-middle h-screen'>
      <div className='flex flex-col items-center w-[302px] h-[308px] text-[#8A9DB3]'>
        <div>
          <Image src={'/notFound.svg'} alt='404' width={166} height={166} />
        </div>
        <div className='mt-8 text-[14px]'>
          <p>페이지를 찾을 수 없습니다.</p>
        </div>
        <div className='mt-8 w-full'>
          <button
            className='border-[1px] border-[#DBE3EB] rounded-full w-full h-[56px] font-bold'
            onClick={() => router.push('/bookclubs')}>
            북클럽 찾기로 이동
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
