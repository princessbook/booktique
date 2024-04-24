import React from 'react';
import useUserSentences from '@/hooks/mypage/useUserSentences';
import SentenceItem from './SentenceItem';
const MySentencesStore = async ({ userId }: { userId: string }) => {
  const userSentences = await useUserSentences(userId);

  const firstThreeSentences = userSentences.slice(0, 3);
  return (
    <div className='mt-6'>
      <ul>
        {firstThreeSentences.map((sentence) => {
          return <SentenceItem key={sentence.id} sentence={sentence} />;
        })}
      </ul>
    </div>
  );
};

export default MySentencesStore;
