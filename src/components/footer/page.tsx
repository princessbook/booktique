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

const Footer = () => {
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const storedActiveLink = localStorage.getItem('activeLink');
    if (storedActiveLink) {
      setActiveLink(storedActiveLink);
    }
  }, []);

  const handleClick = (link: string) => {
    setActiveLink(link);
    localStorage.setItem('activeLink', link);
  };

  return (
    <div className='flex w-[375px] h-[78px] mx-auto bottom-0 bg-white border-t-[4px] justify-around'>
      <div className='flex justify-center h-auto'>
        <ul className='flex  h-auto items-center justify-center text-[12px] text-center leading-[18px] font-medium mt-[4px]'>
          <li
            className={`flex w-[94px] h-[78px] justify-center ${
              activeLink === 'myclubinfo2'
                ? 'text-[#35A5F6] mb-[2px]'
                : 'text-[#B2B5B9] mb-[2px]'
            }`}>
            <Link
              href='/myclubinfo2'
              className='mb-[8px]'
              onClick={() => handleClick('myclubinfo2')}>
              <Image
                src={
                  activeLink === 'myclubinfo2' ? mybookclubActive : mybookclub
                }
                alt='mybookclub'
                width={64.69}
                height={46}
                className='mt-1 w-[64.69px] h-[46px]'
              />
              내 북클럽
            </Link>
          </li>
          <li
            className={`flex w-[94px] h-[78px] justify-center ${
              activeLink === 'readbook'
                ? 'text-[#35A5F6] mb-[2px]'
                : 'text-[#B2B5B9] mb-[2px]'
            }`}>
            <Link
              href='/readbook'
              className='mb-[8px]'
              onClick={() => handleClick('readbook')}>
              <Image
                src={activeLink === 'readbook' ? readbookActive : readbook} // 변경
                alt='mybookclub'
                width={64.69}
                height={46}
                className='mt-1 w-[64.69px] h-[46px]'
              />
              책 읽기
            </Link>
          </li>
          <li
            className={`flex w-[93px] h-[78px] justify-center ${
              activeLink === 'bookclubs'
                ? 'text-[#35A5F6] mb-[2px]'
                : 'text-[#B2B5B9] mb-[2px]'
            }`}>
            <Link
              href='/bookclubs'
              className='mb-[8px]'
              onClick={() => handleClick('bookclubs')}>
              <Image
                src={activeLink === 'bookclubs' ? searchActive : search} // 변경
                alt='mybookclub'
                width={64}
                height={46}
                className='mt-1 w-[64px] h-[46px]'
              />
              북클럽 찾기
            </Link>
          </li>
          <li
            className={`flex w-[93px] h-[78px] justify-center ${
              activeLink === 'mypage'
                ? 'text-[#35A5F6] mb-[2px]'
                : 'text-[#B2B5B9] mb-[2px]'
            }`}>
            <Link
              href='/mypage'
              className='mb-[8px]'
              onClick={() => handleClick('mypage')}>
              <Image
                src={activeLink === 'mypage' ? mypageActive : mypage} // 변경
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
    </div>
  );
};

export default Footer;
