import { createClient } from '@/utils/supabase/server';
import React from 'react';
import SaveBookInfo from './SaveBookInfo';
import SaveCard from './SaveCard';
// import Link from 'next/link';
import { redirect } from 'next/navigation';

const SavePage = async ({ params: { id } }: { params: { id: string } }) => {
  // id는 클럽 id임
  //   const page = async ({
  //   params: { id }
  // }: {
  //   params: { id: string };
  // }) => {
  //   const id = props.params.id;
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();
  // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', user?.id);
  if (!user?.id) {
    redirect('/login');
  }
  // if (user?.id === null || user?.id === undefined) {
  //   return;
  // }
  // if (user?.id === null || user?.id === undefined) {
  //   return <Link href={'/login'}>dd</Link>;
  // }
  // <Link> 컴포넌트는 단순히 다른 페이지로의 링크를 설정할 뿐, 화면에는 나타나지 않습니다.
  const { data: clubMembers, error: membersError } = await supabase
    .from('members')
    .select('*')
    .eq('club_id', id);
  if (membersError) {
    throw new Error('멤버 정보를 가져오는 도중 오류가 발생했습니다.');
  }
  // console.log('clubMembers', clubMembers);
  //   clubMembers는 회원 정보 배열
  const profilePromises = clubMembers?.map(async (clubMember) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', clubMember.user_id as string)
      .single();
    // console.log('data', data);
    if (error) {
      throw new Error('프로필 정보를 가져오는 도중 오류가 발생했습니다');
    }
    // data는 클럽 회원의 프로필 정보 객체
    return data;
  });
  const profilesData = await Promise.all(profilePromises || []);
  //   profilesData는 모든 회원의 프로필 정보 배열
  // console.log('profilesData', profilesData);
  const matchingProfile = profilesData.find(
    (profile) => profile?.id === user?.id
  );
  // console.log('matchingProfile', matchingProfile);
  const matchingProfileId = matchingProfile?.id;

  // console.log('matchingProfileId', matchingProfileId);

  // club_activities 테이블에서 user_id가 matchingProfileId와 일치하는 데이터
  const { data: clubActivities, error: activitiesError } = await supabase
    .from('club_activities')
    .select('*')
    .eq('user_id', matchingProfileId || '');
  console.log('clubActivities1111111111111111111', clubActivities);
  if (activitiesError) {
    throw new Error('클럽 활동 정보를 가져오는 도중 오류가 발생했습니다.');
  }
  // console.log('clubActivities', clubActivities);
  // clubActivities 배열에서 clubid가 일치하는 데이터 필터링
  const matchingActivities = clubActivities.filter(
    (activity) => activity.club_id === id
  );
  // console.log('matchingActivities', matchingActivities);
  // clubs 테이블에서 클럽 ID와 param(코드 최상단)에 해당하는 데이터 조회
  const { data: clubData, error: clubError } = await supabase
    .from('clubs')
    .select('*')
    .eq('id', id)
    .single();

  if (clubError) {
    throw new Error('클럽 정보를 가져오는 도중 오류가 발생했습니다.');
  }
  // console.log('matchingActivities1111', matchingActivities);
  return (
    <div className='bg-white h-full'>
      <SaveBookInfo clubData={clubData} clubId={id} />
      <SaveCard
        clubData={clubData}
        matchingActivities={matchingActivities}
        id={id}
      />
    </div>
  );
};

export default SavePage;
