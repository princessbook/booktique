'use client';
import React, { useEffect, useState } from 'react';
import { Tables } from '@/lib/types/supabase';
import { getUserClubIds, getUserId } from '@/utils/userAPIs/authAPI';
type Clubs = Tables<'clubs'>;
import { getClubInfo } from '@/utils/userAPIs/authAPI';
const MyBookClub = ({ userId }: { userId: string | null }) => {
  const [clubs, setClubs] = useState<Clubs[]>([]);
  const [visibleClubs, setVisibleClubs] = useState<Clubs[]>([]);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    const fetchMyClubs = async () => {
      if (userId) {
        const clubIds = await getUserClubIds(userId);
        if (clubIds.length > 0) {
          const clubData = await getClubInfo(clubIds);
          setClubs(clubData);
          setVisibleClubs(clubData.slice(0, 3)); // 처음 세 개의 클럽만 표시
          if (clubData.length > 3) {
            setShowMore(true); // 클럽이 세 개 이상인 경우 더 보기 버튼 표시
          }
        }
      }
    };
    fetchMyClubs();
  }, [userId]);
  const handleShowMore = () => {
    setVisibleClubs(clubs); // 모든 클럽을 표시
    setShowMore(false); // 더 보기 버튼 숨기기
  };
  return (
    <div>
      <h2>내 북클럽</h2>
      <ul>
        {visibleClubs.map((club) => (
          <li key={club.id}>
            {club.name}
            {club.archive ? (
              <button className='ml-2 border-2'>종료됌</button>
            ) : (
              <button className='ml-2 border-2'>바로가기</button>
            )}
          </li>
        ))}
      </ul>
      {showMore && <button onClick={handleShowMore}>더 보기</button>}
    </div>
  );
};

export default MyBookClub;
