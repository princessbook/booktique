'use client';
import React from 'react';
import { createClient } from '@/utils/supabase/client';
const LogoutButton = () => {
  const supabase = createClient();
  const handleSignout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };
  return (
    <button
      className='w-full border rounded-md text-gray-400'
      onClick={handleSignout}>
      로그아웃
    </button>
  );
};

export default LogoutButton;
