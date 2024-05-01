import React from 'react';
import useUserClubs from '@/hooks/mypage/useUserClubs';
import Link from 'next/link';
import BookClubItem from './BookClubItem';
import NoContentMessage from '@/components/common/NoContentMessage';
const AllMyBookClubs = async ({ userId }: { userId: string }) => {
  const clubData = await useUserClubs(userId);
  if (clubData?.length === 0) {
    return (
      <div className='mt-[50px]'>
        <NoContentMessage width={125} imgUrl='/no_book.png'>
          가입한 북클럽이 없습니다.
        </NoContentMessage>
      </div>
    );
  }
  return (
    <div>
      <ul>
        {clubData?.map((club) => (
          <BookClubItem key={club.club_id} club={club} />
        ))}
      </ul>
    </div>
  );
};

export default AllMyBookClubs;
