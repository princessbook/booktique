'use client';
import { getUserId } from '@/utils/userAPIs/authAPI';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import blue from '../../../public/booktiquereadblue.png';
import ReadBookLayout from './layout';
import LoadingOverlay from '@/common/LoadingOverlay';
import { Tables } from '@/lib/types/supabase';
import ClubList from './ClubList';
import { useRouter } from 'next/navigation';

const supabase = createClient();

const ReadBook = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [clubData, setClubData] = useState<Tables<'clubs'>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [allClubData, setAllClubData] = useState<Tables<'clubs'>[]>([]);
  const [activityData, setActivityData] = useState<Tables<'club_activities'>[]>(
    []
  );
  const [filteredBookClubsData, setFilteredBookClubsData] = useState<
    Tables<'clubs'>[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await getUserId();
        setUserId(id);
        if (!id) {
          // const isFirstVisit = sessionStorage.getItem('isFirstVisit');
          // if (!isFirstVisit) {
          //   sessionStorage.setItem('isFirstVisit', 'true');
          //   alert('로그인이 필요합니다');
          // }
          router.push('/');
          alert('로그인이 필요합니다');
          return;
        }

        const { data: memberData, error: memberError } = await supabase
          .from('members')
          .select('club_id')
          .eq('user_id', id);
        console.log('memberData', memberData);
        if (memberError) {
          throw new Error(
            '해당 회원이 등록된 클럽정보를 가져오는 도중 오류가 발생했습니다.'
          );
        }

        if (!memberData || memberData.length === 0) {
          throw new Error('해당 회원의 클럽정보를 찾을 수 없습니다.');
        }

        const clubDataPromises = memberData.map(async (member) => {
          const clubId = member.club_id;
          const { data: clubData, error: clubError } = await supabase
            .from('clubs')
            .select('*')
            .eq('id', clubId)
            .single();

          if (clubError) {
            throw new Error('클럽 정보를 가져오는 도중 오류가 발생했습니다.');
          }
          return clubData;
        });

        const allClubData = await Promise.all(clubDataPromises);
        console.log('allClubData', allClubData);
        setClubData(allClubData);
        setAllClubData(allClubData);
        setLoading(false);

        const { data: activitiesData, error: activitiesError } = await supabase
          .from('club_activities')
          .select('*')
          .eq('user_id', id);

        if (activitiesError) {
          throw new Error('클럽 활동을 가져오는 도중 오류가 발생했습니다.');
        }

        setActivityData(activitiesData || []);

        const { data: bookClubsData, error: bookClubsError } = await supabase
          .from('clubs')
          .select('*');

        console.log('bookClubsData', bookClubsData);
        if (bookClubsError) {
          throw new Error('책 정보를 가져오는 도중 오류가 발생했습니다.');
        }
        const filteredBookClubsData = bookClubsData.filter((bookClub) => {
          return allClubData.some((club) => club.id === bookClub.id);
        });
        setFilteredBookClubsData(filteredBookClubsData);
        console.log('Filtered Book Clubs Data:', filteredBookClubsData);
      } catch (error) {
        console.error('알수없는 오류가 발생했습니다 새로고침 해주세요');
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleBookRead = async (clubId: string) => {
    console.log('1', 1);
    try {
      if (!userId || !clubId) return;

      const existingActivity = activityData.find(
        (activity) => activity.user_id === userId && activity.club_id === clubId
      );
      if (existingActivity) {
        router.push(`/readbook/${clubId}`);
        console.log('이미 클럽 활동이 있습니다.');
        return;
      }
      const validClubId = clubData.find((club) => club.id === clubId);
      if (!validClubId) {
        console.error('유효하지 않은 클럽 ID입니다.');
        return;
      }
      console.log('2', 2);
      await supabase.from('club_activities').insert([
        {
          user_id: userId,
          club_id: clubId,
          progress: 0,
          time: Date.now()
        }
      ]);
      router.push(`/readbook/${clubId}`);
      console.log('클럽 활동 추가되었습니다.');
    } catch (error) {
      console.error('클럽 활동 추가 중 오류:', error);
    }
  };

  if (loading) {
    return <LoadingOverlay show={loading} />;
  }

  return (
    <ReadBookLayout>
      <Image
        src={blue}
        width={134}
        height={26}
        alt={'booktique'}
        className='pt-[80px] mx-auto pb-[24px]'
        priority={true}
      />
      <ClubList
        handleBookRead={handleBookRead}
        clubActivities={activityData}
        filteredBookClubsData={filteredBookClubsData}
      />
    </ReadBookLayout>
  );
};

export default ReadBook;
