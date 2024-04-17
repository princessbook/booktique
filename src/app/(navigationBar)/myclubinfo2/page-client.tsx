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
import { getOrCreateUserProfile } from '@/app/auth/authAPI';
import Board from '@/components/myclubinfo2/board/Board';
import QuizArchiving from '@/components/myclubinfo2/QuizArchiving';
import { useTabStore } from '@/store/zustandStore';
import { useRouter } from 'next/navigation';

type Clubs = Tables<'clubs'>;
const PageClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [clubInfo, setClubInfo] = useState<Clubs[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isServer, setIsServer] = useState(true);
  const { selectedTab, selectedClubId, setSelectedTab, setSelectedClubId } =
    useTabStore();
  // const [selectedTab, setSelectedTab] = useState('home');
  // const [selectedClubId, setSelectedClubId] = useState<string>('');

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
            // if (fetchedClubIds.length === 1) {
            //   setSelectedClubId(fetchClubInfo[0].id);
            // }
            if (!selectedClubId && fetchedClubIds.length > 0) {
              setSelectedClubId(fetchClubInfo[0].id); // 첫 번째 북클럽을 선택
            }
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
    setIsServer(false);
  }, []);

  const handleClubChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedClubId = event.target.value;
    setSelectedClubId(newSelectedClubId);
    // router.push(`/myclubinfo2/${newSelectedClubId}/home`); // URL 변경
  };
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };
  const getSelectClasses = () => {
    if (clubInfo.length <= 1) {
      return 'appearance-none text-[22px] font-bold p-2';
    }
    return ' p-2 font-bold text-[22px] max-w-[350px] overflow-hidden whitespace-nowrap';
  };
  const getButtonStyles = (tabName: string) => {
    if (tabName === selectedTab) {
      if (!isServer) {
        return {
          borderBottom: '2px solid black'
        };
      }
      return {
        borderBottom: '2px solid #DBE3EB',
        color: '#3A3B42',
        opacity: 0.5
      };
    }
    return {
      borderBottom: '2px solid #DBE3EB',
      color: '#3A3B42',
      opacity: 0.5
    };
  };
  const renderSelectedTab = () => {
    const selectedClub = clubInfo.find((club) => club.id === selectedClubId);

    if (!selectedClub || clubInfo.length === 0) {
      return <NonMyClub />;
    }
    switch (selectedTab) {
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
        <div className='relative inline-block'>
          <select
            value={selectedClubId || ''}
            onChange={handleClubChange}
            className={getSelectClasses()}>
            {clubInfo.length === 0 && <option value=''>내 북클럽</option>}
            {clubInfo.map((club) => {
              const displayText =
                club.name!.length > 20
                  ? club.name!.substring(0, 17) + '...'
                  : club.name;
              return (
                <option key={club.id} value={club.id} className=''>
                  {displayText}
                </option>
              );
            })}
          </select>
        </div>
        {/* 탭 버튼들 */}
        <div className='flex flex-row justify-between w-full font-bold'>
          <button
            className={'flex-1 px-2 py-2 focus:outline-none '}
            onClick={() => handleTabChange('home')}
            style={getButtonStyles('home')}
            disabled={clubInfo.length === 0}>
            <span
              className={`text-[16px] font-bold ${
                clubInfo.length === 0 ? 'text-gray-500' : ''
              }`}>
              정보
            </span>
          </button>
          <button
            className={'flex-1 px-2 py-2 focus:outline-none '}
            onClick={() => handleTabChange('sentenceStorage')}
            style={getButtonStyles('sentenceStorage')}
            disabled={clubInfo.length === 0}>
            <span
              className={`text-[16px] font-bold ${
                clubInfo.length === 0 ? 'text-gray-500' : ''
              }`}>
              문장 저장소
            </span>
          </button>
          <button
            className={'flex-1 px-2 py-2 focus:outline-none '}
            onClick={() => handleTabChange('quiz')}
            style={getButtonStyles('quiz')}
            disabled={clubInfo.length === 0}>
            <span
              className={`text-[16px] font-bold ${
                clubInfo.length === 0 ? 'text-gray-500' : ''
              }`}>
              퀴즈
            </span>
          </button>
          <button
            className={'flex-1 px-2 py-2 focus:outline-none '}
            onClick={() => handleTabChange('board')}
            style={getButtonStyles('board')}
            disabled={clubInfo.length === 0}>
            <span
              className={`text-[16px] font-bold ${
                clubInfo.length === 0 ? 'text-gray-500' : ''
              }`}>
              자유 게시판
            </span>
          </button>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div className='mb-[78px] overflow-y-auto'>
        {!isLoading && renderSelectedTab()}
      </div>
    </div>
  );
};

export default PageClient;
