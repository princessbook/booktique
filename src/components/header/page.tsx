'use client';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className='flex bg-slate-100 gap-16 justify-center border-b-2 '>
      <Link
        className='border-b-2 hover:border-b-2 border-transparent hover:border-gray-800'
        href={'/'}>
        홈
      </Link>
      <Link
        className='border-b-2 hover:border-b-2 border-transparent hover:border-gray-800'
        href={'/'}>
        문장 저장소
      </Link>
      <Link
        className='border-b-2 hover:border-b-2 border-transparent hover:border-gray-800'
        href={'/quiz'}>
        퀴즈
      </Link>
    </div>
  );
};

export default Header;
