'use client';
import { Imessage, useMessage } from '@/store/messages';
import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import { createClient } from '@/utils/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import OtherMessage from './OtherMessage';
import LoadMoreMessages from './LoadMoreMessages';

const ListMessage = ({ userId }: { userId: string | undefined }) => {
  const params = useParams();
  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [userScrolled, setUserScrolled] = useState(false);
  const [notification, setNotification] = useState(0);
  const { messages, addMessage, optimisticIds } = useMessage((state) => state);
  const supabase = createClient();
  const router = useRouter();
  useEffect(() => {
    const channel = supabase
      .channel(`${params.id}/chatting`)
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
          const scrollContainer = scrollRef.current;
          if (
            scrollContainer.scrollTop <
            scrollContainer.scrollHeight - scrollContainer.clientHeight - 10
          ) {
            setNotification((current) => current + 1);
          }
        }
      )
      .subscribe();
    router.refresh();
    return () => {
      channel.unsubscribe();
    };
  }, [messages, addMessage, optimisticIds]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer && !userScrolled) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);
  const handleOnScroll = () => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const isScroll =
        scrollContainer.scrollTop <
        scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;
      setUserScrolled(isScroll);
      if (
        scrollContainer.scrollTop ===
        scrollContainer.scrollHeight - scrollContainer.clientHeight
      ) {
        setNotification(0);
      }
    }
  };
  const scrollDown = () => {
    setNotification(0);
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };
  const sortedMessages = messages.slice().sort((a, b) => {
    // created_at 속성을 기준으로 오름차순으로 정렬합니다.
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });
  return (
    <>
      <div
        className={`flex-1 flex flex-col custom-height overflow-y-auto `}
        ref={scrollRef}
        onScroll={handleOnScroll}>
        <div className='flex-1 fixed top-[220px] left-1/2 translate-x-[-50%]'>
          <LoadMoreMessages />
        </div>
        {sortedMessages.map((value, index) => {
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
      {userScrolled && (
        <div className='absolute bottom-14 left-1/2 translate-x-[-50%]'>
          {notification ? (
            <div
              className=' w-48 bg-mainblue animate-bounce p-1 rounded-md cursor-pointer'
              onClick={scrollDown}>
              <h1 className='text-white text-center'>
                새로운 메세지{notification}개 있습니다
              </h1>
            </div>
          ) : (
            <div
              className='w-10 h-10 bg-blue-500 rounded-full justify-center items-center flex mx-auto border cursor-pointer'
              onClick={scrollDown}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-arrow-down text-white'>
                <path d='M12 5v14' />
                <path d='m19 12-7 7-7-7' />
              </svg>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ListMessage;
