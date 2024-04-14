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

const PostingPage = ({ params }: { params: { postId: string } }) => {
  //url에서 clubId와 postId를 세팅
  const router = useRouter();
  const searchParams = useSearchParams();
  const { postId } = params;

  const [isModify, setIsModify] = useState(false);
  const [clubId, setClubId] = useState<string | null>('');
  const [isPosting, setIsPosting] = useState(false);

  //뮤테이션
  const queryClient = useQueryClient();

  const addPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', clubId] });
      router.replace('/myclubinfo2');
    }
  });

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['posts', clubId] });
      queryClient.invalidateQueries({ queryKey: ['article', postId] });
      router.replace('/myclubinfo2');
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

  if (!clubId) return <>로딩중</>;

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 100) {
      setTitle(e.target.value);
      setIsPosting(true);
    } else {
      return;
    }
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 2000) {
      setContent(e.target.value);
      setIsPosting(true);
    } else {
      return;
    }
  };

  //submit 될 때
  const handleSubmit = () => {
    if (!isPosting) {
      alert('변경된 부분이 없습니다.');
      return;
    }
    if (title.length === 0 || content.length === 0) {
      alert('제목과 내용은 필수 입력사항입니다.');
      return;
    }
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
      <section className='h-[54px] flex items-center justify-between sticky top-0 bg-white border-b-[1px] w-full'>
        <p className='ml-4' onClick={() => router.push('/myclubinfo2')}>
          뒤로
        </p>
        <p className='text-[17px] font-bold'>글쓰기</p>
        <button className='mr-4' onClick={handleSubmit}>
          저장
        </button>
      </section>
      <div className='m-4 w-[343px]'>
        <input
          className='w-full mb-4 text-base'
          placeholder='제목'
          defaultValue={title}
          onChange={(e) => handleChangeTitle(e)}
        />
        <textarea
          className='w-full mb-4 text-sm h-[800px]'
          placeholder='내용'
          defaultValue={content}
          onChange={(e) => handleChangeContent(e)}
        />
      </div>
    </div>
  );
};

export default PostingPage;
