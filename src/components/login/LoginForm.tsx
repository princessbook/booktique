'use client';
import React, { ChangeEvent, useRef, useState } from 'react';
import Input from '@/common/Input';
import Image from 'next/image';
import Link from 'next/link';
import { signInWithSocialLogin } from '@/utils/api/authAPI';
import { createClient } from '@/utils/supabase/client';
import ToastUi from '@/common/ToastUi';
import { useRouter } from 'next/navigation';
import { Tables } from '@/lib/types/supabase';
type Users = Tables<'profiles'>;

const LoginForm = ({ users }: { users: Users[] }) => {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [usersError, setUsersError] = useState<string>('');
  const [pwdError, setPwdError] = useState<string>('');
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    if (usersError) setUsersError('');
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    if (pwdError) setPwdError('');
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userExists = users.some((user) => user.email === email);
    if (!userExists) {
      setUsersError('가입되지 않은 이메일입니다!!');
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) {
        setPwdError('비밀번호가 틀립니다');
      } else {
        // 로그인 성공한 경우 처리할 내용 추가
        router.push('/bookclubs');
      }
    } catch (error) {
      console.log('2', error);
      // setToastMessage('로그인정보가 맞지않습니다');
    }
  };
  const toastStyle = {
    height: '48px',
    top: '48px'
  };
  return (
    <div className='flex items-center justify-center px-4'>
      <form className='w-full max-w-md relative' onSubmit={handleSubmit}>
        <div className='mt-[35px]'>
          <Image
            width={140}
            height={38}
            className='mx-auto'
            src='/login_logo.png'
            alt='로그인화면로고'
          />
          <span className='block text-center text-mainblue text-[17px] font-bold my-8'>
            북티크에서 같이 읽으면
            <br />더 이상 책이 어렵지 않아요!
          </span>
        </div>
        <div className='relative'>
          <Input
            inputRef={emailInputRef}
            name='email'
            type='email'
            placeholder='이메일을 입력해주세요'
            value={email}
            onChange={handleEmailChange}
            error={!!usersError}
          />
          {usersError && (
            <span className=' absolute bottom-[-7px] left-3 block text-center text-red-500 text-[11px]'>
              {usersError}
            </span>
          )}
        </div>
        <div className='relative'>
          <Input
            name='password'
            inputRef={passwordInputRef}
            type='password'
            placeholder='비밀번호를 입력해주세요'
            value={password}
            onChange={handlePasswordChange}
            error={!!pwdError}
          />
          {pwdError && (
            <span className='absolute bottom-[-7px] left-3 block text-center text-red-500 text-[11px]'>
              {pwdError}
            </span>
          )}
        </div>
        <button
          className='w-full mt-[38px] mb-6 py-4 bg-mainblue rounded-[10px] text-[#E9FF8F] font-bold'
          type='submit'>
          로그인
        </button>
        <Image src='/snsTitle.png' width={344} height={24} alt='snstitle' />

        <div className='flex justify-center mb-4'>
          <Image src='/sns.png' width={100} height={50} alt='sns' />
        </div>
        <div className='flex justify-center mb-[74px]'>
          <a
            className='mr-4 cursor-pointer'
            onClick={() => signInWithSocialLogin('google')}>
            <Image src='/logo_google.png' width={60} height={60} alt='google' />
          </a>
          <a
            className='ml-4 cursor-pointer'
            onClick={() => signInWithSocialLogin('kakao')}>
            <Image src='/login_kakao.png' width={60} height={60} alt='kakao' />
          </a>
        </div>
        <div className='text-[#939393] text-center'>
          <span>아직 북티크 회원이 아니신가요? </span>
          <Link className='font-bold' href={`/register`}>
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
