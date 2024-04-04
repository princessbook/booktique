import React from 'react';
import MemberList from './MemberList';
import { createClient } from '@/utils/supabase/server';

const ReadBookDetail = async (props: { params: { id: string } }) => {
  const id = props.params.id;
  const supabase = createClient();

  const { data: clubMembers, error: membersError } = await supabase
    .from('members')
    .select('*')
    .eq('club_id', id);
  if (membersError) {
    throw new Error('멤버 정보를 가져오는 도중 오류가 발생했습니다.');
  }
  return (
    <>
      <MemberList clubMembers={clubMembers} />
    </>
  );
};

export default ReadBookDetail;
