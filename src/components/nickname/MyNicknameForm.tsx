'use client';
import React, { useEffect, useRef, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Input from '@/common/Input';
import { useRouter } from 'next/navigation';
import { getUserId } from '@/utils/userAPIs/authAPI';
import Image from 'next/image';

const MyNicknameForm = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [newNickname, setNewNickname] = useState<string>('');
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const [charCount, setCharCount] = useState(0);
  const maxChar = 12; // 최대 글자 수
  const router = useRouter();

  const [userId, setuserId] = useState<string | null>(null);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 띄어쓰기 제거
    const inputText = e.target.value.replace(/\s/g, '');
    // 최대 글자 수 제한
    if (inputText.length <= maxChar) {
      // 현재 글자 수 업데이트
      setCharCount(inputText.length);
      // 입력된 닉네임 업데이트
      setNickname(inputText);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const supabase = createClient();
      try {
        const fetchUserId = await getUserId();
        setuserId(fetchUserId);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', fetchUserId || '');
        if (error) {
          throw error;
        }
        if (data && data.length > 0) {
          setNickname(data[0].display_name);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);
  const handleUpdateNickname = async () => {
    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ display_name: nickname })
        .eq('id', user?.id || '');
      if (error) {
        throw error;
      }
      setNickname(nickname);
      setNewNickname('');
      router.push(`/register/set-profile-image`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='mx-[12px] h-full relative'>
      <Image
        width={140}
        height={38}
        className='mb-5 pt-[72px]'
        src='/login_logo.png'
        alt='닉네임화면로고'
      />
      <h1 className='font-bold text-[30px] mb-[100px]'>
        북티크에 오신걸 <br />
        환영합니다
      </h1>
      <label className='text-[14px]' htmlFor='nickname'>
        프로필을 작성하고 북클럽을 찾아보세요
      </label>
      <div className='relative'>
        <Input
          type='text'
          name='nickname'
          inputRef={nicknameInputRef}
          placeholder='닉네임'
          value={nickname || ''}
          onChange={handleNicknameChange}
        />

        <div className='text-[12px] absolute right-10 top-1/3 translate-y-[-20%]'>{`${charCount}/${maxChar}`}</div>
      </div>
      <span className='text-[12px] text-[#939393]'>
        북클럽 활동시 표시되는 이름으로 추후 변경 가능합니다.
      </span>
      <button
        className='w-full absolute bottom-[58px] left-0 bg-mainblue h-[48px] rounded-[999px] text-[#fff]'
        onClick={handleUpdateNickname}>
        다음
      </button>
    </div>
  );
};

export default MyNicknameForm;
