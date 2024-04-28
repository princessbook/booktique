import React, { useState } from 'react';
import { Imessage } from '@/store/messages';
import Image from 'next/image';
import { getMessageTime } from '@/utils/timeUtils';

const OtherMessage = ({ message }: { message: Imessage }) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const toogleModal = () => {
    setIsOpen(!isOpen);
  };

  // 메시지 생성 시간을 가져오는 함수
  const messageTextStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '10px', // 말풍선 테두리 둥글기
    padding: '10px' // 말풍선 안의 내용과 테두리 사이 간격
  };
  return (
    <div className={`flex gap-2 my-2 px-2 messageAnimation`}>
      <div className='flex'>
        <div className='min-w-[40px]' onClick={toogleModal}>
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
          <div
            className={`fixed w-[375px] mx-auto inset-0 z-50 flex items-end justify-center ${
              isOpen ? '' : 'hidden'
            }`}>
            <div className='absolute inset-0 bg-black opacity-50'></div>
            <div className='bg-white rounded-lg z-10 relative w-full px-4 py-6'>
              <div className='flex mb-6'>
                {/* 닫기 버튼 */}
                <button className='text-gray-600 hover:text-gray-800 absolute'>
                  <div className='w-[22px] h-[22px] relative'>
                    <div className='absolute top-1/2 left-0 w-full h-[2px] bg-black transform -translate-y-1/2 rotate-45'></div>
                    <div className='absolute top-1/2 left-0 w-full h-[2px] bg-black transform -translate-y-1/2 -rotate-45'></div>
                  </div>
                </button>
                <span className='w-full text-center font-bold'>
                  유저 프로필
                </span>
              </div>
              <div className='flex gap-1 items-center'>
                {message.profiles?.photo_URL ? (
                  <Image
                    width={56}
                    height={56}
                    alt='profile'
                    src={message.profiles?.photo_URL}
                    className='rounded-full object-cover w-[56px] h-[56px]'
                  />
                ) : (
                  <Image
                    src='/defaultImage.svg'
                    alt='s'
                    width={56}
                    height={56}
                    className='rounded-full object-cover w-[56px] h-[56px]'
                  />
                )}
                <span className='ml-2'>{message.profiles?.display_name}</span>
              </div>
              {/* 모달 내용 */}
              <div className='my-6'>
                {message.profiles?.introduction ? (
                  <span>{message.profiles?.introduction}</span>
                ) : (
                  <span>등록된 소개글이 없습니다</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='ml-2'>
          <div>{message.profiles?.display_name}</div>
          <div className='flex items-end'>
            <div style={messageTextStyle}>
              {message.send_photo_URL && (
                <img
                  className=' rounded-2xl h-20'
                  src={message.send_photo_URL}
                  alt='사진'
                />
              )}
              <span>{message.text}</span>
            </div>
            {/* 현재 시간 표시 */}
          </div>
        </div>
        <div className='flex items-end ml-1'>
          <p
            className='text-fontGray text-[12px] font-thin'
            style={{ WebkitTextStroke: '0.2px black' }}>
            {getMessageTime(message.created_at)}
          </p>
        </div>
      </div>
      {/* {isOpen && (
        <div className='fixed md:max-w-[375px] w-full left-1/2 translate-x-[-50%] inset-0 z-50 bg-black bg-opacity-60'></div>
      )} */}
    </div>
  );
};
export default OtherMessage;
