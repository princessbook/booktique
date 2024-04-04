'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const NicknameForm = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [newNickname, setNewNickname] = useState<string>('');

  useEffect(() => {
    const supabase = createClient();

    const fetchUserData = async () => {
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
        console.log('유저', { user });
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
    console.log({ user });
    try {
      const { data: updateData, error } = await supabase
        .from('profiles')
        .upsert({ display_name: newNickname })
        .eq('id', user?.id || '');
      if (error) {
        throw error;
      }
      setNickname(newNickname);
      setNewNickname('');
      console.log('이메일만이에요', updateData);
      // window.location.href = '/register/avatar';
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLoginInsert = async () => {
    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    try {
      const { data, error } = await supabase.from('profiles').insert({
        display_name: newNickname,
        id: user?.id,
        email: user?.email
      });
      if (error) {
        throw error;
      }
      // window.location.href = '/register/avatar';
      console.log('구글만이에요', data);
    } catch (error) {
      console.error('Error inserting profile:', error);
    }
  };

  const handleButtonClick = async () => {
    if (newNickname !== '') {
      const supabase = createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user?.app_metadata?.provider === 'email') {
        // 이메일을 통한 인증인 경우
        handleUpdateNickname();
      } else {
        // 이외의 프로바이더를 통한 인증인 경우(google, naver)
        handleGoogleLoginInsert();
      }
    }
  };

  return (
    <div className='px-[12px]'>
      <input
        className='py-[12px] border-b-black border-b-2 text-black w-full'
        type='text'
        placeholder='닉네임'
        value={newNickname !== '' ? newNickname : nickname ?? ''}
        onChange={(e) => setNewNickname(e.target.value)}
      />
      <button
        className='w-full bg-mainblue h-[48px] rounded-[999px]'
        onClick={handleButtonClick}>
        다음
      </button>
    </div>
  );
};

export default NicknameForm;
