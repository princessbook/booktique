'use client';
import { useUser } from '@/store/user';
import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Imessage, useMessage } from '@/store/messages';
import Image from 'next/image';
import booktique from '../../../public/booktique.png';

const ChatPresence = ({ userId }: { userId: string | undefined }) => {
  const msgs = useMessage((state) => state.messages);
  const [clubData, setClubData] = useState<any>(null);
  console.log(msgs);
  const params = useParams();
  const clubId = params.id;
  const clubPre = msgs.filter((msg) => msg.club_id === clubId);
  console.log(clubPre[0]);
  // console.log(clubPre[0].clubs?.name);
  const supabase = createClient();
  const [onlineUsers, setOnlineUsers] = useState(0);
  useEffect(() => {
    const fetchClubData = async () => {
      try {
        // 클럽 ID를 사용하여 Supabase에서 해당하는 클럽 데이터를 가져옵니다
        const { data, error } = await supabase
          .from('clubs')
          .select('*')
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

    const channel = supabase.channel(params.id[0]);
    channel
      .on('presence', { event: 'sync' }, () => {
        console.log('Synced presence state: ', channel.presenceState());
        const userIds = Object.keys(channel.presenceState()); // 프리젠스 상태에서 사용자 ID 추출
        setOnlineUsers(userIds.length);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: userId
          });
        }
      });
  }, [userId, clubId]);
  if (!userId) {
    return <div className='h-3 w-1'></div>;
  }
  return (
    <div className='flex items-center gap-1 bg-[#c6edff] pl-2'>
      {clubData?.thumbnail ? (
        <Image
          width={40}
          height={40}
          src={clubData?.thumbnail}
          alt='Thumbnail'
          className='rounded-xl'
        />
      ) : (
        <Image
          width={40}
          height={40}
          src={booktique}
          alt='Thumbnail'
          className='rounded-xl'
        />
      )}
      <div>{clubData?.name}</div>
      <div className='h-4 w-4 bg-green-500 rounded-full animate-pulse'></div>
      <h1 className='text-sm text-black font-bold'>{onlineUsers}</h1>
    </div>
  );
};

export default ChatPresence;
