'use client';
import React from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const Test = () => {
  const router = useRouter();
  const supabase = createClient();
  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <div>
      page
      <button onClick={handleSignout}>로그아웃</button>
    </div>
  );
};

export default Test;
