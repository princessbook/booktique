import { createClient } from '@/utils/supabase/server';
import React from 'react';
import SaveBookInfo from './SaveBookInfo';
import SaveCard from './SaveCard';
// import Link from 'next/link';
import { redirect } from 'next/navigation';

const SavePage = async ({ params: { id } }: { params: { id: string } }) => {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect('/login');
  }

  const { data: clubMembers, error: membersError } = await supabase
    .from('members')
    .select('*')
    .eq('club_id', id);
  if (membersError) {
    throw new Error('멤버 정보를 가져오는 도중 오류가 발생했습니다.');
  }

  const profilePromises = clubMembers?.map(async (clubMember) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', clubMember.user_id as string)
      .single();
    if (error) {
      throw new Error('프로필 정보를 가져오는 도중 오류가 발생했습니다');
    }
    return data;
  });
  const profilesData = await Promise.all(profilePromises || []);
  const matchingProfile = profilesData.find(
    (profile) => profile?.id === user?.id
  );

  const matchingProfileId = matchingProfile?.id; //유저 아이디를 가져왔다

  const { data: clubActivities, error: activitiesError } = await supabase
    .from('club_activities')
    .select('*')
    .eq('user_id', matchingProfileId || '');
  if (activitiesError) {
    throw new Error('클럽 활동 정보를 가져오는 도중 오류가 발생했습니다.');
  }
  const matchingActivities = clubActivities.filter(
    (activity) => activity.club_id === id
  );
  const { data: clubData, error: clubError } = await supabase
    .from('clubs')
    .select('*')
    .eq('id', id)
    .single();

  if (clubError) {
    throw new Error('클럽 정보를 가져오는 도중 오류가 발생했습니다.');
  }
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
