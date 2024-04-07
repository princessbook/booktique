'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import { generateUniqueNickname } from '@/utils/nicknameGenerator';

const MyNicknameForm = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [newNickname, setNewNickname] = useState<string>('');
  const [charCount, setCharCount] = useState(0);
  const maxChar = 12; // 최대 글자 수

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    // 최대 글자 수 제한
    if (inputText.length <= maxChar) {
      // 현재 글자 수 업데이트
      setCharCount(inputText.length);
      // 입력된 닉네임 업데이트
      setNewNickname(inputText);
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      const supabase = createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user?.id || '');
        if (error) {
          throw error;
        }
        if (data && data.length > 0) {
          setNickname(data[0].display_name);
        }
      } catch (error) {
        console.log(error);
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
      const { data, error } = await supabase
        .from('profiles')
        .update({ display_name: newNickname })
        .eq('id', user?.id || '');
      if (error) {
        throw error;
      }
      setNickname(newNickname);
      setNewNickname('');
      window.location.href = '/register/avatar';
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='px-[12px] h-full '>
      <img
        className='mt-[114px] mb-5'
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
        <input
          id='nickname'
          className='py-[12px] pl-2 border-b-black border-b-2 text-black w-full'
          type='text'
          placeholder='닉네임'
          value={newNickname !== '' ? newNickname : nickname ?? ''}
          onChange={handleNicknameChange}
        />
        <div className='text-[12px] absolute right-10 top-1/2 translate-y-[-50%]'>{`${charCount}/${maxChar}`}</div>
      </div>
      <span className='text-[12px] text-red-500'>
        북클럽 활동시 표시되는 이름으로 추후 변경 가능합니다.
      </span>
      <button
        className='w-full bg-mainblue h-[48px] rounded-[999px] text-[#fff]'
        onClick={handleUpdateNickname}>
        다음
      </button>
    </div>
  );
};

export default MyNicknameForm;
