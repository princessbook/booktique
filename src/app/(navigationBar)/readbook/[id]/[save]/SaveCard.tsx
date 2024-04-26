'use client';
import React, { useEffect, useRef, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { getUserId } from '@/utils/userAPIs/authAPI';
import { Tables } from '@/lib/types/supabase';
import { useRouter } from 'next/navigation';
import ToastUi from '@/common/ToastUi';
interface ClubData {
  archive?: boolean | null;
  book_author?: string | null;
  book_category?: string | null;
  book_cover?: string | null;
  book_id?: string | null;
  book_page?: number | null;
  book_title?: string | null;
  created_at?: string;
  description?: string | null;
  id?: string;
  last_read?: boolean | null;
  max_member_count?: number | null;
  name?: string | null;
  thumbnail?: string | null;
  weekday?: string | null;
  club_activities: Tables<'club_activities'>[];
}
const supabase = createClient();
const SaveCard = ({
  clubId,
  clubData,
  userId
}: {
  clubId: string;
  clubData: ClubData | null;
  userId: string;
}) => {
  const [recordPage, setRecordPage] = useState('');
  const [inputValid, setInputValid] = useState(false);
  const [overPage, setOverPage] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(
    clubData?.club_activities.filter((club) => club.user_id === userId)[0]
      .progress
  );
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
    if (clubData?.club_activities) {
      setProgressPercentage(
        clubData?.club_activities.filter((club) => club.user_id === userId)[0]
          .progress
      );
      setLoading(false);
    }
  }, [clubData, userId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const inputValueAsNumber = Number(inputValue);

    if (!isNaN(inputValueAsNumber)) {
      setRecordPage(inputValue);
      setInputValid(!!inputValue.trim());
      setInvalidInput(false);

      const inputValueNumber = Math.floor(
        (Number(inputValueAsNumber) / (clubData?.book_page as number)) * 100
      );

      if (inputValueNumber > 100) {
        setOverPage(true);
        setProgressPercentage(100);
        setInputValid(false);
      } else {
        setOverPage(false);
        setProgressPercentage(inputValueNumber);
        setInputValid(!!inputValue.trim());
      }
    } else {
      setInvalidInput(true);
      setProgressPercentage(0);
      setInputValid(false);
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
      .eq('club_id', clubId)
      .eq('user_id', userId)
      .single();

    if (getMemberError || !member) {
      return;
    }
    setInputValid(false);
    router.refresh();
    if (!/^\d+$/.test(recordPage)) {
      setInvalidInput(true);
      return;
    }

    const result = Math.floor(
      (Number(recordPage) / (clubData?.book_page as number)) * 100
    );

    if (Number(recordPage) > (clubData?.book_page as number)) {
      setOverPage(true);
      setRecordPage('');
      return;
    }

    const { data: existingData, error: fetchError } = await supabase
      .from('club_activities')
      .select('*')
      .eq('club_id', clubId)
      .eq('user_id', userId as string);

    if (fetchError) {
      throw new Error(
        'club_activities 테이블에서 데이터를 조회하는 중 오류 발생:'
      );
    }
    setProgressPercentage(result);
    router.push('/readbook');
    router.refresh();

    if (existingData && existingData.length > 0) {
      const { data: updatedData, error: updateError } = await supabase
        .from('club_activities')
        .update({
          progress: result,
          last_read: true,
          read_page: recordPage as unknown as number
        })
        .eq('club_id', clubId)
        .eq('user_id', userId as string);

      if (updateError) {
        throw new Error(
          'club_activities 테이블의 행을 업데이트하는 중 오류 발생:'
        );
      }
      setProgressPercentage(result);
      router.refresh();
      router.push('/readbook');
    } else {
      const { data: insertedData, error: insertError } = await supabase
        .from('club_activities')
        .insert([
          {
            club_id: clubId,
            progress: result,
            user_id: userId as string,
            member_id: member.id,
            last_read: true,
            read_page: recordPage as unknown as number
          }
        ]);
      if (insertError) {
        throw new Error('club_activities 테이블에 삽입하는 중 오류 발생:');
      }
    }
    setProgressPercentage(result);

    router.push('/readbook');
    router.refresh();
  };

  const toastStyle = {
    width: '343px',
    height: '50px',
    top: '48px',
    left: '50%',
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
        className={`left-0 right-0 mx-auto fixed bottom-0 mb-[137px] w-[343px] h-[56px] rounded-full ${
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
