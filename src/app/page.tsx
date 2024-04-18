import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';

const supabase = createClient();

const MainPage = async () => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect('/login');
  } else {
    redirect('/my-clubs');
  }
  return <div>page</div>;
};

export default MainPage;
