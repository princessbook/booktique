'use client';
import React from 'react';
import { getClubInfo, getUserId } from '@/utils/userAPIs/authAPI';
import { getUserClubIds } from '@/utils/userAPIs/authAPI';
import { useState } from 'react';
import { useEffect } from 'react';
import HomeTab from '@/components/myclubinfo2/HomeTab';
import { Tables } from '@/lib/types/supabase';
import SentenceStorage from '@/components/myclubinfo2/SentenceStorage';
import NonMyClub from '@/components/myclubinfo2/NonMyClub';
import { getOrCreateUserProfile } from '../auth/authAPI';
import Board from '@/components/myclubinfo2/board/Board';
import QuizArchiving from '@/components/myclubinfo2/QuizArchiving';

type Clubs = Tables<'clubs'>;
const PageClient = () => {
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
          const fetchedUserProfile = await getOrCreateUserProfile();
          if (fetchedUserProfile) {
            const fetchedClubIds = await getUserClubIds(fetchedUserId);
            const fetchClubInfo = await getClubInfo(
              fetchedClubIds.filter(
                (id) => !clubInfo.find((club) => club.id === id)?.archive
              )
            );
            setClubInfo(fetchClubInfo);
            if (fetchedClubIds.length > 0) {
              setSelectedClubId(fetchClubInfo[0].id);
            }
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
        return (
          <SentenceStorage
            clubId={selectedClubId}
            bookpage={selectedClub.book_page}
            userId={userId}
          />
        );
      case 'board':
        return <Board clubId={selectedClubId} />;
      case 'quiz':
        return <QuizArchiving clubId={selectedClubId} />;
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
            className={`flex-1 px-2 py-2 focus:outline-none ${
              selectedTab === 'home' ? ' border-b-2 border-black' : ''
            }${clubInfo.length === 0 ? 'disabled' : ''}`}
            onClick={() => handleTabChange('home')}
            disabled={clubInfo.length === 0}>
            <span className={clubInfo.length === 0 ? 'text-gray-500' : ''}>
              홈
            </span>
          </button>
          <button
            className={`flex-1 px-2 py-2 focus:outline-none ${
              selectedTab === 'sentenceStorage' ? 'border-b-2 border-black' : ''
            }`}
            onClick={() => handleTabChange('sentenceStorage')}
            disabled={clubInfo.length === 0}>
            <span className={clubInfo.length === 0 ? 'text-gray-500' : ''}>
              문장 저장소
            </span>
          </button>
          <button
            className={`flex-1 px-2 py-2 focus:outline-none ${
              selectedTab === 'board' ? 'border-b-2 border-black' : ''
            }`}
            onClick={() => handleTabChange('board')}
            disabled={clubInfo.length === 0}>
            <span className={clubInfo.length === 0 ? 'text-gray-500' : ''}>
              자유 게시판
            </span>
          </button>
          <button
            className={`flex-1 px-2 py-2 focus:outline-none ${
              selectedTab === 'quiz' ? 'border-b-2 border-black' : ''
            }`}
            onClick={() => handleTabChange('quiz')}
            disabled={clubInfo.length === 0}>
            <span className={clubInfo.length === 0 ? 'text-gray-500' : ''}>
              퀴즈
            </span>
          </button>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div>{renderSelectedTab()}</div>
    </div>
  );
};

export default PageClient;
