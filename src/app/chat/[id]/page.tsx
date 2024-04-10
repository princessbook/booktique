import ChatInput from '@/components/realtime/ChatInput';
import ListMessages from '@/components/realtime/ListMessages';
import InitMessages from '@/store/InitMessages';
import { createClient } from '@/utils/supabase/server';
import React, { Suspense } from 'react';

const ChatPage = async () => {
  const supabase = createClient();
  const { data } = await supabase.from('messages').select('*');
  console.log(data);

  return (
    <Suspense fallback={'loading...'}>
      <ListMessages />
      <InitMessages messages={data || []} />
      <ChatInput clubId={clubId} />
    </Suspense>
  );
};

export default ChatPage;
