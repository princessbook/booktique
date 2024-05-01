import React from 'react';
import useUserSentences from '@/hooks/mypage/useUserSentences';
import SentenceItem from './SentenceItem';
import Image from 'next/image';
import NoContentMessage from '@/components/common/NoContentMessage';

const AllMySentences = async ({ userId }: { userId: string }) => {
  const userSentences = await useUserSentences(userId);
  if (userSentences.length === 0) {
    return (
      <div>
        <NoContentMessage imgUrl='/no_sentence.png' width={191}>
          {' '}
          책을 읽고 좋았던 문장을 저장해 <br />
          클럽원들과 함께 나눠 보세요.
        </NoContentMessage>
      </div>
    );
  }
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
