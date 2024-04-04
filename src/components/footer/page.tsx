import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className=' w-[375px] min-h[78px] mx-auto bottom-0 py-8 px-4 bg-gray-300'>
      <div className='mx-auto flex justify-center'>
        <ul className='flex space-x-4 '>
          <li>
            <Link href='/myclubinfo' className='hover:text-white'>
              내 북클럽
            </Link>
          </li>
          <li>
            <Link href='/readbook' className='hover:text-white'>
              책 읽기
            </Link>
          </li>
          <li>
            <Link href='/create-bookclub' className='hover:text-white'>
              북클럽 찾기
            </Link>
          </li>
          <li>
            <Link href='/mypage' className='hover:text-white'>
              마이 페이지
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
