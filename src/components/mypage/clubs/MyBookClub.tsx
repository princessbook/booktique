import React from 'react';
import useUserClubs from '@/hooks/mypage/useUserClubs';
import BookClubItem from './BookClubItem';
import NoContentMessage from '@/components/common/NoContentMessage';
const MyBookClub = async ({ userId }: { userId: string }) => {
  const clubsData = await useUserClubs(userId);
  if (!clubsData) {
    return null;
  }
  const limitedClubs = clubsData.slice(0, 3);
  if (limitedClubs.length === 0) {
    return (
      <div className='mb-[90px]'>
        <NoContentMessage width={98} imgUrl='/no_book.png'>
          가입한 북클럽이 없습니다.
        </NoContentMessage>
      </div>
    );
  }
  return (
    <div className='mt-4'>
      <ul>
        {limitedClubs.map((club) => (
          <BookClubItem key={club.club_id} club={club} />
        ))}
      </ul>
    </div>
  );
};

export default MyBookClub;
