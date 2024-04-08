'use client';
import React from 'react';
import { getClubInfo, getUserId } from '@/utils/userAPIs/authAPI';
import { getUserClubIds } from '@/utils/userAPIs/authAPI';
import { useState } from 'react';
import { useEffect } from 'react';
import HomeTab from '@/components/myclubinfo/HomeTab';
import Board from '@/components/myclubinfo/Board';
import { Tables } from '@/lib/types/supabase';
import SentenceStorage from '@/components/myclubinfo/SentenceStorage';
import NonMyClub from '@/components/myclubinfo/NonMyClub';
type Clubs = Tables<'clubs'>;
const MyClubInfo = () => {
  const [loading, setLoading] = useState(true);
  const [clubInfo, setClubInfo] = useState<Clubs[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState('home');
  const [selectedClubId, setSelectedClubId] = useState<string>('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUserId = await getUserId();
        setUserId(fetchedUserId);

        if (fetchedUserId) {
          const fetchedClubIds = await getUserClubIds(fetchedUserId);
          const fetchClubInfo = await getClubInfo(fetchedClubIds);
          console.log(fetchClubInfo);
          setClubInfo(fetchClubInfo);
          if (fetchedClubIds.length > 0) {
            setSelectedClubId(fetchedClubIds[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  //   if (loading) {
  //     // 데이터를 받아오는 동안 로딩 중인 화면
  //     return <div>Loading...</div>;
  //   }
  const handleClubChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClubId(event.target.value);
  };
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };
  const renderSelectedTab = () => {
    switch (selectedTab) {
      case 'home':
        return <HomeTab clubId={selectedClubId} />;
      case 'sentenceStorage':
        return <SentenceStorage clubId={selectedClubId} userId={userId} />;
      case 'board':
        return <Board clubId={selectedClubId} />;
      default:
        return null;
    }
  };
  if (clubInfo.length === 0) {
    // 북클럽 없는 경우에 대한 처리
    return <NonMyClub />;
  }
  console.log(clubInfo);
  return (
    <div>
      <div className='sticky top-0 left-0 right-0 z-10 bg-white flex flex-col justify-between'>
        {/* 북클럽 셀렉트 박스 */}
        <select
          value={selectedClubId || ''}
          onChange={handleClubChange}
          className='p-2 m-2 w-[200px] font-bold'>
          {clubInfo.map((club) => (
            <option key={club.id} value={club.id} className='w-[200px]'>
              {club.name}
            </option>
          ))}
        </select>

        {/* 탭 버튼들 */}
        <div className='flex flex-row justify-between w-full border-b-2 border-gray-200 font-bold'>
          <button
            className={`flex-1 px-4 py-2 focus:outline-none ${
              selectedTab === 'home' ? ' border-b-2 border-black' : ''
            }`}
            onClick={() => handleTabChange('home')}>
            홈
          </button>
          <button
            className={`flex-1 px-4 py-2 focus:outline-none ${
              selectedTab === 'sentenceStorage' ? 'border-b-2 border-black' : ''
            }`}
            onClick={() => handleTabChange('sentenceStorage')}>
            문장 저장소
          </button>
          <button
            className={`flex-1 px-4 py-2 focus:outline-none ${
              selectedTab === 'board' ? 'border-b-2 border-black' : ''
            }`}
            onClick={() => handleTabChange('board')}>
            자유 게시판
          </button>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div>{renderSelectedTab()}</div>
    </div>
  );
};

export default MyClubInfo;
