import React from 'react';
import { Imessage } from '@/store/messages';
import { getMessageTime } from '@/utils/timeUtils';
import Image from 'next/image';

const Message = ({ message }: { message: Imessage }) => {
  // 스타일 정의
  const messageTextStyle = {
    backgroundColor: '#aee4ff', // 말풍선 배경색
    borderRadius: '10px', // 말풍선 테두리 둥글기
    padding: '10px' // 말풍선 안의 내용과 테두리 사이 간격
  };
  return (
    <div className='flex gap-2 w-full justify-end my-3 px-2'>
      <div>
        <div className='flex items-end'>
          {/* 말풍선 스타일 적용 */}
          <p className='text-fontGray mr-1 text-[12px]'>
            {getMessageTime(message.created_at)}
          </p>
          <div style={messageTextStyle}>
            {message.send_photo_URL && (
              <Image
                width={20}
                height={20}
                src={message.send_photo_URL}
                alt='사진'
              />
            )}
            <span>{message.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
