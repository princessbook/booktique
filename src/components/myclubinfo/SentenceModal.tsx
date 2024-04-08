import { Tables } from '@/lib/types/supabase';
import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';
type Sentence = Tables<'sentences'>;
const SentenceModal = ({
  isModal,
  onClose,
  clubId,
  userId
}: {
  isModal: boolean;
  clubId: string;
  onClose: () => void;
  userId: string | null;
}) => {
  const supabase = createClient();
  const [content, setContent] = useState('');
  const [page, setPage] = useState<number>(0);

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const characterCount = content.length;
  const handleSave = async () => {
    console.log('-------------------');
    console.log(content);
    console.log(page);
    console.log(userId);
    console.log(clubId);
    console.log('-------------------');
    // 400자 이상인지 확인
    if (characterCount > 400) {
      alert('400자 이상 입력할 수 없습니다.');
      return;
    }
    // 페이지 입력 유효성 검사
    if (page <= 0 || isNaN(page)) {
      // 페이지가 0보다 작거나 NaN인 경우에 대한 유효성 검사 추가
      alert('유효한 페이지 번호를 입력해주세요.');
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
    if (error) {
      console.error('Supabase insert error:', error.message);
      alert('문장을 저장하는 도중 오류가 발생했습니다.');
      return;
    }
    console.log('Supabase insert success:', data);
    // 모달 닫기
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center ${
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
        <div>
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
            value={page.toString()} // 숫자를 문자열로 변환하여 출력
            onChange={(e) => setPage(parseInt(e.target.value))} // 입력된 문자열을 숫자로 변환하여 저장
          />
          <button
            className='w-full bg-mainblue py-4 rounded-[10px] mt-6'
            onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default SentenceModal;
