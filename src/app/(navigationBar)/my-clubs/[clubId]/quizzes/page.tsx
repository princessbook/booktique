import QuizArchiving from '@/components/my-clubs/QuizArchiving';
import React from 'react';

type Props = {
  params: {
    clubId: string;
  };
};

const QuizPage = (props: Props) => {
  return <QuizArchiving clubId={props.params.clubId} />;
};

export default QuizPage;
