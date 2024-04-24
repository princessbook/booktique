import React from 'react';
import { Imessage } from '@/store/messages';
import Image from 'next/image';
import { getMessageTime } from '@/utils/timeUtils';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure
} from '@nextui-org/react';

const OtherMessage = ({ message }: { message: Imessage }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
            <Button className='pl-0 pr-0' onPress={onOpen}>
              <Image
                src={`${message.profiles?.photo_URL!}`}
                alt='s'
                width={40}
                height={40}
                className='rounded-full object-cover w-[40px] h-[40px]'
              />
            </Button>
          ) : (
            <Button className='pl-0 pr-0' onPress={onOpen}>
              <Image
                src='/defaultImage.svg'
                alt='s'
                width={40}
                height={40}
                className='rounded-full object-cover w-[40px] h-[40px]'
              />
            </Button>
          )}
          <Modal
            className=' bg-slate-800 rounded-3xl'
            isOpen={isOpen}
            onOpenChange={onOpenChange}>
            <ModalContent className='px-4'>
              {(onClose) => (
                <>
                  <ModalHeader className='flex flex-col gap-1'>
                    Modal Title
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <div className='ml-2'>
          <div>{message.profiles?.display_name}</div>
          <div className='flex items-end'>
            <div style={messageTextStyle}>{message.text}</div>
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
      {isOpen && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-60'></div>
      )}
    </div>
  );
};
export default OtherMessage;
