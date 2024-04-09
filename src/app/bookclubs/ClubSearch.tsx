'use client';
import { bookCategories } from '@/common/constants/bookCategories';
import React, { useEffect, useState } from 'react';

const ClubSearch = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
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

  return (
    <div
      className={` bg-mainblue pt-3  sticky top-0 w-full z-10 ${
        isScrolled ? 'shadow' : ''
      }`}>
      <div className='px-2 pb-3'>
        <input
          className='w-full py-3 px-4 outline-none rounded-md'
          placeholder='책 제목이나 클럽 이름을 검색해 보세요'
        />
      </div>
      <div className='bg-white rounded-t-2xl py-3 mt-2'>
        <h1 className=' text-lg font-bold px-3 mb-2 text-[#292929]'>
          책 분야로 개설된 북클럽
        </h1>
        <div className='flex overflow-x-auto border-b-2 px-2'>
          {bookCategories.map((bookCategory, idx) => {
            return (
              <span
                onClick={() => handleCategoryClick(bookCategory)}
                className={`cursor-pointer bg-grayBgLight rounded-full mr-2 p-2 mb-2 whitespace-nowrap ${
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
