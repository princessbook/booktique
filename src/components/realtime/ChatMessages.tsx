import React, { Suspense } from 'react';
import ListMessages from './ListMessages';
import { createClient } from '@/utils/supabase/server';
import InitMessages from '@/store/InitMessages';
import ChatPresence from './ChatPresence';
import { useParams } from 'next/navigation';
import { LIMIT_MESSAGE } from '@/lib/constant';

const ChatMessages = async () => {
  const supabase = createClient();
  const { data } = await supabase
    .from('messages')
    .select('*,profiles(*),clubs(*)')
    .range(0, LIMIT_MESSAGE)
    .order('created_at', { ascending: false });
  const clubsIds = data?.map((message) => message.clubs && message.clubs.id);
  const getUser = await supabase.auth.getUser();
  const userId = getUser.data.user?.id;
  console.log('진짜뭐냐고', userId);
  console.log('00000000000000', clubsIds);
  return (
    <Suspense fallback={'loading...'}>
      <ChatPresence userId={userId} />
      <ListMessages userId={userId} />
      <InitMessages messages={data?.reverse() || []} />
    </Suspense>
  );
};

export default ChatMessages;
