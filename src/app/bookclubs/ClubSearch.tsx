'use client';
import React, { useEffect, useState } from 'react';

const ClubSearch = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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
      className={`sticky top-0 bg-white w-full z-10 ${
        isScrolled ? 'shadow' : ''
      }`}>
      <input
        className='w-full py-2 px-4 outline-none'
        placeholder='책 제목이나 클럽 이름을 검색해 보세요'
      />
    </div>
  );
};

export default ClubSearch;
