import React from 'react';
import { Tables } from '@/lib/types/supabase';
type Club = Tables<'clubs'>;
import Image from 'next/image';
import ProgressBar from '@/app/readbook/ProgressBar';
import { createClient } from '@/utils/supabase/server';
import { CLUB_ACTIVITIES_TABLE } from '@/common/constants/tableNames';

const ClubBook = async ({ club }: { club: Club | null }) => {
  if (!club) {
    return null;
  }
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  //   console.log(user?.id);
  let percentage = 0;
  if (user) {
    const { data: activity, error: activityError } = await supabase
      .from(CLUB_ACTIVITIES_TABLE)
      .select('progress')
      .eq('user_id', user.id)
      .eq('club_id', club.id)
      .single();

    if (activity && !activityError) {
      percentage = activity.progress || 0;
    }
  }
  console.log('퍼센트', percentage);
  return (
    <div>
      <div className='bg-[#EEEFF3] mt-3 p-5 rounded-xl flex flex-col items-center justify-center '>
        <Image
          src={club?.book_cover || '/booktiquereadblue.png'} // 클럽의 imageURL 필드를 사용
          alt='책 사진' // 이미지의 대체 텍스트
          width={100} // 이미지의 너비
          height={100} // 이미지의 높이
        />
        <ProgressBar progress={percentage} />
      </div>
      <div className='flex flex-col mt-2'>
        <p>책 제목: {club?.book_title}</p>
        <p>저자명: {club?.book_author}</p>
        <p>카테고리: {club?.book_category}</p>
      </div>
    </div>
  );
};

export default ClubBook;
