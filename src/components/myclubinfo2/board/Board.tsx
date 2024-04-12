'use client';

import { fetchPosts } from '@/utils/postAPIs/postAPI';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import ArticleTimeStamp from './boardDetail/ArticleTimeStamp';

const Board = ({ clubId }: { clubId: string }) => {
  const {
    data: posts,
    error,
    isLoading
  } = useQuery({
    queryKey: ['posts', clubId],
    queryFn: fetchPosts,
    staleTime: 1000 * 120
  });

  if (isLoading && !posts) return <div>로딩중</div>;

  if (error) return <div>에러: {error.message}</div>;

  return (
    <div>
      {posts?.map(
        (
          post: any //FIXME - query는 타입명시 필요
        ) => (
          <div key={post.id} className=' border-b'>
            <div className='m-4'>
              <Link
                href={`/myclubinfo2/board/detail/${post.id}?clubId=${clubId}`}>
                <section className='flex gap-1 items-center'>
                  {post.profile?.photo_URL && (
                    <Image
                      className='rounded-full w-6 h-6'
                      src={post.profile?.photo_URL}
                      alt='유저 프로필'
                      width={24}
                      height={24}
                    />
                  )}
                  <p className={'text-xs'}>{post.profile?.display_name}</p>
                  <ArticleTimeStamp created_at={post.created_at} />
                </section>
                <section className='mt-2 min-h-[90px] w-full'>
                  <p className=' font-bold line-clamp-2'>{post.title}</p>
                  <p className='mt-1 mb-1 text-xs'>{post.content}</p>
                </section>
              </Link>
            </div>
          </div>
        )
      )}
      <Link
        href={`/myclubinfo2/board/posting/${crypto.randomUUID()}?clubId=${clubId}`}>
        글 쓰러가기
      </Link>
    </div>
  );
};

export default Board;
