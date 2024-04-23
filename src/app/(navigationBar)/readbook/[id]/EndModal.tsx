import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import readbook_yet_read from '../../../../../public/readbook_yet_read.png';

interface ModalProps {
  onClose: () => void;
  id: string;
}
const EndModal = ({ onClose, id }: ModalProps) => {
  const router = useRouter();

  const handleStopTimerAndNavigate = async () => {
    // alert('현재 테스트 중입니다 조금만 기다려주세요!');
    onClose(); // 여기 주석했다가 버그발견 책읽기 시작-> ~~ 책 읽기 시작 모달창 등장
    router.refresh();
    localStorage.removeItem('timerStarted');
    localStorage.removeItem('timerSeconds');
    router.push(`/readbook/${id}/save`);
  };
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20'>
      <div className='bg-white w-[327px] h-[412px] rounded-[20px] flex flex-col items-center'>
        <Image
          src={readbook_yet_read}
          alt='end'
          width={144}
          height={144}
          className='mt-[38px] mb-[16px] w-[144px] h-[144px]'
        />
        <h1 className=' mb-[32px] font-medium text-[16px] leading-[22px] text-center text-[#3F3E4E]'>
          아직 책 읽기로한 시간을 채우지 못했어요. <br />
          정말 책 읽기를 종료하시나요?
        </h1>
        <div className='flex flex-col gap-[12px] w-[279px]'>
          <button
            className='px-4 py-2 text-white bg-subblue rounded-full text-[14px] h-[44px]'
            onClick={onClose}>
            계속 읽기
          </button>
          <button
            className='px-4 py-2 text-[#8A9DB3] rounded-full border border-[#DBE3EB] text-[14px] h-[44px]'
            onClick={handleStopTimerAndNavigate}>
            그만 읽기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndModal;
