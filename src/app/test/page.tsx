'use client';
import React, { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const Test = () => {
  const router = useRouter();
  const supabase = createClient();
  useEffect(() => {
    const supabase = createClient();

    const fetchData = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          throw error;
        }
        console.log('Logged in user:', data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchData();
  }, []);
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
