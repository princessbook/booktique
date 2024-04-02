'use client';
import { useInput } from '@/hooks/useInput';
import { supabase } from '@/lib/supabase';
import React from 'react';

const RegisterPage = () => {
  const [email, setEmail, clearEmail] = useInput();
  const [password, setPassword, clearPassword] = useInput();
  const [passwordCheck, setPasswordCheck, clearPasswordCheck] = useInput();
  const [nickname, setNickname, clearNickname] = useInput();

  const handleRegister = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
          data: {
            nickname
          }
        }
      });
      if (error) {
        throw error;
      }
      await supabase
        .from('profiles')
        .insert([{ email, display_name: nickname }]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className='bg-mainblue h-screen text-[#fff] px-[1rem]'>
      <div className='font-bold mb-[30px] py-[15px] text-center'>
        <h1>회원가입</h1>
      </div>
      <div>
        <label htmlFor='email'>e-mail</label>
        <div>
          <input
            className='py-[12px] mb-10 text-black rounded-[10px]'
            id='email'
            type='email'
            placeholder='e-mail'
            value={email}
            onChange={setEmail}
          />
          <button className='w-[100px] bg-slate-600 h-[48px] rounded-[10px]'>
            이메일인증
          </button>
        </div>
      </div>
      <div className='mb-[80px]'>
        <label htmlFor='password'>비밀번호</label>
        <input
          type='password'
          id='password'
          className='block py-[12px] w-full mb-2 text-black rounded-[10px]'
          placeholder='비밀번호'
          value={password}
          onChange={setPassword}
        />
        {/* <input
          type='password'
          className='block py-[12px] w-full text-black rounded-[10px]'
          placeholder='비밀번호 확인'
          value={passwordCheck}
          onChange={setPasswordCheck}
        /> */}
      </div>
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
      <button
        onClick={handleRegister}
        className='w-full py-4 bg-bookyellow text-black font-bold rounded-[10px] mt-48'>
        회원가입 하기
      </button>
    </section>
  );
};

export default RegisterPage;
