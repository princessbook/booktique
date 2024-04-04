import { createClient } from '@/utils/supabase/server';
import React from 'react';
import BookInfo from './BookInfo';

const page = async ({ params: { id } }: { params: { id: string } }) => {
  //   const page = async ({
  //   params: { id }
  // }: {
  //   params: { id: string };
  // }) => {
  //   const id = props.params.id;
  console.log('id', id);
  const supabase = createClient();
  const { data: clubMembers, error: membersError } = await supabase
    .from('members')
    .select('*')
    .eq('club_id', id);
  if (membersError) {
    throw new Error('멤버 정보를 가져오는 도중 오류가 발생했습니다.');
  }
  //   clubMembers는 회원 정보 배열
  //   console.log('clubMembers', clubMembers);
  const profilePromises = clubMembers?.map(async (clubMember) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', clubMember.user_id)
      .single();
    console.log('data', data);
    // console.log('data..id', data?.id);
    if (error) {
      throw new Error('프로필 정보를 가져오는 도중 오류가 발생했습니다');
    }
    // data는 클럽 회원의 프로필 정보 객체
    return data;
  });
  const profilesData = await Promise.all(profilePromises || []);
  //   profilesData는 모든 회원의 프로필 정보 배열
  //   console.log('profilesData', profilesData);
  const matchingProfile = profilesData.find(
    (profile) => profile?.id === clubMembers[0]?.user_id
  );

  console.log('matchingProfile', matchingProfile);
  const matchingProfileId = matchingProfile?.id;

  // club_activities 테이블에서 user_id가 matchingProfileId와 일치하는 데이터
  const { data: clubActivities, error: activitiesError } = await supabase
    .from('club_activities')
    .select('*')
    .eq('user_id', matchingProfileId || '');

  if (activitiesError) {
    throw new Error('클럽 활동 정보를 가져오는 도중 오류가 발생했습니다.');
  }

  console.log('clubActivities', clubActivities);

  // clubActivities 배열에서 clubid가 일치하는 데이터 필터링
  const matchingActivities = clubActivities.filter(
    (activity) => activity.club_id === id
  );

  console.log('matchingActivities', matchingActivities);
  // clubs 테이블에서 클럽 ID와 param(코드 최상단)에 해당하는 데이터 조회
  const { data: clubData, error: clubError } = await supabase
    .from('clubs')
    .select('*')
    .eq('id', id)
    .single();

  if (clubError) {
    throw new Error('클럽 정보를 가져오는 도중 오류가 발생했습니다.');
  }

  console.log('clubData', clubData);
  return (
    <>
      <BookInfo clubData={clubData} />
      <>페이지인풋</>
      <>독서프로그레스바</>
      <>저장버튼</>
    </>
  );
};

export default page;
