import React from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from '@/app/chat/[id]/ChatInput';

const ChatInfo = () => {
  return (
    <>
      <ChatMessages />
      <ChatInput />
    </>
  );
};

export default ChatInfo;
