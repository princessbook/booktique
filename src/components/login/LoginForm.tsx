'use client';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { login, signup } from '@/app/login/action';
import { createClient } from '@/utils/supabase/client';
import Input from '@/common/Input';

const LoginForm = () => {
  const [isProfile, setIsProfile] = useState('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  const signInWithGoogle = async (e: any) => {
    e.preventDefault();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `http://localhost:3000/myclub`,
        queryParams: { access_type: 'offline', prompt: 'consent' }
      }
    });
  };

  const kakaoLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `http://localhost:3000/myclub`,
        queryParams: { access_type: 'offline', prompt: 'consent' }
      }
    });
    if (data) {
      return console.log('카카오 로그인 성공');
    }
    if (error) {
      return console.error('카카오 로그인 에러: ', error);
    }
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
  };
  return (
    <div className='flex items-center justify-center'>
      <form className='w-full max-w-md'>
        <div className='mt-[135px]'>
          <img className='mx-auto' src='/login_logo.png' alt='로그인화면로고' />
          <span className='block text-center text-mainblue text-[17px] font-bold my-8'>
            북티크에서 같이 읽으면
            <br />더 이상 책이 어렵지 않아요!
          </span>
        </div>
        <Input
          inputRef={emailInputRef}
          type='email'
          placeholder='e-mail'
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          inputRef={passwordInputRef}
          type='password'
          placeholder='password'
          value={password}
          onChange={handlePasswordChange}
        />
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
        <div className='flex justify-center my-5'>
          <img src='/sns.png' alt='sns' />
        </div>
        <div className='flex justify-center'>
          <a className='mr-4' onClick={signInWithGoogle}>
            <img src='/logo_google.png' alt='google' />
          </a>
          <a className='ml-4' onClick={kakaoLogin}>
            <img src='/login_kakao.png' alt='kakao' />
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
