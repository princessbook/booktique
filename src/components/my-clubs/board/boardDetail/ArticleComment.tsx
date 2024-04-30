'use client';

import {
  deletePostComment,
  fetchPostComments
} from '@/utils/postAPIs/postCommentAPIs/commentAPI';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import ArticleTimeStamp from './ArticleTimeStamp';
import { getUserId } from '@/utils/userAPIs/authAPI';
import { useEffect, useState } from 'react';
import Loading from '@/components/common/Loading';

const ArticleComment = ({ postId }: { postId: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['comments', postId],
    queryFn: fetchPostComments
  });

  const queryClient = useQueryClient();

  //삭제 로직
  const deleteCommentMutation = useMutation({
    mutationFn: deletePostComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    }
  });

  const handleDeleteComment = (id: string) => {
    deleteCommentMutation.mutate(id);
  };

  //user정보 get
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const getUser = async () => {
      const res = await getUserId();
      if (!res) return;
      setUserId(res);
    };
    getUser();
  }, []);

  if (!data || isLoading)
    return (
      <>
        <Loading />
      </>
    );
  return (
    <div className='flex-1 overflow-auto mb-[74px]'>
      <div className=' h-[52px] px-2 text-sm text-fontGrayBlue items-center flex border-b-[1px]'>
        <p> 💬 댓글 {data.length}</p>
      </div>
      {data.map((comment) => (
        <div key={comment.id} className='flex items-center gap-1 my-4 mx-4'>
          {comment.profile?.photo_URL ? (
            <Image
              className='w-8 h-8 rounded-full'
              src={comment.profile?.photo_URL}
              alt='야호링'
              width={32}
              height={32}
            />
          ) : (
            <Image
              src={'/defaultImage.svg'}
              alt='야호링'
              width={32}
              height={32}
              className=' w-8 h-8 rounded-full'
            />
          )}
          <div className='gap-1'>
            <div className='flex gap-1 items-center'>
              <p className=' text-sm'>{comment.profile?.display_name}</p>
              <ArticleTimeStamp created_at={comment.created_at} />
              {userId === comment.user_id ? (
                <p
                  className='text-xs text-red-300'
                  onClick={() => handleDeleteComment(comment.id)}>
                  삭제
                </p>
              ) : (
                <></>
              )}
            </div>
            <p className='text-sm'>{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleComment;
