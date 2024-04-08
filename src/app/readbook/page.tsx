import React, { Suspense } from 'react';
import ReadBookLayout from '../readbook/layout';
import Image from 'next/image';

import blue from '../../../public/booktiquereadblue.png';
import { createClient } from '@/utils/supabase/server';
// import { getUserId } from '@/utils/userAPIs/authAPI';
// import { fetchUser } from '@/hooks/fetchDB';
import ClubList from './ClubList';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
// import { revalidatePath } from 'next/cache';
// export const revalidate = 0;
const page = async () => {
  revalidatePath('/', 'layout');
  const supabase = createClient();
  // console.log('supabase.auth', supabase.auth);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', user?.id);
  const { data: memberData, error: memberError } = await supabase
    .from('members')
    .select('club_id')
    .eq('user_id', user?.id as string);
  // console.log('memberData', memberData);
  if (!user?.id) {
    // console.log('1');
    redirect('/login');
  }
  if (memberError) {
    throw new Error(
      '해당 회원이 등록된 클럽정보를 가져오는 도중 오류가 발생했습니다.'
    );
  }

  // if (!memberData || memberData.length === 0) {
  //   throw new Error('해당 회원의 클럽정보를 찾을 수 없습니다.');
  // }

  const clubDataPromises = memberData.map(async (member) => {
    const clubId = member.club_id;
    const { data: clubData, error: clubError } = await supabase
      .from('clubs')
      .select('*')
      .eq('id', clubId)
      .single();
    console.log('clubData', clubData);
    if (clubError) {
      throw new Error('클럽 정보를 가져오는 도중 오류가 발생했습니다.');
    }
    return clubData;
  });

  const allClubData = await Promise.all(clubDataPromises);
  console.log('allClubData', allClubData);

  // const { data: activitiesData, error: activitiesError } = await supabase
  //   .from('club_activities')
  //   .select('*')
  //   .eq('user_id', user?.id as string);
  // console.log('activitiesData', activitiesData);
  // if (activitiesError) {
  //   throw new Error('클럽 활동을 가져오는 도중 오류가 발생했습니다.');
  // }

  const { data: bookClubsData, error: bookClubsError } = await supabase
    .from('clubs')
    .select('*');

  // console.log('bookClubsData', bookClubsData);
  if (bookClubsError) {
    throw new Error('책 정보를 가져오는 도중 오류가 발생했습니다.');
  }
  const filteredBookClubsData = bookClubsData.filter((bookClub) => {
    return allClubData.some((club) => club.id === bookClub.id);
  });
  console.log('filteredBookClubsData', filteredBookClubsData);
  return (
    <ReadBookLayout>
      <Suspense fallback={<p>Loading feed...</p>}>
        {filteredBookClubsData.length > 0 ? (
          <>
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
              // clubActivities={activitiesData}
              filteredBookClubsData={filteredBookClubsData}
            />{' '}
          </>
        ) : (
          <div>
            가입된 북클럽이 아직 없어요 북클럽 찾기에서 가입하고 와주세요 디자인
            나오면 작업예정
          </div>
        )}
      </Suspense>
    </ReadBookLayout>
  );
};

export default page;
