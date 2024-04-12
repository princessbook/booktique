'use client';
import { Imessage, useMessage } from '@/store/messages';
import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';
import OtherMessage from './OtherMessage';

const ListMessage = ({
  clubsIds,
  userId
}: {
  clubsIds: (string | null)[] | undefined;
  userId: string | undefined;
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
        console.log('888', value.send_from);
        console.log('useriD', userId);
        if (value.club_id === params.id) {
          // message.profiles?.id와 userId를 비교하여 렌더링할 컴포넌트 결정
          if (value.send_from === userId) {
            return <Message key={index} message={value} />;
          } else {
            return <OtherMessage key={index} message={value} />;
          }
        }
      })}
    </div>
  );
};

export default ListMessage;
