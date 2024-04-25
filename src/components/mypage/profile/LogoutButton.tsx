'use client';
import React from 'react';
import { createClient } from '@/utils/supabase/client';
const LogoutButton = () => {
  const supabase = createClient();
  const handleSignout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
    localStorage.removeItem('timerStarted');
    localStorage.removeItem('lastStartTime');
    localStorage.removeItem('userId');
    localStorage.removeItem('selectedTab');
    localStorage.removeItem('selectedClubId');
  };
  return (
    <div className='w-full h-[54px] mt-6'>
      <button
        className=' text-gray-400 text-[12px] font-medium px-1'
        onClick={handleSignout}>
        로그아웃
      </button>
    </div>
  );
};

export default LogoutButton;
