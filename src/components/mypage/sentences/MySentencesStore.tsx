import React from 'react';
import useUserSentences from '@/hooks/mypage/useUserSentences';
import SentenceItem from './SentenceItem';
import NoContentMessage from '@/components/common/NoContentMessage';
const MySentencesStore = async ({ userId }: { userId: string }) => {
  const userSentences = await useUserSentences(userId);

  const firstThreeSentences = userSentences.slice(0, 3);
  if (firstThreeSentences.length === 0) {
    return (
      <NoContentMessage imgUrl='/no_sentence.png' width={150}>
        책을 읽고 좋았던 문장을 저장해 <br />
        클럽원들과 함께 나눠 보세요.
      </NoContentMessage>
    );
  }
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
