'use client';
import React from 'react';
import { getClubInfo, getUserId } from '@/utils/userAPIs/authAPI';
import { getUserClubIds } from '@/utils/userAPIs/authAPI';
import { useState } from 'react';
import { useEffect } from 'react';
import HomeTab from '@/components/myclubinfo/HomeTab';
import SentenceStorage from '@/components/myclubinfo/SentenceStorage';
const MyClubInfo = () => {
  const [clubInfo, setClubInfo] = useState<string[]>([]);
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
        return <SentenceStorage clubId={selectedClubId} />;
      default:
        return null;
    }
  };
  console.log(clubInfo);
  return (
    <div>
      <select value={selectedClubId || ''} onChange={handleClubChange}>
        {clubInfo.map((club) => (
          <option key={club.id} value={club.id}>
            {club.name}
          </option>
        ))}
      </select>

      <div>
        <button className='border' onClick={() => handleTabChange('home')}>
          홈 탭
        </button>
        <button
          className='border'
          onClick={() => handleTabChange('sentenceStorage')}>
          문장 저장소 탭
        </button>
      </div>

      {renderSelectedTab()}
    </div>
  );
};

export default MyClubInfo;
