import ChatInput from '@/components/realtime/ChatInput';
import ChatMessages from '@/components/realtime/ChatMessages';
import React, { Suspense } from 'react';

const ChatPage = async () => {
  // const supabase = createClient();
  // const { data: allChat } = await supabase
  //   .from('messages')
  //   .select('*,profiles(id,display_name,photo_URL)');
  // console.log('뭘까 도대체', allChat);

  return (
    <Suspense fallback={'loading...'}>
      <ChatMessages />
      <ChatInput />
    </Suspense>
  );
};

export default ChatPage;
