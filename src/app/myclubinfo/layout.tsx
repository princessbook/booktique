'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getClubInfo, getUserId } from '@/utils/userAPIs/authAPI';
import { getUserClubIds } from '@/utils/userAPIs/authAPI';
import { Tables } from '@/lib/types/supabase';
import NonMyClub from '@/components/myclubinfo/NonMyClub';
import { useTabStore } from '@/store/zustandStore';

type Clubs = Tables<'clubs'>;

const Layout = ({ children }: { children: React.ReactNode }) => {
  //   const { selectedTab, setSelectedTab } = useTabStore();
  const [clubInfo, setClubInfo] = useState<Clubs[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState('home');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUserId = await getUserId();
        setUserId(fetchedUserId);

        if (fetchedUserId) {
          const fetchedClubIds = await getUserClubIds(fetchedUserId);
          const fetchClubInfo = await getClubInfo(fetchedClubIds);
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
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { pathname } = window.location;
      if (pathname.includes('sentencestorage')) {
        setSelectedTab('sentencestorage');
      } else if (pathname.includes('board')) {
        setSelectedTab('board');
      } else {
        setSelectedTab('home');
      }
    }
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
    return 'p-2 w-[200px] font-bold';
  };
  const getTabButtonClasses = (tab: string) => {
    if (selectedTab === tab) {
      return 'flex-1 px-4 py-2 focus:outline-none border-b-2 border-black';
    }
    return 'flex-1 px-4 py-2 focus:outline-none';
  };
  if (!selectedClubId) {
    return <NonMyClub />;
  }
  return (
    <div>
      <div>
        <div className='sticky top-0 left-0 right-0 z-10 bg-white flex flex-col justify-between'>
          {/* 북클럽 셀렉트 박스 */}
          <select
            value={selectedClubId || ''}
            onChange={handleClubChange}
            // className='p-2 m-2 w-[200px] font-bold'
            className={getSelectClasses()}>
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
            <Link href={`/myclubinfo/${selectedClubId}/home`} passHref>
              <button
                className={getTabButtonClasses('home')}
                onClick={() => handleTabChange('home')}>
                홈
              </button>
            </Link>
            <Link
              href={`/myclubinfo/${selectedClubId}/sentencestorage`}
              passHref>
              <button
                className={getTabButtonClasses('sentencestorage')}
                onClick={() => handleTabChange('sentencestorage')}>
                문장 저장소
              </button>
            </Link>
            <Link href={`/myclubinfo/${selectedClubId}/board`} passHref>
              <button
                className={getTabButtonClasses('board')}
                onClick={() => handleTabChange('board')}>
                자유 게시판
              </button>
            </Link>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
