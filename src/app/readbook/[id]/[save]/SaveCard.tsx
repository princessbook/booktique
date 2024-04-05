'use client';
import React, { useEffect, useRef, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { getUserId } from '@/utils/userAPIs/authAPI';
import ProgressBar from '../../ProgressBar';
import { Tables } from '@/lib/types/supabase';

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
  const [progress, setProgress] = useState(matchingActivities[0].progress || 0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecordPage(event.target.value);
  };

  const handleSave = async () => {
    const memberId = await getUserId();
    console.log('memberId', memberId);
    console.log('저장!');

    if (!/^\d+$/.test(recordPage)) {
      alert('숫자만 입력해주세요.');
      return;
    }
    console.log('recordPage', recordPage);
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

      console.log('club_activities 테이블의 행을 업데이트 완료');
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

      console.log('club_activities 테이블에 새로운 행 삽입 완료', insertedData);
    }
    setProgress(result);
  };

  return (
    <>
      <input
        value={recordPage}
        onChange={handleInputChange}
        type='number'
        placeholder='오늘 읽은 페이지를 입력해주세요'
        className='flex mx-auto w-[334px] h-[44px] mt-[65px]'
        ref={inputRef}
      />
      <div>내 독서 진행률</div>
      <ProgressBar progress={progress} />
      <button onClick={handleSave}>저장</button>
    </>
  );
};

export default SaveCard;
