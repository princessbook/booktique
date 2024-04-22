'use client';

import { IoIosArrowBack } from 'react-icons/io';
import PhotoSection from '@/components/my-clubs/board/posting/PhotoSection';
import {
  createPost,
  fetchSinglePost,
  updatePost
} from '@/utils/postAPIs/postAPI';
import { getUserId } from '@/utils/userAPIs/authAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const PostingPage = ({ params }: { params: { postId: string } }) => {
  //url에서 clubId와 postId를 세팅
  const router = useRouter();
  const searchParams = useSearchParams();
  const { postId } = params;

  const [isModify, setIsModify] = useState(false);
  const [clubId, setClubId] = useState<string | null>('');
  const [isPosting, setIsPosting] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);

  //뮤테이션
  const queryClient = useQueryClient();

  const addPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', clubId] });
      router.replace(`/my-clubs/${clubId}/posts`);
    }
  });

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['posts', clubId] });
      queryClient.invalidateQueries({ queryKey: ['article', postId] });
      router.replace(`/my-clubs/${clubId}/posts`);
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
  const [prev, setPrev] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchDefaultPost = async (postId: string) => {
    setIsLoading(true);
    const data = await fetchSinglePost(postId);
    console.log(data);
    if (data.title && data.content) {
      setTitle(data.title);
      setContent(data.content);
    }
    if (data.thumbnail) {
      setPrev(data.thumbnail);
    }
    setIsLoading(false);
  };

  if (!clubId) return <>로딩중</>;
  if (isLoading) return <>로딩중</>;

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
      handleResizeHeight();
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
        user_id: userUID,
        thumbnail
      };
      addPostMutation.mutate(newPost);
      //여기서 벨리데이션 넣어도 될 듯
    }
    if (isModify) {
      const updatePost = {
        id: postId,
        title,
        content,
        thumbnail
      };
      updatePostMutation.mutate(updatePost);
    }
  };

  //textarea 높이 자동 조절
  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = 'auto'; // 높이 초기화
      textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }
  };

  return (
    <div className='mb-[78px] overflow-y-auto'>
      <div className='fixed w-full'>
        <section className='h-[54px] flex items-center justify-between fixed md:max-w-[375px] bg-white border-b-[1px] w-full'>
          <IoIosArrowBack
            className='ml-4'
            size={25}
            onClick={() => router.push(`/my-clubs/${clubId}/posts`)}
          />
          <p className='text-[17px] font-bold'>글쓰기</p>
          <button className='mr-4' onClick={handleSubmit}>
            저장
          </button>
        </section>
      </div>

      <div className='m-4 min-h-[700px] pt-[54px]'>
        <input
          className='w-full mb-4 text-base focus:outline-none border-b-[1px]'
          placeholder='제목'
          defaultValue={title}
          onChange={(e) => handleChangeTitle(e)}
        />
        <PhotoSection
          setThumbnail={setThumbnail}
          prev={prev}
          isModify={isModify}
          setIsPosting={setIsPosting}
        />
        <textarea
          className='w-full mb-4 text-sm focus:outline-none resize-none mt-2'
          placeholder='내용'
          defaultValue={content}
          onChange={(e) => handleChangeContent(e)}
          ref={textarea}
        />
      </div>
    </div>
  );
};

export default PostingPage;
