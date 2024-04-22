'use client';
import { createClient } from '@/utils/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useMessage } from '@/store/messages';
import Image from 'next/image';
import booktique from '../../../public/defaultImage.svg';
import { IoIosArrowBack } from 'react-icons/io';
import BackBtn from '@/app/(navigationBar)/bookclubs/[id]/BackBtn';

const ChatPresence = ({ userId }: { userId: string | undefined }) => {
  const msgs = useMessage((state) => state.messages);
  const [clubData, setClubData] = useState<any>(null);
  const params = useParams();
  const clubId = params.id;
  const supabase = createClient();
  const [onlineUsers, setOnlineUsers] = useState(0);
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
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
    <div className='flex items-center gap-2 bg-[#c6edff] px-2 py-5'>
      {/* <IoIosArrowBack
        className=' cursor-pointer'
        onClick={handleBack}
        size={40}
      /> */}
      <BackBtn />
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
      <div className='flex-1'>{clubData?.name}</div>
      <div className='flex items-center gap-2 max-w-[54px]'>
        <div className='h-4 w-4 bg-green-500 rounded-full animate-pulse'></div>
        <h1 className='text-sm text-black font-bold'>{onlineUsers}명</h1>
      </div>
    </div>
  );
};

export default ChatPresence;
