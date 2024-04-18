import React from 'react';
import useUserClubs from '@/hooks/mypage/useUserClubs';
import BookClubItem from './BookClubItem';

const MyBookClub = async ({ userId }: { userId: string }) => {
  const clubsData = await useUserClubs(userId);
  const limitedClubs = clubsData.slice(0, 3);
  return (
    <div className='mt-4'>
      <ul>
        {limitedClubs.map((club) => (
          <BookClubItem key={club.id} club={club} />
        ))}
      </ul>
    </div>
  );
};

export default MyBookClub;
