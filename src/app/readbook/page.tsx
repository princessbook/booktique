import React from 'react';
import ReadBookLayout from '../readbook/layout';
import Image from 'next/image';

import blue from '../../../public/booktiquereadblue.png';
import { createClient } from '@/utils/supabase/server';
import { getUserId } from '@/utils/userAPIs/authAPI';
import { fetchUser } from '@/hooks/fetchDB';
import ClubList from './ClubList';

const page = async () => {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', user?.id);
  const { data: memberData, error: memberError } = await supabase
    .from('members')
    .select('club_id')
    .eq('user_id', user?.id as string);
  console.log('memberData', memberData);
  if (memberError) {
    throw new Error(
      '해당 회원이 등록된 클럽정보를 가져오는 도중 오류가 발생했습니다.'
    );
  }

  if (!memberData || memberData.length === 0) {
    throw new Error('해당 회원의 클럽정보를 찾을 수 없습니다.');
  }

  const clubDataPromises = memberData.map(async (member) => {
    const clubId = member.club_id;
    const { data: clubData, error: clubError } = await supabase
      .from('clubs')
      .select('*')
      .eq('id', clubId)
      .single();

    if (clubError) {
      throw new Error('클럽 정보를 가져오는 도중 오류가 발생했습니다.');
    }
    return clubData;
  });

  const allClubData = await Promise.all(clubDataPromises);
  console.log('allClubData', allClubData);

  const { data: activitiesData, error: activitiesError } = await supabase
    .from('club_activities')
    .select('*')
    .eq('user_id', user?.id as string);
  console.log('activitiesData', activitiesData);
  if (activitiesError) {
    throw new Error('클럽 활동을 가져오는 도중 오류가 발생했습니다.');
  }

  const { data: bookClubsData, error: bookClubsError } = await supabase
    .from('clubs')
    .select('*');

  console.log('bookClubsData', bookClubsData);
  if (bookClubsError) {
    throw new Error('책 정보를 가져오는 도중 오류가 발생했습니다.');
  }
  const filteredBookClubsData = bookClubsData.filter((bookClub) => {
    return allClubData.some((club) => club.id === bookClub.id);
  });
  console.log('filteredBookClubsData', filteredBookClubsData);
  return (
    <ReadBookLayout>
      <div className='h-[42px]'>헤더</div>
      <Image
        src={blue}
        width={134}
        height={26}
        alt={'booktique'}
        className='pt-[38px] mx-auto pb-[24px]'
        priority={true}
      />
      <ClubList
        // handleBookRead={handleBookRead}
        id={user?.id as string}
        // clubData={clubData}
        clubActivities={activitiesData}
        filteredBookClubsData={filteredBookClubsData}
      />
    </ReadBookLayout>
  );
};

export default page;
