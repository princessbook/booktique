'use client';

import { fetchPosts } from '@/utils/postAPIs/postAPI';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import ArticleTimeStamp from './boardDetail/ArticleTimeStamp';
import NoContentMessage from '@/components/common/NoContentMessage';

const Board = ({ clubId }: { clubId: string }) => {
  const {
    data: posts,
    error,
    isLoading,
    isPending
  } = useQuery({
    queryKey: ['posts', clubId],
    queryFn: fetchPosts,
    staleTime: 1000 * 120
  });

  if (isLoading && !posts && isPending) return <div>로딩중</div>;

  if (error) return <div>에러: {error.message}</div>;

  return (
    <div className='w-full pb-[74px]'>
      {posts?.length === 0 && (
        <NoContentMessage imgUrl='/no_post.png' width={121}>
          {' '}
          클럽원들과 자유롭게 이야기를 나눠보세요.
        </NoContentMessage>
      )}
      {posts?.map(
        (
          post //FIXME - query는 타입명시 필요
        ) => (
          <div key={post.id} className=' border-t'>
            <div className='m-4 flex'>
              <Link
                className='w-full'
                href={`/board/detail/${post.id}?clubId=${clubId}`}>
                <section className='flex gap-1 items-center'>
                  {post.profile?.photo_URL ? (
                    <Image
                      className='rounded-full w-6 h-6'
                      src={`${post.profile?.photo_URL}`}
                      alt='유저 프로필'
                      width={24}
                      height={24}
                    />
                  ) : (
                    <Image
                      className='rounded-full w-6 h-6'
                      src={'/defaultImage.svg'}
                      alt='유저 프로필'
                      width={24}
                      height={24}
                    />
                  )}
                  <p className={'text-xs'}>{post.profile?.display_name}</p>
                  <ArticleTimeStamp created_at={post.created_at} />
                </section>
                <section className='mt-2 min-h-[70px] w-full flex justify-between'>
                  <div className='flex flex-col'>
                    <p className=' font-bold w-full break-words line-clamp-2'>
                      {post.title}
                    </p>
                    <p className='mt-1 mb-1 text-xs break-words line-clamp-2'>
                      {post.content}
                    </p>
                    <p className='text-xs text-fontGrayBlue'>{`💬 ${
                      (post.post_comments[0] as unknown as any).count // https://github.com/supabase/supabase/issues/20562
                    }`}</p>
                  </div>
                  {post.thumbnail ? (
                    <Image
                      src={`${post.thumbnail}`}
                      alt='썸네일'
                      width={88}
                      height={88}
                    />
                  ) : (
                    <></>
                  )}
                </section>
              </Link>
            </div>
          </div>
        )
      )}
      <div className='flex px-4 justify-end w-full'>
        <Link
          className='py-[15px] px-[20px] fixed bottom-[110px] text-white rounded-full shadow-lg hover:shadow-xl transition duration-300 font-bold cursor-pointer bg-mainblue'
          href={`/board/posting/${crypto.randomUUID()}?clubId=${clubId}`}>
          글 쓰러가기
        </Link>
      </div>
    </div>
  );
};

export default Board;
