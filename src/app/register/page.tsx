'use client';
import React, { useEffect, useState } from 'react';
import Input from '@/common/Input';
import { useInput } from '@/hooks/useInput';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import SelectForm from '@/components/register/SelectForm';
import booktique from '../../../public/booktique.png';

const RegisterPage = () => {
  const [email, setEmail, clearEmail] = useInput();
  const [password, setPassword, clearPassword] = useInput();
  const [passwordCheck, setPasswordCheck, clearPasswordCheck] = useInput();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [nickname, setNickname] = useState<string>('');
  const supabase = createClient();
  // const { data, error } = await supabase.auth.getUser();

  const handleRegister = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password
      });
      if (error) {
        throw error;
      }
      await supabase
        .from('profiles')
        .insert([{ email, display_name: nickname }]);
      alert('회원가입이 완료되었습니다');
      setIsEmailVerified(true);
    } catch (error) {
      console.error(error);
    }
  };

  const generateUniqueNickname = async () => {
    const baseNickname = '북티크';
    let randomSuffix = '';

    for (let i = 0; i < 7; i++) {
      randomSuffix += Math.floor(Math.random() * 10);
    }
    let randomNickname = baseNickname + randomSuffix;
    while (true) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('display_name', nickname);
      if (error) {
        console.error(error);
        return '';
      }
      if (!data || data.length === 0) {
        return randomNickname;
      }
      randomSuffix = '';
      for (let i = 0; i < 7; i++) {
        randomSuffix += Math.floor(Math.random() * 10);
      }
      randomNickname = baseNickname + randomSuffix;
    }
  };
  useEffect(() => {
    const getUniqueNickname = async () => {
      const uniqueNickname = await generateUniqueNickname();
      setNickname(uniqueNickname);
    };
    getUniqueNickname();
  }, []);

  return (
    <>
      {isEmailVerified ? (
        <SelectForm />
      ) : (
        <div className='bg-mainblue h-screen text-[#fff] px-[1rem]'>
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
        </div>
      )}
    </>
  );
};

export default RegisterPage;
