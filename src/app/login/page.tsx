'use client';
import React from 'react';
import { useInput } from '@/hooks/useInput';
import { useRouter } from 'next/navigation';
import { fetchUser } from '@/hooks/fetchDB';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const LoginPage = () => {
  const [email, setEmail, clearEmail] = useInput();
  const [password, setPassword, clearPassword] = useInput();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (data?.session) {
      router.refresh();
      const userData = await fetchUser();
    }
  };

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    });
  };

  const loginWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao'
    });
  };

  return (
    <div>
      LoginPage
      <div>
        <input
          className='py-[12px] mb-10 text-black rounded-[10px]'
          id='email'
          type='email'
          placeholder='e-mail'
          value={email}
          onChange={setEmail}
        />
      </div>
      <div>
        <label htmlFor='password'>비밀번호</label>
        <input
          type='password'
          id='password'
          className='block py-[12px] w-full mb-2 text-black rounded-[10px]'
          placeholder='비밀번호'
          value={password}
          onChange={setPassword}
        />
      </div>
      <button onClick={handleSignIn}>로그인</button>
      <button onClick={signInWithGoogle}>구글로그인</button>
      <button onClick={loginWithKakao}>카카오로그인</button>
    </div>
  );
};

export default LoginPage;
