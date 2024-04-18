import Board from '@/components/my-clubs/board/Board';
import React from 'react';

type Props = {
  params: {
    clubId: string;
  };
};

const BoardPage = (props: Props) => {
  return <Board clubId={props.params.clubId} />;
};

export default BoardPage;
