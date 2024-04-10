'use client';
import { createClient } from '@/utils/supabase/client';
import React from 'react';

const ChatInput = ({ clubId }: { clubId: string }) => {
  const supabase = createClient();
  const handleSendMessage = async (text: string) => {
    // supabase 불러오기
    const { data, error } = await supabase
      .from('messages')
      .insert({ text, sent_by: clubId });
    if (error) {
      console.log(error);
    }
  };
  return (
    <div className='p-1'>
      <input
        placeholder='send message'
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
      />
    </div>
  );
};

export default ChatInput;
