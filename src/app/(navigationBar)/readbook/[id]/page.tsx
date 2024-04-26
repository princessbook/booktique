import React from 'react';
import { createClient } from '@/utils/supabase/server';
import BookInfo from './BookInfo';
import { redirect } from 'next/navigation';
import ChatInfo from '@/components/realtime/ChatInfo';

const ReadBookDetail = async ({
  params: { id }
}: {
  params: { id: string };
}) => {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  // console.log('data', user?.id);
  if (!user?.id) {
    redirect('/login');
  }

  // 데이터를 가져오는 부분이 SSR 인데? 화면에 뿌리지는 않음,, 이걸 가지고 client 컴포넌트에 Props로 넘기고 있는데..
  // 기존이 좋은걸까,, 아니면 필요한 부분에서 데이터를 get 해오는게 좋은걸까
  // const { data, error } = await supabase
  //   .from('clubs')
  //   .select('*, members(*, profiles(*), club_activities(*))')
  //   .eq('id', id)
  //   .single();

  // console.log(data, '==============================');

  // const { data: clubMembers, error: membersError } = await supabase
  //   .from('members')
  //   .select('*')
  //   .eq('club_id', id);
  // if (membersError) {
  //   throw new Error('멤버 정보를 가져오는 도중 오류가 발생했습니다.');
  // }

  // const { data: clubData, error: clubDataError } = await supabase
  //   .from('clubs')
  //   .select('*')
  //   .eq('id', id);
  // if (clubDataError) {
  //   throw new Error('클럽 정보를 가져오는 도중 오류가 발생했습니다.');
  // }

  return (
    <>
      <BookInfo
        // joinClubData={{clubData:joinClubData, clubId:id, clubMembers:joinClubData?.members}}
        // clubData={clubData}
        userId={user?.id as string}
        clubId={id}
        // clubMembers={clubMembers}
        chat={<ChatInfo id={id} />}
      />
    </>
  );
};

export default ReadBookDetail;
