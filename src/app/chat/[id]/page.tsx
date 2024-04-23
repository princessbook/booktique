import ChatInfo from '@/components/realtime/ChatInfo';
import ChatInput from './ChatInput';
import ChatMessages from '@/components/realtime/ChatMessages';
import React, { Suspense } from 'react';

const ChatPage = async () => {
  return (
    <Suspense fallback={'loading...'}>
      <ChatInfo />
    </Suspense>
  );
};

export default ChatPage;
