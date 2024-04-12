import ToastUi from '@/common/ToastUi';
import { createClient } from '@/utils/supabase/client';
import React, { useState } from 'react';
const SentenceModal = ({
  isModal,
  onClose,
  clubId,
  userId,
  bookpage
}: {
  isModal: boolean;
  clubId: string;
  onClose: () => void;
  userId: string | null;
  bookpage: number | null;
}) => {
  const supabase = createClient();
  const [content, setContent] = useState('');
  const [page, setPage] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string>('');

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // 입력된 값이 숫자인지 확인
    if (/^\d+$/.test(inputValue)) {
      // 숫자인 경우 페이지 상태 업데이트
      setPage(parseInt(inputValue));
    } else {
      // 숫자가 아닌 경우 0으로 설정
      setPage(0);
    }
  };

  const characterCount = content.length;
  const handleSave = async () => {
    // 400자 이상인지 확인
    if (characterCount > 400) {
      setToastMessage('문장저장에 실패하였습니다(400글자 초과)');
      return;
    }
    // 페이지 입력 유효성 검사
    if (page <= 0 || isNaN(page)) {
      // 페이지가 0보다 작거나 NaN인 경우에 대한 유효성 검사 추가
      setToastMessage(
        '문장저장에 실패하였습니다(페이지를 제대로 기입해주세요)'
      );
      return;
    }
    // 페이지 번호가 책 페이지 수를 초과하는지 확인
    if (bookpage !== null && page > bookpage) {
      setToastMessage('문장저장에 실패하였습니다(페이지초과)');
      return;
    }
    // Supabase에 데이터 삽입
    const { data, error } = await supabase.from('sentences').insert([
      {
        sentence_content: content || null,
        sentence_page: page,
        user_id: userId,
        club_id: clubId
      }
    ]);
    setToastMessage('문장을 저장완료하였습니다');
    if (error) {
      console.error('Supabase insert error:', error.message);
      // alert('문장을 저장하는 도중 오류가 발생했습니다.');
      return;
    }
    console.log('Supabase insert success:', data);
    // 모달 닫기
    // 토스트 메시지가 나타난 후 1초 후에 모달 닫기
    setTimeout(() => {
      onClose(); // 모달 닫기
    }, 1000);
    setPage(0);
    setContent('');
  };

  return (
    <div
      className={`fixed w-[375px] mx-auto inset-0 z-50 flex items-end justify-center ${
        isModal ? '' : 'hidden'
      }`}>
      <div
        className='absolute inset-0 bg-black opacity-50'
        onClick={onClose}></div>
      <div className='bg-white rounded-lg z-10 relative w-full px-4 py-6'>
        <div className='flex mb-6'>
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className=' text-gray-600 hover:text-gray-800 absolute'>
            <div className='w-[22px] h-[22px] relative'>
              <div className='absolute top-1/2 left-0 w-full h-[2px] bg-black transform -translate-y-1/2 rotate-45'></div>
              <div className='absolute top-1/2 left-0 w-full h-[2px] bg-black transform -translate-y-1/2 -rotate-45'></div>
            </div>
          </button>
          <span className='w-full text-center font-bold'>문장 저장하기</span>
        </div>
        {/* 모달 내용 */}
        <div className='relative'>
          <div className='relative'>
            <textarea
              className='w-full bg-[#F6F7F9] h-80 py-[10px] px-4'
              placeholder='문장내용'
              value={content}
              maxLength={400}
              onChange={handleContentChange}></textarea>
            <div className='absolute bottom-2 right-2 text-gray-500 text-[11px]'>
              {characterCount}/400
            </div>
          </div>
          <input
            className='w-full bg-[#F6F7F9] px-4 py-[10px] text-[14px]'
            placeholder='페이지를 입력해주세요(숫자만)'
            value={page === 0 ? '' : page.toString()} // 숫자를 문자열로 변환하여 출력, 0인 경우 빈 문자열 출력
            onChange={handlePageChange} // 페이지 입력값 변경 핸들러
          />
          <button
            className='w-full bg-mainblue py-4 rounded-[10px] mt-6'
            onClick={handleSave}>
            저장
          </button>
          <ToastUi
            onClose={() => setToastMessage('')}
            message={toastMessage}
            isSuccess={!toastMessage.startsWith('문장저장에 실패')}
          />
        </div>
      </div>
    </div>
  );
};

export default SentenceModal;
