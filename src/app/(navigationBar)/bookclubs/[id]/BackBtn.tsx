'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
const BackBtn = () => {
  const router = useRouter();

  return (
    <IoIosArrowBack
      onClick={() => {
        router.back();
      }}
      size={25}
      className='absolute left-3'
    />
  );
};

export default BackBtn;
