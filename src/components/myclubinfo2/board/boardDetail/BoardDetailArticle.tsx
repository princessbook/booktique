'use client';

import { deletePost, fetchPostDetail } from '@/utils/postAPIs/postAPI';
import { getUserId } from '@/utils/userAPIs/authAPI';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ArticleTimeStamp from './ArticleTimeStamp';

const BoardDetailArticle = ({
  postId,
  clubId
}: {
  postId: string;
  clubId: string;
}) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', clubId] });
      router.push('/myclubinfo2');
    }
  });

  const handleDeletePost = async (postId: string, userId: string) => {
    const res = await getUserId();
    if (res !== userId) {
      alert('본인의 글만 수정 삭제 가능합니다');
      return;
    }
    deleteMutation.mutate(postId);
  };

  const handleUpdatePost = async (userId: string) => {
    const res = await getUserId();
    if (res !== userId) {
      alert('본인의 글만 수정 삭제 가능합니다');
      return;
    }
    router.push(
      `/myclubinfo2/board/posting/${postId}?isModify=true&clubId=${clubId}`
    );
  };

  const {
    data: article,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['article', postId],
    queryFn: fetchPostDetail,
    staleTime: 1000 * 120
  });

  if (isLoading || !article || !article.profile) return <>로딩중</>;
  if (isError) return <>에러남</>;

  return (
    <div key={article.id}>
      <section className='h-[54px] flex items-center justify-between sticky top-0 bg-white border-b-[1px] w-full'>
        <p className='ml-4' onClick={() => router.push('/myclubinfo2')}>
          뒤로
        </p>
        <p className='text-[17px] font-bold absolute left-1/2 transform -translate-x-1/2'>
          자유 게시판
        </p>
        <div className='flex mr-4 gap-1'>
          <p onClick={() => handleUpdatePost(article.user_id as string)}>
            수정
          </p>
          <p
            onClick={() =>
              handleDeletePost(article.id, article.user_id as string)
            }>
            삭제
          </p>
        </div>
      </section>
      <section className='m-4'>
        <div className='flex items-center gap-1'>
          {article.profile.photo_URL ? (
            <Image
              className='w-8 h-8 rounded-full'
              src={article.profile.photo_URL}
              alt='유저 프로필'
              width={50}
              height={50}
            />
          ) : (
            <Image
              src='/booktique.png'
              alt='기본 이미'
              width={50}
              height={50}
            />
          )}
          <p className='text-sm'>{article.profile.display_name}</p>
          <ArticleTimeStamp created_at={article.created_at} />
        </div>
        <p className='mt-4 font-bold mb-4 text-[18px] break-words'>
          {article.title}
        </p>
        {article.thumbnail ? (
          <img src={`${article.thumbnail}?${Math.random()}`} alt='fsd' />
        ) : (
          <></>
        )}
        <p className='text-sm'>{article.content}</p>
      </section>
    </div>
  );
};

export default BoardDetailArticle;
