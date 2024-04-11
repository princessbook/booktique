import React from 'react';
import { Imessage } from '@/store/messages';
import Image from 'next/image';
import { useUser } from '@/store/user';

const Message = ({ message }: { message: Imessage }) => {
  console.log('메세지입니다', message);
  const user = useUser((state) => state.user);
  return (
    <div className='flex gap-2'>
      <div>
        <Image
          src={message.profiles?.photo_URL!}
          alt='s'
          width={40}
          height={40}
          className='rounded-full'
        />
        <div>{message.profiles?.display_name}</div>
        <div>메세지: {message.text}</div>
        <p>입력날짜: {new Date(message.created_at).toDateString()}</p>
        {message.profiles?.id === user?.id && <p>수정버튼</p>}
      </div>
    </div>
  );
};

export default Message;
