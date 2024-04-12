import React from 'react';
import { Imessage } from '@/store/messages';
import Image from 'next/image';
import { useUser } from '@/store/user';

const Message = ({ message }: { message: Imessage }) => {
  const user = useUser((state) => state.user);

  // 스타일 정의
  const messageTextStyle = {
    backgroundColor: '#aee4ff', // 말풍선 배경색
    borderRadius: '10px', // 말풍선 테두리 둥글기
    padding: '10px', // 말풍선 안의 내용과 테두리 사이 간격
    alignSelf: message.profiles?.id === user?.id ? 'flex-end' : 'flex-start' // 사용자에 따라 오른쪽 또는 왼쪽 정렬
  };

  return (
    <div className='flex gap-2 w-full  justify-end'>
      <div>
        <Image
          src={message.profiles?.photo_URL!}
          alt='s'
          width={40}
          height={40}
          className='rounded-full'
        />
        <div>{message.profiles?.display_name}</div>
        {/* 말풍선 스타일 적용 */}
        <div style={messageTextStyle}>{message.text}</div>
        <p>입력날짜: {new Date(message.created_at).toDateString()}</p>
        {message.profiles?.id === user?.id && <p>수정버튼</p>}
      </div>
    </div>
  );
};

export default Message;
