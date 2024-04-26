import React from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from '@/app/chat/[id]/ChatInput';

const ChatInfo = ({ id }: { id: string }) => {
  return (
    <>
      <ChatMessages id={id} />
      <ChatInput />
    </>
  );
};

export default ChatInfo;
