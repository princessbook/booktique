import React from 'react';
import BoardDetailArticle from '@/components/myclubinfo2/board/boardDetail/BoardDetailArticle';

const Page = ({ params }: { params: { postId: string } }) => {
  const { postId } = params;

  return (
    <div>
      <BoardDetailArticle postId={postId} />
    </div>
  );
};

export default Page;
