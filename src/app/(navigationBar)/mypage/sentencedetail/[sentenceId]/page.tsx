import SentenceDetail from '@/components/mypage/sentences/SentenceDetail';
import React from 'react';

const MySenetencePage = ({
  params: { sentenceId }
}: {
  params: { sentenceId: string };
}) => {
  return <SentenceDetail sentenceId={sentenceId} />;
};

export default MySenetencePage;
