'use client';

import { fetchSinglePost } from '@/utils/postAPIs/postAPI';
import { getUserId } from '@/utils/userAPIs/authAPI';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const page = ({ params }: { params: { postId: string } }) => {
  //url에서 clubId와 postId를 세팅
  const router = useRouter();
  const searchParams = useSearchParams();
  const { postId } = params;

  const [isModify, setIsModify] = useState(false);
  const [clubId, setClubId] = useState<string | null>('');

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
  console.log(clubId);

  console.log(postId);
  return (
    <div>
      <input placeholder='제목' defaultValue={title} />
      <textarea placeholder='내용' defaultValue={content} />
    </div>
  );
};

export default page;
