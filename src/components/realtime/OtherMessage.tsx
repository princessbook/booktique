import React from 'react';
import { Imessage } from '@/store/messages';
import Image from 'next/image';
import { useUser } from '@/store/user';

const OtherMessage = ({ message }: { message: Imessage }) => {
  const user = useUser((state) => state.user);
  // const isMyMessage = message.profiles?.id ===
  // 메시지 생성 시간을 가져오는 함수
  const getMessageTime = (createdAt: string) => {
    const currentDate = new Date();
    const messageDate = new Date(createdAt);
    const hours = messageDate.getHours();
    const minutes = messageDate.getMinutes();
    return `${hours}:${minutes}`;
  };
  const messageTextStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '10px', // 말풍선 테두리 둥글기
    padding: '10px' // 말풍선 안의 내용과 테두리 사이 간격
  };
  return (
    <div className='flex gap-2'>
      <div>
        {message.profiles?.photo_URL ? (
          <Image
            src={`${message.profiles.photo_URL}?${new Date().getTime()}`}
            alt='s'
            width={40}
            height={40}
            className='rounded-full'
          />
        ) : (
          <Image
            src='/booktique.png'
            alt='s'
            width={40}
            height={40}
            className='rounded-full'
          />
        )}
        <div>{message.profiles?.display_name}</div>
        <div style={messageTextStyle}>{message.text}</div>
        {/* 현재 시간 표시 */}
        <p>입력날짜: {getMessageTime(message.created_at)}</p>
        {message.profiles?.id === user?.id && <p>수정버튼</p>}
      </div>
    </div>
  );
};
export default OtherMessage;
