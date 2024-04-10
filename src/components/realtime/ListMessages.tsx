'use client';
import { useMessage } from '@/store/messages';
import React from 'react';
import Message from './Message';

const ListMessage = () => {
  const messages = useMessage((state) => state.messages);
  return (
    <div>
      {messages.map((value, index) => {
        return <Message key={index} message={value} />;
      })}
      <div>sdsd</div>
    </div>
  );
};

export default ListMessage;
