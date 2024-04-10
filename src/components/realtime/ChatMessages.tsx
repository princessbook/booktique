import React, { Suspense } from 'react';
import ListMessage from './ListMessage';
import { createClient } from '@/utils/supabase/server';

const ChatMessages = async () => {
  const supabase = createClient();
  const { data } = await supabase.from('profiles').select('*');
  console.log(data);
  return (
    <Suspense fallback={'loading...'}>
      <ListMessage />
    </Suspense>
  );
};

export default ChatMessages;
