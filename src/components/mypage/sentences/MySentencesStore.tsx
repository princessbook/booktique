import React from 'react';
import Link from 'next/link';
import useUserSentences from '@/hooks/mypage/useUserSentences';
import SentenceItem from './SentenceItem';
const MySentencesStore = async ({ userId }: { userId: string }) => {
  const { userSentences, clubsData } = await useUserSentences(userId);

  const firstThreeSentences = userSentences.slice(0, 3);
  return (
    <div className='mt-6'>
      <ul>
        {firstThreeSentences.map((sentence) => {
          const club = clubsData?.find((club) => club.id === sentence.club_id);
          return (
            <SentenceItem key={sentence.id} sentence={sentence} club={club} />
          );
        })}
      </ul>
    </div>
  );
};

export default MySentencesStore;
