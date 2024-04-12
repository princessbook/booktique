'use client';

import { deletePost, fetchPostDetail } from '@/utils/postAPIs/postAPI';
import { getUserId } from '@/utils/userAPIs/authAPI';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
      <header>
        <p className=' text-xl'>{article.title}</p>
        <hr />
        <div className='flex'>
          {article.profile.photo_URL ? (
            <Image
              src={article.profile.photo_URL}
              alt='유저 프로필'
              width={50}
              height={50}
            />
          ) : (
            <Image
              src='/public/booktique.png'
              alt='기본 이미'
              width={50}
              height={50}
            />
          )}
          <p>
            {article.profile.display_name} - {article.created_at}
          </p>
          <p onClick={() => handleUpdatePost(article.user_id)}>수정</p>
          <p onClick={() => handleDeletePost(article.id, article.user_id)}>
            삭제
          </p>
        </div>
      </header>
      <hr />
      <p>{article.content}</p>
      <div></div>
    </div>
  );
};

export default BoardDetailArticle;
