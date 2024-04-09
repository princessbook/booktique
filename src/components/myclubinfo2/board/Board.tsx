'use client';

import { fetchPosts } from '@/utils/postAPIs/postAPI';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

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
      {posts?.map((post) => (
        <div key={post.id} className='border'>
          <Link href={`/myclubinfo2/board/detail/${post.id}?clubId=${clubId}`}>
            <p>{post.title}</p>
            <p>{post.content}</p>
            <p>{post.profile?.display_name}</p>
            {post.profile?.photo_URL && (
              <Image
                src={post.profile?.photo_URL}
                alt='유저 프로필'
                width={20}
                height={20}
              />
            )}
          </Link>
        </div>
      ))}
      <Link
        href={`/myclubinfo2/board/posting/${crypto.randomUUID()}?clubId=${clubId}`}>
        글 쓰러가기
      </Link>
    </div>
  );
};

export default Board;
