'use client';
import React, { useEffect } from 'react';
import { isClientSession } from '@/hooks/clientSession';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const Test = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const test = async () => {
    try {
      const { supabase, user } = await isClientSession();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id || '');
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    test();
  }, []);
  const handleSignout = async () => {
    console.log('!@3');
    await supabase.auth.signOut();
    console.log('2');
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
