'use client';
import { Imessage, useMessage } from '@/store/messages';
import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';

const ListMessage = ({
  clubsIds
}: {
  clubsIds: (string | null)[] | undefined;
}) => {
  const params = useParams();
  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { messages, addMessage, optimisticIds } = useMessage((state) => state);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel('chat-room')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `club_id=eq.${params.id}`
        },
        async (payload) => {
          if (!optimisticIds.includes(payload.new.id)) {
            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', payload.new.send_from)
              .single();
            if (error) {
              alert('에러입니다');
            } else {
              const newMessage = {
                ...payload.new,
                profiles: data
              };
              addMessage(newMessage as Imessage);
            }
          }
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [messages]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);
  return (
    <div
      className='flex-1 flex flex-col h-full overflow-y-auto'
      ref={scrollRef}>
      {messages.map((value, index) => {
        if (value.club_id === params.id) {
          return <Message key={index} message={value} />;
        }
      })}
    </div>
  );
};

export default ListMessage;
