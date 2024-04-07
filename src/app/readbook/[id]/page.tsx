import React from 'react';
import MemberList from './MemberList';
import { createClient } from '@/utils/supabase/server';
import BookInfo from './BookInfo';

const ReadBookDetail = async ({
  params: { id }
}: {
  params: { id: string };
}) => {
  const param = id;
  console.log('param111111111111111111', param);
  const supabase = createClient();

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
  console.log('clubData11111111111', clubData);
  return (
    <div className='relative h-full bg-white'>
      <BookInfo clubData={clubData} id={id} clubMembers={clubMembers} />
      {/* <MemberList id={id} clubMembers={clubMembers} /> */}
    </div>
  );
};

export default ReadBookDetail;
