'use client';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Input from '@/common/Input';
import { createClient } from '@/utils/supabase/client';
import { generateUniqueNickname } from '@/utils/nicknameGenerator';
import ToastUi from '@/common/ToastUi';
import { useRouter } from 'next/navigation';
import { validateEmail, validatePassword } from '@/utils/validation';
import Link from 'next/link';

const RegisterForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [emailError, setEmailError] = useState('');
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmInputRef = useRef<HTMLInputElement>(null);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 이메일, 비밀번호, 비밀번호 확인의 유효성 검사를 통해 버튼 활성/비활성 상태를 설정
    setIsButtonDisabled(
      !(
        validateEmail(email) &&
        validatePassword(password) &&
        password === passwordConfirm
      )
    );
  }, [email, password, passwordConfirm]);

  const handleRegister = async () => {
    if (isRegistering) return; // 이미 회원가입 중이면 추가 동작을 방지
    setIsRegistering(true); // 회원가입 시작 시, 버튼 비활성화
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
          '비밀번호는 영문 대문자, 소문자, 숫자를 포함하고, 6~20자로 이루어져야 합니다.'
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
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userData && userData.user?.id) {
        router.push('/register/set-nickname');
      } else {
        throw new Error('회원의 ID를 가져올 수 없습니다.');
      }
      await supabase
        .from('profiles')
        .insert([{ email, display_name: nickname }]);
      setToastMessage('회원가입이 완료되었습니다!');
    } catch (error) {
      console.error(error);
      setToastMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsRegistering(false);
    }
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
        '비밀번호가 일치하지않고, 비밀번호는 영문 대문자, 소문자, 숫자를 포함하고, 6~20자로 이루어져야 합니다. '
      );
    } else if (!validatePassword(inputPassword)) {
      setPasswordError(
        '비밀번호는 영문 대문자, 소문자, 숫자를 포함하고, 6~20자로 이루어져야 합니다.'
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
    } else if (!validatePassword(password)) {
      setPasswordError(
        '비밀번호는 영문 대문자, 소문자, 숫자를 포함하고, 6~20자로 이루어져야 합니다.'
      );
    } else {
      setPasswordError('');
    }
  };

  return (
    <>
      <div className='mx-[1rem] h-full relative'>
        <section>
          <div className='font-bold  relative mb-[30px] py-[15px] text-center border-b-[1px]'>
            <h1>회원가입</h1>
            <Link href={`/login`}>
              <svg
                width='10'
                height='16'
                viewBox='0 0 10 16'
                fill='none'
                className='absolute top-1/2 translate-y-[-50%] left-[6px]'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M8.24978 14.9688L1.37478 8.09375L8.43773 1.03125'
                  stroke='#292929'
                  strokeWidth='1.6'
                  strokeLinecap='round'
                />
              </svg>
            </Link>
          </div>

          <div className='mb-10'>
            <Input
              name='email'
              inputRef={emailInputRef}
              label='email'
              type='email'
              placeholder='e-mail'
              value={email}
              onChange={handleEmailChange}
            />
            <p className=' text-[#939393] text-[12px]'>{emailError}</p>
          </div>
          <div className='mb-10'>
            <Input
              name='password'
              inputRef={passwordInputRef}
              label='비밀번호'
              type='password'
              placeholder='비밀번호'
              value={password}
              onChange={handlePasswordChange}
            />
            <Input
              name='passwordCheck'
              inputRef={passwordConfirmInputRef}
              label='비밀번호확인'
              type='password'
              placeholder='비밀번호 확인'
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />
            <p className='text-[#939393] text-[12px]'>{passwordError}</p>
          </div>
          <button
            onClick={handleRegister}
            disabled={isButtonDisabled} // 버튼의 disabled 속성을 동적으로 설정
            className={`w-full block text-center py-4 bg-mainblue text-bookyellow font-bold rounded-[10px] mt-40 absolute bottom-14 ${
              isButtonDisabled
                ? 'cursor-not-allowed bg-slate-100 text-slate-300'
                : ''
            }`}>
            회원가입 하기
          </button>
          <ToastUi
            duration={1000}
            style={{}}
            onClose={() => setToastMessage('')}
            message={toastMessage}
            isSuccess={!toastMessage.startsWith('회원가입에 실패')}
          />
        </section>
      </div>
    </>
  );
};

export default RegisterForm;
