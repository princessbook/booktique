'use client';
import React, { useEffect, useState } from 'react';
import ListMessages from './ListMessages';
import ChatPresence from './ChatPresence';
import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';

const ChatBackImg = ({ userId }: { userId: string | undefined }) => {
  const [clubData, setClubData] = useState<any>(null);
  const supabase = createClient();
  const params = useParams();
  const clubId = params.id;
  const backgroundImg = clubData?.thumbnail;
  useEffect(() => {
    const fetchClubData = async () => {
      try {
        // 클럽 ID를 사용하여 Supabase에서 해당하는 클럽 데이터를 가져옵니다
        const { data, error } = await supabase
          .from('clubs')
          .select('*,members(*)')
          .eq('id', clubId)
          .single();

        // 에러가 발생하면 에러를 처리합니다
        if (error) {
          throw new Error('클럽 데이터를 가져오는 중 에러가 발생했습니다');
        }

        // 데이터가 존재하면 클럽 데이터 상태를 설정합니다
        if (data) {
          setClubData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // 클럽 데이터를 가져오는 함수를 호출합니다
    fetchClubData();
  }, []);
  console.log(clubData);
  const backgroundStyle = {
    backgroundImage: `url(${clubData?.thumbnail})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: `chatHight`
  };
  return (
    <div style={backgroundStyle}>
      <ChatPresence userId={userId} />
      <ListMessages userId={userId} />
    </div>
  );
};

export default ChatBackImg;
