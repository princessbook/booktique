import { LIMIT_MESSAGE } from '@/lib/constant';
import { getFromAndTo } from '@/lib/utils';
import { useMessage } from '@/store/messages';
import { createClient } from '@/utils/supabase/client';
import React from 'react';

export default function LoadMoreMessages() {
  const page = useMessage((state) => state.page);
  const setMessage = useMessage((state) => state.setMessages);
  const hasMore = useMessage((state) => state.hasMore);
  const fetchMore = async () => {
    const { from, to } = getFromAndTo(page, LIMIT_MESSAGE);
    const supabase = createClient();
    const { data, error } = await supabase
      .from('messages')
      .select('*,profiles(*),clubs(*)')
      .range(from, to)
      .order('created_at', { ascending: false });
    if (error) {
      console.log(error);
    } else {
      setMessage(data.reverse());
    }
  };
  if (hasMore) {
    return (
      <button
        className='w-full bg-[#1c2990] rounded-xl text-white px-3'
        onClick={fetchMore}>
        Load More
      </button>
    );
  }
  return <></>;
}
