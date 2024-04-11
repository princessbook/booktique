import React from 'react';
import { createClient } from '@/utils/supabase/server';
import BookInfo from './BookInfo';
import { redirect } from 'next/navigation';

const ReadBookDetail = async ({
  params: { id }
}: {
  params: { id: string };
}) => {
  const param = id;
  console.log('param111111111111111111', param);
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();
  console.log('data', user?.id);
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
  const { data: clubData, error: clubDataError } = await supabase
    .from('clubs')
    .select('*')
    .eq('id', id);
  if (clubDataError) {
    throw new Error('클럽 정보를 가져오는 도중 오류가 발생했습니다.');
  }

  // const channelName = `book_channel_${id}`; // id를 사용하여 채널 이름을 생성합니다.
  // const bookChannel = supabase.channel(channelName); // 생성된 채널 객체를 가져옵니다.
  // console.log('channelName', channelName);
  // console.log('bookChannel', bookChannel);
  // // 채널에 입장하는 코드
  // bookChannel.subscribe();

  return (
    <>
      <BookInfo clubData={clubData} clubId={id} clubMembers={clubMembers} />
      {/* <MemberList id={id} clubMembers={clubMembers} /> */}
    </>
  );
};

export default ReadBookDetail;
