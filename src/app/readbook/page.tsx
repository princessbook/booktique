'use client';
import { getUserId } from '@/utils/userAPIs/authAPI';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import white from '../../../public/booktiquereadwhite.png';
import ReadBookLayout from './layout';
import LoadingOverlay from '@/common/LoadingOverlay';
import { Tables } from '@/lib/types/supabase';

const supabase = createClient();

const MyBookClub = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [clubData, setClubData] = useState<Tables<'clubs'>[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [allClubData, setAllClubData] = useState<Tables<'clubs'>[]>([]); // allClubData 상태 추가
  const [clubId, setClubId] = useState<string>(''); // 클럽 ID 상태 추가

  console.log('userId111111', userId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await getUserId();
        setUserId(id);
        console.log('id', id);
        if (!id) return;

        const { data: memberData, error: memberError } = await supabase
          .from('members')
          .select('club_id')
          .eq('user_id', id);

        if (memberError) {
          throw new Error('멤버십 정보를 가져오는 도중 오류가 발생했습니다.');
        }

        if (!memberData || memberData.length === 0) {
          throw new Error('해당 회원의 멤버십 정보를 찾을 수 없습니다.');
        }

        const clubDataPromises = memberData.map(async (member) => {
          const clubId = member.club_id;
          const { data: clubData, error: clubError } = await supabase
            .from('clubs')
            .select('*')
            .eq('id', clubId)
            .single();
          console.log('clubData', clubData);
          if (clubError) {
            throw new Error('클럽 정보를 가져오는 도중 오류가 발생했습니다.');
          }

          return clubData;
        });

        const allClubData = await Promise.all(clubDataPromises);
        setClubData(allClubData);

        setAllClubData(allClubData); // allClubData 상태 업데이트

        setLoading(false);
        console.log('allClubData', allClubData);
      } catch (error) {
        console.error(error);
        setError('클럽 정보를 가져오는 도중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(1);
  const handleBookRead = async (clubId: string) => {
    console.log('눌림');
    console.log('userId', userId);
    console.log('clubId', clubId);
    try {
      if (!userId || !clubId) return;
      const validClubId = clubData.find((club) => club.id === clubId);
      if (!validClubId) {
        console.error('유효하지 않은 클럽 ID입니다.');
        return;
      }
      // 클럽 활동 추가
      await supabase.from('club_activities').insert([
        {
          user_id: userId,
          club_id: clubId,
          progress: 0,
          time: Date.now()
          // 다른 필요한 데이터도 여기에 추가
        }
      ]);

      // 성공적으로 클럽 활동이 추가되면 어떤 액션을 취할 수 있습니다.
      console.log('클럽 활동 추가되었습니다.');
    } catch (error) {
      console.error('클럽 활동 추가 중 오류:', error);
    }
  };

  if (loading) {
    return <LoadingOverlay show={loading} />;
  }

  if (error) {
    return <div>에러가 발생했습니다: {error}</div>;
  }

  return (
    <ReadBookLayout>
      <div className='flex flex-col'>
        <Image
          src={white}
          width={134}
          height={26}
          alt={'booktique'}
          className='m-auto mt-[80px]'
          priority={true}
        />

        <div className='bg-emerald-500 m-auto'>
          {allClubData.length > 0 && (
            <>
              <div>
                {allClubData.map((club) => (
                  <div key={club.id}>
                    {club.description}
                    <button onClick={() => handleBookRead(club.id)}>
                      북클럽 책읽기
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </ReadBookLayout>
  );
};

export default MyBookClub;
