'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import mybookclub from '../../../public/footer_mybookclub.png';
import mybookclubActive from '../../../public/footer_mybookclubactive.png';
import readbook from '../../../public/footer_readbook.png';
import readbookActive from '../../../public/footer_readbookactive.png';
import search from '../../../public/footer_searchclub.png';
import searchActive from '../../../public/footer_searchclubactive.png';
import mypage from '../../../public/footer_mypage.png';
import mypageActive from '../../../public/footer_mypageactive.png';
import { useSelectedLayoutSegment } from 'next/navigation';

const NavigationBar = () => {
  const segment = useSelectedLayoutSegment();
  const activeLink = segment;
  return (
    <div
      className='w-full md:w-[375px] h-[78px] fixed bottom-0 bg-white mx-auto'
      style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)' }}>
      <ul className='flex w-[90%] mx-auto justify-between  h-auto items-center text-[12px] text-center leading-[18px] font-medium px-2'>
        <li
          className={`flex h-[78px] justify-center ${
            activeLink === 'my-clubs'
              ? 'text-[#35A5F6] mb-[2px]'
              : 'text-[#B2B5B9] mb-[2px]'
          }`}>
          <Link href='/my-clubs'>
            <Image
              src={activeLink === 'my-clubs' ? mybookclubActive : mybookclub}
              alt='mybookclub'
              width={64.69}
              height={46}
              className='mt-1 w-[64.69px] h-[46px]'
            />
            내 북클럽
          </Link>
        </li>
        <li
          className={`flex  h-[78px] justify-center ${
            activeLink === 'readbook'
              ? 'text-[#35A5F6] mb-[2px]'
              : 'text-[#B2B5B9] mb-[2px]'
          }`}>
          <Link href='/readbook'>
            <Image
              src={activeLink === 'readbook' ? readbookActive : readbook}
              alt='mybookclub'
              width={64.69}
              height={46}
              className='mt-1 w-[64.69px] h-[46px]'
            />
            책 읽기
          </Link>
        </li>
        <li
          className={`flex  h-[78px] justify-center ${
            activeLink === 'bookclubs'
              ? 'text-[#35A5F6] mb-[2px]'
              : 'text-[#B2B5B9] mb-[2px]'
          }`}>
          <Link href='/bookclubs'>
            <Image
              src={activeLink === 'bookclubs' ? searchActive : search}
              alt='mybookclub'
              width={64}
              height={46}
              className='mt-1 w-[64px] h-[46px]'
            />
            북클럽 찾기
          </Link>
        </li>
        <li
          className={`flex  h-[78px] justify-center ${
            activeLink === 'mypage'
              ? 'text-[#35A5F6] mb-[2px]'
              : 'text-[#B2B5B9] mb-[2px]'
          }`}>
          <Link href='/mypage'>
            <Image
              src={activeLink === 'mypage' ? mypageActive : mypage}
              alt='mybookclub'
              width={64}
              height={46}
              className='mt-1 w-[64px] h-[46px]'
            />
            마이 페이지
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
