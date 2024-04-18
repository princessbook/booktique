import React from 'react';
import useUserSentences from '@/hooks/mypage/useUserSentences';
import SentenceItem from './SentenceItem';
const AllMySentences = async ({ userId }: { userId: string }) => {
  const data = await useUserSentences(userId);
  const { userSentences, clubsData } = data;
  return (
    <div>
      <ul>
        {userSentences.map((sentence) => {
          const club = clubsData?.find((club) => club.id === sentence.club_id);
          return (
            <SentenceItem key={sentence.id} sentence={sentence} club={club} />
          );
        })}
      </ul>
    </div>
  );
};

export default AllMySentences;
