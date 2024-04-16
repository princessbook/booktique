import ChatInput from './ChatInput';
import ChatMessages from '@/components/realtime/ChatMessages';
import { createClient } from '@/utils/supabase/server';
import React, { Suspense } from 'react';

const ChatPage = async () => {
  // const supabase = createClient();
  // const { data: allChat } = await supabase
  //   .from('messages')
  //   .select('*,profiles(id,display_name,photo_URL)');
  // console.log('뭘까 도대체', allChat);
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;
  return (
    <Suspense fallback={'loading...'}>
      <ChatMessages />
      <ChatInput />
    </Suspense>
  );
};

export default ChatPage;
