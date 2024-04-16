'use client';
import { bookCategories } from '@/common/constants/bookCategories';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
const ClubSearch = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('전체');
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    if (category === '전체') {
      router.push('/bookclubs');
      return;
    }
    router.push(`/bookclubs?category=${encodeURIComponent(category)}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 0 && !isScrolled) {
        setIsScrolled(true);
      } else if (scrollTop === 0 && isScrolled) {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return (
    <div
      className={` bg-mainblue pt-3  sticky top-0 w-full z-10 ${
        isScrolled ? 'shadow' : ''
      }`}>
      <div className='px-4 pb-3'>
        <div className='w-full flex bg-white  rounded-md justify-center items-center px-3'>
          <IoIosSearch
            className='flex items-center text=[#3F3E4E] opacity-60 justify-center'
            size={22}
            color='#3F3E4E'
          />
          <input
            className='w-full py-3 text=[#3F3E4E] outline-none flex-1'
            placeholder='책 제목이나 클럽 이름을 검색해 보세요'
            onChange={(e) => {
              router.push(`/bookclubs?search=${e.target.value}`);
              handleSearchText(e);
            }}
            value={searchText}
          />
          {searchText && (
            <IoCloseOutline
              onClick={() => {
                setSearchText('');
                router.push('/bookclubs');
              }}
              className='rounded-full w-[22px] h-[22px] text-fontGray bg-grayBg'
            />
          )}
        </div>
      </div>
      <div className='bg-white rounded-t-2xl py-3 mt-2'>
        <h1 className=' text-lg font-bold px-3 mb-2 text-[#292929]'>
          책 분야로 개설된 북클럽
        </h1>
        <div
          className='flex overflow-x-auto border-b-2 px-2'
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          {bookCategories.map((bookCategory, idx) => {
            return (
              <span
                onClick={() => handleCategoryClick(bookCategory)}
                className={`cursor-pointer bg-grayBgLight rounded-full mr-2 p-2 mb-2 whitespace-nowrap   ${
                  activeCategory === bookCategory
                    ? 'text-[#3A3B42] font-bold bg-secondary600'
                    : ''
                }`}
                key={idx}>
                {bookCategory}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClubSearch;
