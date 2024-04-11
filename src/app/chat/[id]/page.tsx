import ChatInput from '@/components/realtime/ChatInput';
import ChatMessages from '@/components/realtime/ChatMessages';
import ListMessages from '@/components/realtime/ListMessages';
import InitMessages from '@/store/InitMessages';
import { createClient } from '@/utils/supabase/server';
import { useParams } from 'next/navigation';
import React, { Suspense } from 'react';

const ChatPage = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  console.log('user', user?.id);
  const { data: allChat } = await supabase
    .from('messages')
    .select('*,profiles(id,display_name,photo_URL)');
  console.log('뭘까 도대체', allChat);

  return (
    <Suspense fallback={'loading...'}>
      <ChatMessages />
      <ChatInput />
    </Suspense>
  );
};

export default ChatPage;
