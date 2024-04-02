'use client';
import React, { useState } from 'react';
import Input from '@/common/Input';
import { useInput } from '@/hooks/useInput';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

const RegisterPage = () => {
  const [email, setEmail, clearEmail] = useInput();
  const [password, setPassword, clearPassword] = useInput();
  const [passwordCheck, setPasswordCheck, clearPasswordCheck] = useInput();
  const [nickname, setNickname, clearNickname] = useInput();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const handleRegister = async () => {
    try {
      setIsLoading(true); // 이메일 인증 요청 전에 로딩 상태를 true로 설정
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`
        }
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // 이메일 인증 요청이 완료된 후에 로딩 상태를 false로 설정
      setIsEmailVerified(true);
    }
  };

  return (
    <div className='bg-mainblue h-screen text-[#fff] px-[1rem]'>
      {isLoading ? ( // 로딩 중인 경우 로딩 표시
        <div>Loading........................................</div>
      ) : (
        <>
          {isEmailVerified ? (
            <div>
              <input
                className='py-[12px] text-black rounded-[10px]'
                type='text'
                placeholder='닉네임'
                value={nickname}
                onChange={setNickname}
              />
              <button className='w-[100px] bg-slate-600 h-[48px] rounded-[10px]'>
                중복 확인
              </button>
            </div>
          ) : (
            <section>
              <div className='font-bold mb-[30px] py-[15px] text-center'>
                <h1>회원가입</h1>
              </div>

              <div className='mb-10'>
                <Input
                  label='email'
                  type='email'
                  placeholder='e-mail'
                  value={email}
                  onChange={setEmail}
                />
              </div>
              <div className='mb-10'>
                <Input
                  label='비밀번호'
                  type='password'
                  placeholder='비밀번호'
                  value={password}
                  onChange={setPassword}
                />
                <Input
                  label=''
                  type='password'
                  placeholder='비밀번호 확인'
                  value={passwordCheck}
                  onChange={setPasswordCheck}
                />
              </div>
              <button
                onClick={handleRegister}
                className='w-full py-4 bg-bookyellow text-black font-bold rounded-[10px] mt-48'>
                회원가입 하기
              </button>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default RegisterPage;
