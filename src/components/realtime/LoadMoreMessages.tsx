import { LIMIT_MESSAGE } from '@/lib/constant';
import { getFromAndTo } from '@/lib/utils';
import { useMessage } from '@/store/messages';
import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

export default function LoadMoreMessages() {
  const params = useParams();
  const { page, setMessages, hasMore } = useMessage((state) => state);
  const fetchMore = async () => {
    const { from, to } = getFromAndTo(page, LIMIT_MESSAGE);
    console.log(from, to);
    const supabase = createClient();
    const { data, error } = await supabase
      .from('messages')
      .select('*,profiles(*),clubs(*)')
      .eq('club_id', params.id)
      .range(from, to)
      .order('created_at', { ascending: false }); //메세지 생성시간 기준으로 내림차순 정렬
    if (error) {
      console.error(error);
    } else {
      setMessages(data.reverse());
    }
  };
  if (hasMore) {
    //더 업데이트할 메세지가 있으면 버튼띄우고 없으면 지움
    return (
      <button
        className='w-full bg-[#1c2990] rounded-xl text-white px-3'
        onClick={fetchMore}>
        채팅 더보기
      </button>
    );
  }
  return <></>;
}
