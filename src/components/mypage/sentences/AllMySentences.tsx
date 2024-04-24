import React from 'react';
import useUserSentences from '@/hooks/mypage/useUserSentences';
import SentenceItem from './SentenceItem';
const AllMySentences = async ({ userId }: { userId: string }) => {
  const userSentences = await useUserSentences(userId);
  return (
    <div>
      <ul>
        {userSentences.map((sentence) => {
          return <SentenceItem key={sentence.id} sentence={sentence} />;
        })}
      </ul>
    </div>
  );
};

export default AllMySentences;
