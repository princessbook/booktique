'use client';
import { useEffect } from 'react';
import { getUserId } from '@/utils/userAPIs/authAPI';
import MyBookClub from '@/components/mypage/MyBookClub';
import Profile from '@/components/mypage/Profile';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/utils/userAPIs/Fns';
import { useRouter } from 'next/navigation';
import MySentencesStore from '@/components/mypage/MySentencesStore';
import { useState } from 'react';
import MyBook from '@/components/mypage/MyBook';
import ProfileDetail from '@/components/mypage/ProfileDetail';
const MyPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState('MySentencesStore');
  const router = useRouter();
  const {
    data: profiles,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['profiles'],
    queryFn: getUserProfile
  });
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };
    fetchUserId();
  }, []);
  const goBack = () => {
    router.back();
  };
  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !profiles) {
    return <div>Error fetching data</div>;
  }
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
      <div className='flex flex-col items-center justify-center text-center mx-2'>
        <ProfileDetail profiles={profiles} userId={userId} />
        <MyBookClub userId={userId} />
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value='MySentencesStore'>내 문장 저장소</option>
          <option value='MyBook'>내 서재</option>
        </select>
        {selectedOption === 'MySentencesStore' ? (
          <MySentencesStore userId={userId} />
        ) : (
          <MyBook />
        )}
      </div>
    </div>
  );
};
export default MyPage;
