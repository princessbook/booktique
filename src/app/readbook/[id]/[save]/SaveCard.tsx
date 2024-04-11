'use client';
import React, { useEffect, useRef, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { getUserId } from '@/utils/userAPIs/authAPI';
import { Tables } from '@/lib/types/supabase';
import { useRouter } from 'next/navigation';
import SaveProgressBar from './SaveProgressBar';

const supabase = createClient();

const SaveCard = ({
  id,
  clubData,
  matchingActivities
}: {
  id: string;
  clubData: Tables<'clubs'>;
  matchingActivities: Tables<'club_activities'>[];
}) => {
  const [recordPage, setRecordPage] = useState('');
  const [progress, setProgress] = useState(
    matchingActivities[0]?.progress as number
  );
  // console.log('matchingActivities', matchingActivities);
  const [inputValid, setInputValid] = useState(false); // 입력값 유효성 상태
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setRecordPage(inputValue);
    setInputValid(!!inputValue.trim()); // 입력값이 공백이 아닌지 확인하여 유효성 상태 갱신
  };

  const handleSave = async () => {
    localStorage.clear();
    const memberId = await getUserId();
    // console.log('memberId', memberId);
    // console.log('저장!');

    if (!/^\d+$/.test(recordPage)) {
      alert('숫자만 입력해주세요.');
      return;
    }
    // console.log('recordPage', recordPage);
    const result = Math.floor(
      (Number(recordPage) / (clubData.book_page as number)) * 100
    );

    if (Number(recordPage) > (clubData.book_page as number)) {
      alert('입력한 페이지 수가 책의 전체 페이지 수를 초과했습니다.');
      setRecordPage('');
      return;
    }

    // club_activities 테이블에서 해당 club_id와 user_id에 해당하는 행을 조회
    const { data: existingData, error: fetchError } = await supabase
      .from('club_activities')
      .select('*')
      .eq('club_id', id)
      .eq('user_id', memberId as string);

    if (fetchError) {
      throw new Error(
        'club_activities 테이블에서 데이터를 조회하는 중 오류 발생:'
      );
    }
    // console.log('existingData', existingData);
    if (existingData && existingData.length > 0) {
      // 이미 삽입된 데이터가 있다면 해당 행을 업데이트
      const { data: updatedData, error: updateError } = await supabase
        .from('club_activities')
        .update({ progress: result })
        .eq('club_id', id)
        .eq('user_id', memberId as string);

      if (updateError) {
        throw new Error(
          'club_activities 테이블의 행을 업데이트하는 중 오류 발생:'
        );
      }

      // console.log('club_activities 테이블의 행을 업데이트 완료');
    } else {
      // 삽입된 데이터가 없다면 새로운 행을 삽입(db에서 지우지않는한무조건 있기는함).
      const { data: insertedData, error: insertError } = await supabase
        .from('club_activities')
        .insert([
          { club_id: id, progress: result, user_id: memberId as string }
        ]);
      if (insertError) {
        throw new Error('club_activities 테이블에 삽입하는 중 오류 발생:');
      }

      // console.log('club_activities 테이블에 새로운 행 삽입 완료', insertedData);
    }
    setProgress(result);
    router.push('/readbook');
  };

  return (
    <div className='flex flex-col justify-center'>
      <input
        value={recordPage}
        onChange={handleInputChange}
        type='number'
        placeholder='페이지를 입력해주세요.(숫자만)'
        className='flex mx-auto w-[334px] h-[38px] mt-[28px] bg-[#EDEEF2] px-[16px] py-[14px] rounded-[10px]
        text-[14px]'
        ref={inputRef}
      />
      <div className='mt-[49px] ml-[16px] text-[16px] leading-[22px] font-bold text-[#3F3E4E]'>
        내 독서 진행률
      </div>
      <SaveProgressBar progress={progress} />
      <button
        onClick={handleSave}
        disabled={!inputValid}
        className={`bottom-0 mt-[190px] mx-auto w-[343px] h-[56px] rounded-full ${
          inputValid
            ? 'bg-[#35A5F6] text-white text-[16px] leading-[22px] font-bold text-center'
            : 'bg-[#EDEEF2] text-[#B3C1CC] text-[16px] leading-[22px] font-bold text-center'
        }`}>
        저장
      </button>
    </div>
  );
};

export default SaveCard;
