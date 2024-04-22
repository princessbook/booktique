'use client';
import React, { useEffect, useRef, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { getUserId } from '@/utils/userAPIs/authAPI';
import { Tables } from '@/lib/types/supabase';
import { useRouter } from 'next/navigation';
// import SaveProgressBar from './SaveProgressBar';
import ToastUi from '@/common/ToastUi';

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
  // const [progress, setProgress] = useState(
  //   matchingActivities[0]?.progress as number
  // );
  // console.log('progress', progress);

  const [inputValid, setInputValid] = useState(false); // 입력값 유효성 상태
  const [overPage, setOverPage] = useState(false); // 페이지 초과
  const [invalidInput, setInvalidInput] = useState(false); // 숫자만 입력하게
  const [progressPercentage, setProgressPercentage] = useState(
    matchingActivities[0]?.progress as number
  ); // 페이지 진행률 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    if (matchingActivities.length > 0) {
      setProgressPercentage(matchingActivities[0]?.progress as number);
      setLoading(false); // matchingActivities 로드 완료 시 로딩 상태 변경
    }
  }, [matchingActivities]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const inputValueAsNumber = Number(inputValue);

    // 입력 값이 유효한 숫자인지 확인합니다.
    if (!isNaN(inputValueAsNumber)) {
      setRecordPage(inputValue);
      setInputValid(!!inputValue.trim()); // 입력 값이 공백이 아닌지 확인하여 유효성 상태를 갱신합니다.
      setInvalidInput(false);

      const inputValueNumber = Math.floor(
        (Number(inputValueAsNumber) / (clubData.book_page as number)) * 100
      );

      if (inputValueNumber > 100) {
        setOverPage(true);
        setProgressPercentage(100);
        setInputValid(false);
      } else {
        setOverPage(false);
        setProgressPercentage(inputValueNumber); // 진행률을 정상적으로 업데이트합니다.
        setInputValid(!!inputValue.trim());
      }
    } else {
      // 입력 값이 유효한 숫자가 아닌 경우 처리합니다.
      setInvalidInput(true);
      setProgressPercentage(0); // 진행률을 0%로 재설정합니다.
      setInputValid(false); // 입력 값이 유효하지 않으면 버튼을 비활성화합니다.
    }
  };

  const handleSave = async () => {
    localStorage.removeItem('timerStarted');
    localStorage.removeItem('timerSeconds');
    const userId = await getUserId();

    if (!userId) {
      return;
    }
    const { data: member, error: getMemberError } = await supabase
      .from('members')
      .select()
      .eq('club_id', id)
      .eq('user_id', userId)
      .single();

    if (getMemberError || !member) {
      // console.log('you are not even a member!');
      return;
    }
    setInputValid(false); // 이걸 false해줘야 저장을 하고도 버튼 비활성화 동작이 일어남
    router.refresh();
    if (!/^\d+$/.test(recordPage)) {
      setInvalidInput(true); // 숫자만 입력해주세요 알림 표시
      return;
    }
    const result = Math.floor(
      (Number(recordPage) / (clubData.book_page as number)) * 100
    );

    if (Number(recordPage) > (clubData.book_page as number)) {
      setOverPage(true); // 페이지 수 초과 알림 표시
      setRecordPage('');
      return;
    }

    // club_activities 테이블에서 해당 club_id와 user_id에 해당하는 행을 조회
    const { data: existingData, error: fetchError } = await supabase
      .from('club_activities')
      .select('*')
      .eq('club_id', id)
      .eq('user_id', userId as string);

    if (fetchError) {
      throw new Error(
        'club_activities 테이블에서 데이터를 조회하는 중 오류 발생:'
      );
    }
    setProgressPercentage(result);
    router.push('/readbook');
    router.refresh();

    // console.log('existingData', existingData);
    if (existingData && existingData.length > 0) {
      // 이미 삽입된 데이터가 있다면 해당 행을 업데이트
      const { data: updatedData, error: updateError } = await supabase
        .from('club_activities')
        .update({ progress: result, last_read: true })
        .eq('club_id', id)
        .eq('user_id', userId as string);

      if (updateError) {
        throw new Error(
          'club_activities 테이블의 행을 업데이트하는 중 오류 발생:'
        );
      }
      setProgressPercentage(result);
      router.refresh();
      router.push('/readbook');
      // console.log('club_activities 테이블의 행을 업데이트 완료');
    } else {
      // 삽입된 데이터가 없다면 새로운 행을 삽입(db에서 지우지않는한무조건 있기는함).
      const { data: insertedData, error: insertError } = await supabase
        .from('club_activities')
        .insert([
          {
            club_id: id,
            progress: result,
            user_id: userId as string,
            member_id: member.id,
            last_read: true
          }
        ]);
      if (insertError) {
        throw new Error('club_activities 테이블에 삽입하는 중 오류 발생:');
      }

      // console.log('club_activities 테이블에 새로운 행 삽입 완료', insertedData);
    }
    setProgressPercentage(result);

    router.push('/readbook');
    router.refresh();
  };

  const toastStyle = {
    width: '343px',
    height: '50px',
    top: '48px', // 헤더 48이라 임시로 해놓음
    left: '50%', // 화면 중앙
    transform: 'translateX(-50%)',
    fontSize: '8px'
  };

  if (loading) {
    return (
      <>
        <input
          className='flex mx-auto w-[334px] h-[38px] mt-[28px] bg-[#EDEEF2] px-[16px] py-[14px] rounded-[10px]
        text-[14px]'
          placeholder='페이지를 입력해주세요.(숫자만)'
        />
        <div className='mt-[49px] ml-[16px] text-[16px] leading-[22px] font-bold text-[#3F3E4E]'>
          내 독서 진행률
        </div>
        <div className='w-[343px] h-[70px] bg-[#F5F5F7] px-[24.5px] py-[32px] mt-[16px] mx-auto rounded-[10px]'>
          <div className='w-[294px] h-[6px] mx-auto relative rounded-[10px] '>
            <div
              className='w-full h-full bg-[#35A5F6] rounded-full absolute transition-width duration-1000 ease-out'
              style={{
                width: `${progressPercentage}%`,
                backgroundImage: 'linear-gradient(to right, #E9FF8F, #59B9FF)'
              }}></div>
            <div className='w-full h-full bg-white rounded-full'></div>
            <div className='text-end text-subblue text-[14px] mt-1'>
              {progressPercentage}%
            </div>
          </div>
        </div>
        <button
          className={`fixed bottom-0 mb-[137px] ml-[16px] w-[343px] h-[56px] rounded-full ${'bg-[#EDEEF2] text-[#B3C1CC] text-[16px] leading-[22px] font-bold text-center'}`}>
          저장
        </button>
      </>
    );
  }

  return (
    <div className='flex flex-col justify-center'>
      <input
        value={recordPage}
        onChange={handleInputChange}
        type='text'
        pattern='[0-9]*'
        inputMode='numeric'
        placeholder='페이지를 입력해주세요.(숫자만)'
        className='flex mx-auto w-[334px] h-[38px] mt-[28px] bg-[#EDEEF2] px-[16px] py-[14px] rounded-[10px]
        text-[14px]'
        ref={inputRef}
      />
      <div className='mt-[49px] ml-[16px] text-[16px] leading-[22px] font-bold text-[#3F3E4E]'>
        내 독서 진행률
      </div>
      {/* <SaveProgressBar
        progress={progress}
        recordPage={recordPage}
        ddd={ddd}
        clubData={clubData}
        // matchingActivities={matchingActivities}
      /> */}
      <div className='w-[343px] h-[70px] bg-[#F5F5F7] px-[24.5px] py-[32px] mt-[16px] mx-auto rounded-[10px]'>
        <div className='w-[294px] h-[6px] mx-auto relative rounded-[10px] '>
          <div
            className='w-full h-full bg-[#35A5F6] rounded-full absolute transition-width duration-1000 ease-out'
            style={{
              width: `${progressPercentage}%`,
              backgroundImage: 'linear-gradient(to right, #E9FF8F, #59B9FF)'
            }}></div>
          {/* <div className={`h-full bg-blue-500 rounded-full w-${progress}%`} /> */}
          <div className='w-full h-full bg-white rounded-full'></div>
          <div className='text-end text-subblue text-[14px] mt-1'>
            {progressPercentage}%
          </div>
        </div>
      </div>
      {overPage && (
        <ToastUi
          message='입력한 페이지 수가 책의 전체 페이지 수를 초과했습니다.'
          onClose={() => setOverPage(false)}
          isSuccess={false}
          style={toastStyle}
          duration={2500}
        />
      )}
      {invalidInput && (
        <ToastUi
          message='숫자만 입력해주세요.'
          onClose={() => setInvalidInput(false)}
          isSuccess={false}
          style={toastStyle}
          duration={2500}
        />
      )}
      <button
        onClick={handleSave}
        disabled={!inputValid}
        className={`fixed bottom-0 mb-[137px] ml-[16px] w-[343px] h-[56px] rounded-full ${
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
