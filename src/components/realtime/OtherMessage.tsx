import React from 'react';
import { Imessage } from '@/store/messages';
import Image from 'next/image';
import { useUser } from '@/store/user';

const OtherMessage = ({ message }: { message: Imessage }) => {
  const user = useUser((state) => state.user);
  // const isMyMessage = message.profiles?.id ===
  const messageTextStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '10px', // 말풍선 테두리 둥글기
    padding: '10px' // 말풍선 안의 내용과 테두리 사이 간격
  };
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
        <div style={messageTextStyle}>{message.text}</div>
        <p>입력날짜: {new Date(message.created_at).toDateString()}</p>
        {message.profiles?.id === user?.id && <p>수정버튼</p>}
      </div>
    </div>
  );
};

export default OtherMessage;
