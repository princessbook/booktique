'use client';
import MyBookClub from '@/components/mypage/MyBookClub';
import Profile from '@/components/mypage/Profile';
import React from 'react';
import { useRouter } from 'next/navigation';
import MySentencesStore from '@/components/mypage/MySentencesStore';
import { useState } from 'react';
import MyBook from '@/components/mypage/MyBook';
const MyPage = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  const [selectedOption, setSelectedOption] = useState('MySentencesStore');

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  return (
    //head부분
    <div className='flex flex-col h-screen'>
      <header className='p-2 flex items-center'>
        <svg
          viewBox='0 0 24 24'
          aria-hidden='true'
          className='r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03 justify-start cursor-pointer'
          style={{ color: 'rgb(239, 243, 244)', width: '32px', height: '32px' }}
          onClick={goBack}>
          <g>
            <path d='M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z'></path>
          </g>
        </svg>
        <p className='text-lg'>마이페이지</p>
      </header>
      <div className='flex flex-col items-center justify-center'>
        <Profile />
        <MyBookClub />
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value='MySentencesStore'>내 문장 저장소</option>
          <option value='MyBook'>내 서재</option>
        </select>
        {selectedOption === 'MySentencesStore' ? (
          <MySentencesStore />
        ) : (
          <MyBook />
        )}
      </div>
    </div>
  );
};

export default MyPage;
