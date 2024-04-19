'use client';

import React, { useEffect, useState } from 'react';
import BoardDetailArticle from '@/components/my-clubs/board/boardDetail/BoardDetailArticle';
import { useSearchParams } from 'next/navigation';
import ArticleComment from '@/components/my-clubs/board/boardDetail/ArticleComment';
import ArticleCommentInput from '@/components/my-clubs/board/boardDetail/ArticleCommentInput';

const BoardDetailPage = ({ params }: { params: { postId: string } }) => {
  const [clubId, setClubId] = useState<string | null>('');
  const searchParams = useSearchParams();
  const { postId } = params;

  useEffect(() => {
    const getClubId = () => {
      const getClubId = searchParams.get('clubId');
      setClubId(getClubId);
    };
    getClubId();
  }, []);
  if (!clubId) return <>클럽 아이디가 없습니다</>;

  return (
    <div className='mb-[78px] overflow-y-auto'>
      <BoardDetailArticle postId={postId} clubId={clubId} />
      <ArticleComment postId={postId} />
      <ArticleCommentInput postId={postId} clubId={clubId} />
    </div>
  );
};

export default BoardDetailPage;
