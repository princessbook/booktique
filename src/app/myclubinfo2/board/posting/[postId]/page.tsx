'use client';

import {
  createPost,
  fetchSinglePost,
  updatePost
} from '@/utils/postAPIs/postAPI';
import { getUserId } from '@/utils/userAPIs/authAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const page = ({ params }: { params: { postId: string } }) => {
  //url에서 clubId와 postId를 세팅
  const router = useRouter();
  const searchParams = useSearchParams();
  const { postId } = params;

  const [isModify, setIsModify] = useState(false);
  const [clubId, setClubId] = useState<string | null>('');

  //뮤테이션
  const queryClient = useQueryClient();

  const addPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', clubId] });
    }
  });

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', clubId] });
    }
  });

  useEffect(() => {
    if (searchParams.has('clubId')) {
      setClubId(searchParams.get('clubId'));
    }
    if (searchParams.has('isModify')) {
      setIsModify(true);
    }
    if (isModify) {
      fetchDefaultPost(postId);
    }
    fetchUserData();
  }, [postId, clubId]);

  // user정보 fetch
  const [userUID, setUserUID] = useState('');
  const fetchUserData = async () => {
    const res = await getUserId();
    if (res) {
      setUserUID(res);
    }
  };

  // 수정 모드면 기존의 데이터를 세팅
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const fetchDefaultPost = async (postId: string) => {
    const data = await fetchSinglePost(postId);
    console.log(data);
    if (data.title && data.content) {
      setTitle(data.title);
      setContent(data.content);
    }
  };

  if (!clubId) return <></>;

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  //submit 될 때
  const handleSubmit = () => {
    if (!isModify) {
      const newPost = {
        id: postId,
        title,
        content,
        club_id: clubId,
        user_id: userUID
      };
      addPostMutation.mutate(newPost);
      //여기서 벨리데이션 넣어도 될 듯
    }
    if (isModify) {
      const updatePost = {
        id: postId,
        title,
        content
      };
      updatePostMutation.mutate(updatePost);
    }
  };

  return (
    <div>
      <input
        placeholder='제목'
        defaultValue={title}
        onChange={(e) => handleChangeTitle(e)}
      />
      <textarea
        placeholder='내용'
        defaultValue={content}
        onChange={(e) => handleChangeContent(e)}
      />
      <button onClick={handleSubmit}>저장</button>
    </div>
  );
};

export default page;
