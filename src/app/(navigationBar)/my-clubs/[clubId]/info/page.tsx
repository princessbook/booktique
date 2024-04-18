import HomeTab from '@/components/my-clubs/info/HomeTab';
import React from 'react';
import { createClient } from '@/utils/supabase/server';

const InfoPage = async (props: { params: { clubId: string } }) => {
  const clubId = props.params.clubId;
  const supabase = createClient();
  const { data: club } = await supabase
    .from('clubs')
    .select('*')
    .eq('id', clubId);
  if (!club) {
    return <div>로딩 중...</div>;
  }
  return <HomeTab club={club[0]} />;
};

export default InfoPage;
