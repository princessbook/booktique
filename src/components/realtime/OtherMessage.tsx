import React from 'react';
import { Imessage } from '@/store/messages';
import Image from 'next/image';
import { getMessageTime } from '@/utils/timeUtils';

const OtherMessage = ({ message }: { message: Imessage }) => {
  // 메시지 생성 시간을 가져오는 함수
  const messageTextStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '10px', // 말풍선 테두리 둥글기
    padding: '10px' // 말풍선 안의 내용과 테두리 사이 간격
  };
  return (
    <div className='flex gap-2 my-2 px-2'>
      <div className='flex'>
        <div className='min-w-[40px]'>
          {message.profiles?.photo_URL ? (
            <Image
              src={`${message.profiles?.photo_URL!}`}
              alt='s'
              width={40}
              height={40}
              className='rounded-full object-cover w-[40px] h-[40px]'
            />
          ) : (
            <Image
              src='/defaultImage.svg'
              alt='s'
              width={40}
              height={40}
              className='rounded-full object-cover w-[40px] h-[40px]'
            />
          )}
        </div>
        <div className='ml-2'>
          <div>{message.profiles?.display_name}</div>
          <div className='flex items-end'>
            <div style={messageTextStyle}>{message.text}</div>
            {/* 현재 시간 표시 */}
          </div>
        </div>
        <div className='flex items-end ml-1'>
          <p className='text-fontGray text-[12px]'>
            {getMessageTime(message.created_at)}
          </p>
        </div>
      </div>
    </div>
  );
};
export default OtherMessage;
