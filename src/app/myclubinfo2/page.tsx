'use client';
import React from 'react';
import { getClubInfo, getUserId } from '@/utils/userAPIs/authAPI';
import { getUserClubIds } from '@/utils/userAPIs/authAPI';
import { useState } from 'react';
import { useEffect } from 'react';
import HomeTab from '@/components/myclubinfo2/HomeTab';
import Board from '@/components/myclubinfo/Board';
import { Tables } from '@/lib/types/supabase';
import SentenceStorage from '@/components/myclubinfo2/SentenceStorage';
import NonMyClub from '@/components/myclubinfo/NonMyClub';
type Clubs = Tables<'clubs'>;
const MyClubInfo = () => {
  const [loading, setLoading] = useState(true);
  const [clubInfo, setClubInfo] = useState<Clubs[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState('home');
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUserId = await getUserId();
        setUserId(fetchedUserId);

        if (fetchedUserId) {
          const fetchedClubIds = await getUserClubIds(fetchedUserId);
          const fetchClubInfo = await getClubInfo(fetchedClubIds);
          //   console.log(fetchClubInfo);
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

  const handleClubChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClubId(event.target.value);
  };
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };
  const getSelectClasses = () => {
    if (clubInfo.length <= 1) {
      return 'appearance-none w-[200px] font-bold p-2 text-lg';
    }
    return ' p-2 w-[200px] font-bold';
  };
  const renderSelectedTab = () => {
    const selectedClub = clubInfo.find((club) => club.id === selectedClubId);
    if (!selectedClub) {
      return <NonMyClub />;
    }
    switch (
      selectedTab //quiz tab 추가해야함.
    ) {
      case 'home':
        return <HomeTab club={selectedClub} />;
      case 'sentenceStorage':
        return <SentenceStorage club={selectedClub} />;
      case 'board':
        return <Board club={selectedClub} />;
      default:
        return null;
    }
  };
  return (
    <div>
      <div className='sticky top-0 left-0 right-0 z-10 bg-white flex flex-col justify-between'>
        {/* 북클럽 셀렉트 박스 */}
        <select
          value={selectedClubId || ''}
          onChange={handleClubChange}
          className={getSelectClasses()}
          //   disabled={clubInfo.length <= 1}
        >
          {clubInfo.length === 0 && (
            <option value='' className='w-[200px]'>
              내 북클럽
            </option>
          )}
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
