'use client';
import { useUser } from '@/store/user';
import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ChatPresence = ({ userId }: { userId: string | undefined }) => {
  const params = useParams();
  console.log('??', params.id);
  const supabase = createClient();
  const [onlineUsers, setOnlineUsers] = useState(0);
  useEffect(() => {
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
  }, [userId]);
  if (!userId) {
    return <div className='h-3 w-1'></div>;
  }
  return (
    <div className='flex items-center gap-1'>
      <div className='h-4 w-4 bg-green-500 rounded-full animate-pulse'></div>
      <h1 className='text-sm text-gray-400'>{onlineUsers}</h1>
    </div>
  );
};

export default ChatPresence;
