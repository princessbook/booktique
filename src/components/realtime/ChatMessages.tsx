import React, { Suspense } from 'react';
import ListMessages from './ListMessages';
import { createClient } from '@/utils/supabase/server';
import InitMessages from '@/store/InitMessages';
import ChatPresence from './ChatPresence';

const ChatMessages = async () => {
  const supabase = createClient();
  const { data } = await supabase
    .from('messages')
    .select('*,profiles(*),clubs(*)');
  const clubsIds = data?.map((message) => message.clubs && message.clubs.id);
  const getUser = await supabase.auth.getUser();
  const userId = getUser.data.user?.id;
  console.log('123213123213', userId);
  return (
    <Suspense fallback={'loading...'}>
      <ChatPresence userId={userId} />
      <ListMessages clubsIds={clubsIds} />
      <InitMessages messages={data || []} />
    </Suspense>
  );
};

export default ChatMessages;
