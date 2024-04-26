'use client';
import { createClient } from '@/utils/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarGroup } from '@nextui-org/react';

const ChatPresence = ({ userId }: { userId: string | undefined }) => {
  const [clubData, setClubData] = useState<any>(null);
  const params = useParams();
  const clubId = params.id;
  const supabase = createClient();
  const [onlineUsers, setOnlineUsers] = useState(0);
  useEffect(() => {
    const channel = supabase.channel(params.id[0]);
    channel
      .on('presence', { event: 'sync' }, () => {
        // console.log('Synced presence state: ', channel.presenceState());
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
    <div className='flex items-center gap-2  px-2 py-2'>
      <div className='flex-1'>
        {/* <AvatarGroup isBordered max={3} total={10} className='z-30'>
          <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
          <Avatar src='https://i.pravatar.cc/150?u=a04258a2462d826712d' />
          <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026704d' />
          <Avatar src='https://i.pravatar.cc/150?u=a04258114e29026302d' />
          <Avatar src='https://i.pravatar.cc/150?u=a04258114e29026702d' />
          <Avatar src='https://i.pravatar.cc/150?u=a04258114e29026708c' />
        </AvatarGroup> */}
      </div>
      <div className='flex items-center gap-2 max-w-[54px]'>
        <div className='h-4 w-4 bg-green-500 rounded-full animate-pulse'></div>
        <h1 className='text-sm text-black font-bold'>{onlineUsers}명</h1>
      </div>
    </div>
  );
};

export default ChatPresence;
