import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';

const supabase = createClient();

const MainPage = async () => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user?.id) {
    // console.log('1');
    redirect('/login');
  } else {
    redirect('/myclubinfo2');
  }
  return <div>page</div>;
};

export default MainPage;
