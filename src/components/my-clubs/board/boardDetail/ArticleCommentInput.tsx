'use client';

import { createPostComment } from '@/utils/postAPIs/postCommentAPIs/commentAPI';
import { getUserId } from '@/utils/userAPIs/authAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const ArticleCommentInput = ({
  postId,
  clubId
}: {
  postId: string;
  clubId: string;
}) => {
  const [content, setContent] = useState('');
  const [isWrite, setIsWrite] = useState(false);

  const queryClient = useQueryClient();

  const submitCommentMutation = useMutation({
    mutationFn: createPostComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts', clubId] });
    }
  });

  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    if (content.length > 0) {
      setIsWrite(true);
    } else {
      setIsWrite(false);
    }
  };

  const handleSubmit = async () => {
    if (!isWrite) {
      alert('작성해라'); //NOTE - 토스트ui 변경 필요 유저 id가 없으면 막아야한다 근데 클럽 가입에서 막나?
      return;
    }
    const res = await getUserId();
    if (!res) return;
    const newComment = {
      user_id: res,
      content,
      post_id: postId
    };
    submitCommentMutation.mutate(newComment);
    setContent('');
  };

  return (
    <div className='w-full flex h-[74px] bg-grayBg'>
      <div className=''>
        <div className='w-full flex h-[74px] items-center justify-center gap-2 mx-4'>
          <input
            className='border w-10/12 h-2/3 rounded-[10px] text-sm'
            placeholder='  댓글을 입력해주세요'
            onChange={(e) => handleChangeComment(e)}
            value={content}
          />
          <button
            className='rounded-full bg-fontGrayBlue w-12 h-12 text-white'
            onClick={handleSubmit}>
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCommentInput;
