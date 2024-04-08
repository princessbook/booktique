'use client';

import { fetchPostDetail } from '@/utils/postAPIs/postAPI';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

const BoardDetailArticle = ({ postId }: { postId: string }) => {
  const {
    data: article,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['article', postId],
    queryFn: fetchPostDetail,
    staleTime: 1000 * 120
  });

  if (isLoading || !article) return <>로딩중</>;
  if (isError) return <>에러남</>;

  return (
    <div key={article.id}>
      <header>
        <p>{article.title}</p>
        {article.profile?.photo_URL ? (
          <Image
            src={article.profile?.photo_URL}
            alt='유저 프로필'
            width={50}
            height={50}
          />
        ) : (
          <></>
        )}
      </header>
      <div></div>
    </div>
  );
};

export default BoardDetailArticle;
