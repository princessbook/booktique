'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import { generateUniqueNickname } from '@/utils/nicknameGenerator';

const MyNicknameForm = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [newNickname, setNewNickname] = useState<string>('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const maxChar = 12; // 최대 글자 수

  useEffect(() => {
    const getUniqueNickname = async () => {
      const uniqueNickname = await generateUniqueNickname();
      setNickname(uniqueNickname);
    };
    getUniqueNickname();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const supabase = createClient();
        const { data: userData, error } = await supabase.auth.getUser();
        if (error) {
          throw error;
        }

        // 사용자의 프로필 정보 가져오기
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userData?.user.id || '');

        if (profileError) {
          throw profileError;
        }

        if (profileData && profileData.length > 0) {
          // 프로필 정보가 존재하는 경우에는 닉네임 설정 및 등록 상태 설정
          setNickname(profileData[0].display_name);
          console.log('profileData', profileData);
          console.log('profileData.length', profileData.length);

          // setIsRegistered(true);
        } else {
          const email = userData.user.email || '';
          const uniqueNickname = await generateUniqueNickname();
          setNickname(uniqueNickname);
          await supabase.from('profiles').insert([
            {
              id: userData.user.id,
              email,
              display_name: uniqueNickname
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

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
  const handleUpdateNickname = async () => {
    try {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();

      // 프로필 업데이트
      const { data: updateData, error } = await supabase
        .from('profiles')
        .upsert({ display_name: newNickname })
        .eq('id', userData?.user?.id || '');

      if (error) {
        throw error;
      }

      // 닉네임 업데이트 및 폼 초기화
      setNickname(newNickname);
      setNewNickname('');
    } catch (error) {
      console.error('Error updating nickname:', error);
    }
  };

  const handleGoogleLoginInsert = async () => {
    try {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();

      // 프로필 삽입
      const { data, error } = await supabase.from('profiles').insert({
        display_name: newNickname,
        id: userData?.user?.id,
        email: userData?.user?.email
      });

      if (error) {
        throw error;
      }

      // 회원가입 단계로 이동
      redirect('/register/avatar');
    } catch (error) {
      console.error('Error inserting profile:', error);
    }
  };

  const handleButtonClick = async () => {
    // 새로운 닉네임이 입력되었는지 확인
    if (newNickname !== '') {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();

      // 사용자가 이메일을 통해 가입한 경우 닉네임 업데이트
      if (userData?.user?.app_metadata?.provider === 'email') {
        handleUpdateNickname();
      } else {
        // 구글 등의 다른 인증 방식으로 가입한 경우 프로필 삽입
        handleGoogleLoginInsert();
      }
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
          value={newNickname}
          onChange={handleNicknameChange}
        />
        <div className='text-[12px] absolute right-10 top-1/2 translate-y-[-50%]'>{`${charCount}/${maxChar}`}</div>
      </div>
      <span className='text-[12px] text-red-500'>
        북클럽 활동시 표시되는 이름으로 추후 변경 가능합니다.
      </span>
      <button
        className='w-full bg-mainblue h-[48px] rounded-[999px] text-[#fff]'
        onClick={handleButtonClick}>
        다음
      </button>
    </div>
  );
};

export default MyNicknameForm;
