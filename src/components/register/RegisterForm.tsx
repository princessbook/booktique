'use client';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Input from '@/common/Input';
import { useInput } from '@/hooks/useInput';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import SelectForm from '@/components/register/SelectForm';
import booktique from '../../../public/booktique.png';

const RegisterForm = () => {
  const [email, setEmail] = useState<string>('');
  const [, , clearNickname] = useInput();
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [nickname, setNickname] = useState<string>('');
  const [emailError, setEmailError] = useState('');
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmInputRef = useRef<HTMLInputElement>(null);

  const handleRegister = async () => {
    try {
      // 이메일 유효성 검사
      if (!validateEmail(email)) {
        setEmailError('이메일 형식을 지켜주세요');
        emailInputRef.current?.focus();
        return;
      }

      // 비밀번호 유효성 검사
      if (!validatePassword(password)) {
        setPasswordError(
          '비밀번호는 영문 대문자, 소문자, 숫자, 특수문자 중 최소 2가지 이상을 포함하고, 6~20자로 이루어져야 합니다.'
        );
        passwordInputRef.current?.focus();
        return;
      }

      // 비밀번호 확인
      if (password !== passwordConfirm) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
        passwordConfirmInputRef.current?.focus();
        return;
      }
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
  const validateEmail = (inputEmail: string) => {
    // Email 형식 유효성 검사
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(inputEmail);
  };
  const validatePassword = (inputPassword: string) => {
    // 비밀번호 형식 유효성 검사
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,20}$/;
    return regex.test(inputPassword);
  };

  useEffect(() => {
    const getUniqueNickname = async () => {
      const uniqueNickname = await generateUniqueNickname();
      setNickname(uniqueNickname);
    };
    getUniqueNickname();
  }, []);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    if (validateEmail(inputEmail)) {
      setEmailError('');
    } else {
      setEmailError('이메일 형식을 지켜주세요');
    }
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    if (!validatePassword(inputPassword) && inputPassword !== passwordConfirm) {
      setPasswordError(
        '비밀번호가 일치하지않고, 비밀번호는 영문 대문자, 소문자, 숫자, 특수문자 중 최소 2가지 이상을 포함하고, 6~20자로 이루어져야 합니다. '
      );
    } else if (!validatePassword(inputPassword)) {
      setPasswordError(
        '비밀번호는 영문 대문자, 소문자, 숫자, 특수문자 중 최소 2가지 이상을 포함하고, 6~20자로 이루어져야 합니다.'
      );
    } else if (inputPassword !== passwordConfirm) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputPasswordConfirm = e.target.value;
    setPasswordConfirm(inputPasswordConfirm);
    if (inputPasswordConfirm !== password) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }
  };
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
                inputRef={emailInputRef}
                label='email'
                type='email'
                placeholder='e-mail'
                value={email}
                onChange={handleEmailChange}
              />
              <p className=' text-bookyellow text-[12px]'>{emailError}</p>
            </div>
            <div className='mb-10'>
              <Input
                inputRef={passwordInputRef}
                label='비밀번호'
                type='password'
                placeholder='비밀번호'
                value={password}
                onChange={handlePasswordChange}
              />
              <Input
                inputRef={passwordConfirmInputRef}
                label=''
                type='password'
                placeholder='비밀번호 확인'
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
              />
              <p className='text-bookyellow text-[12px]'>{passwordError}</p>
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

export default RegisterForm;