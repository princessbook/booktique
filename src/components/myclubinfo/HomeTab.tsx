import React from 'react';
import ProgressBar from './ProgressBar';
import Members from './Members';
import { useState } from 'react';
import { useEffect } from 'react';
import ClubBook from './ClubBook';
import { Tables } from '@/lib/types/supabase';
type Clubs = Tables<'clubs'>;
import { getClubInfo } from '@/utils/userAPIs/authAPI';
const HomeTab = ({ clubId }: { clubId: string | null }) => {
  const [clubInfo, setClubInfo] = useState<Clubs | null>(null);
  useEffect(() => {
    const fetchClubInfo = async () => {
      try {
        const info = await getClubInfo(clubId);
        setClubInfo(info);
      } catch (error) {
        console.error('클럽 정보를 가져오는 데 실패했습니다:', error);
      }
    };
    fetchClubInfo();
  }, [clubId]);
  return (
    <div>
      <div>
        <div className='bg-[#EEEFF3] m-4 p-5 rounded-xl'>
          <ProgressBar clubId={clubId} />
        </div>

        <div>
          <p className='px-5 mb-2 font-medium'>전체 독서 진행률</p>
          <Members clubId={clubId} />
        </div>
        <div>
          <ClubBook clubInfo={clubInfo} />
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
