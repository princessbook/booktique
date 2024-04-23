import React, { Suspense } from 'react';
import ListMessages from './ListMessages';
import { createClient } from '@/utils/supabase/server';
import InitMessages from '@/store/InitMessages';
import ChatPresence from './ChatPresence';
import { LIMIT_MESSAGE } from '@/lib/constant';
import ChatBackImg from './ChatBackImg';

const ChatMessages = async () => {
  const supabase = createClient();
  const { data } = await supabase
    .from('messages')
    .select('*,profiles(*),clubs(*)')
    .range(0, LIMIT_MESSAGE)
    .order('created_at', { ascending: false });
  const getUser = await supabase.auth.getUser();
  const userId = getUser.data.user?.id;

  console.log('데이터', getUser.data.user);

  return (
    <Suspense fallback={'loading...'}>
      <ChatBackImg userId={userId} />
      <InitMessages messages={data?.reverse() || []} />
    </Suspense>
  );
};

export default ChatMessages;
