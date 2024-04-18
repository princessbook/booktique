import { LIMIT_MESSAGE } from '@/lib/constant';
import { getFromAndTo } from '@/lib/utils';
import { useMessage } from '@/store/messages';
import { createClient } from '@/utils/supabase/client';
import React from 'react';

export default function LoadMoreMessages() {
  const page = useMessage((state) => state.page); //page현재로드된 메세지페이지번호
  const setMessage = useMessage((state) => state.setMessages); //메세지의 상태
  const hasMore = useMessage((state) => state.hasMore); //더 업데이트할 메세지가 있는지
  const fetchMore = async () => {
    const { from, to } = getFromAndTo(page, LIMIT_MESSAGE);
    const supabase = createClient();
    const { data, error } = await supabase
      .from('messages')
      .select('*,profiles(*),clubs(*)')
      .range(from, to)
      .order('created_at', { ascending: false }); //메세지 생성시간 기준으로 내림차순 정렬
    if (error) {
      console.log(error);
    } else {
      setMessage(data.reverse());
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
