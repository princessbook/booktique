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

  if (isLoading && !posts) return <div>로딩중...</div>;

  if (error) return <div>에러: {error.message}</div>;

  // 여기서 posts 데이터를 사용할 수 있습니다.
  console.log(posts);

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id} className='border'>
          <Link href={`/myclubinfo2/board/${post.id}`}>
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
      <Link href='/myclubinfo/board/posting'>글 쓰러가기</Link>
    </div>
  );
};

export default Board;
