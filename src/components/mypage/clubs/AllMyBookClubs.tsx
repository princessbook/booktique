import React from 'react';
import useUserClubs from '@/hooks/mypage/useUserClubs';
import Link from 'next/link';
import BookClubItem from './BookClubItem';
const AllMyBookClubs = async ({ userId }: { userId: string }) => {
  const clubData = await useUserClubs(userId);

  return (
    <div>
      <ul>
        {clubData?.map((club) => (
          <BookClubItem key={club.id} club={club} />
        ))}
      </ul>
    </div>
  );
};

export default AllMyBookClubs;
