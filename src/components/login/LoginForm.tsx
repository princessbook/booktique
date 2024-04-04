'use client';
import React from 'react';
import { login, signup } from '@/app/login/action';
import { createClient } from '@/utils/supabase/client';
const LoginForm = () => {
  const googleLogin = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { queryParams: { access_type: 'offline', prompt: 'consent' } }
    });
    if (data) {
      return console.log('구글 로그인 성공');
    }
    if (error) {
      return console.error('구글 로그인 에러: ', error);
    }
  };
  return (
    <form>
      <label htmlFor='email'>Email:</label>
      <input id='email' name='email' type='email' required />
      <label htmlFor='password'>Password:</label>
      <input id='password' name='password' type='password' required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
      <button onClick={googleLogin}>구글로그인</button>
    </form>
  );
};

export default LoginForm;
