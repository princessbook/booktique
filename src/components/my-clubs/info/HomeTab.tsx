import React, { useState, useEffect } from 'react';
import Members from './Members';
import ClubBook from './ClubBook';
import { Tables } from '@/lib/types/supabase';
import { getBookClubMembers } from '@/utils/userAPIs/authAPI';
import { createClient } from '@/utils/supabase/client';
type Clubs = Tables<'clubs'>;
import formatDate from '@/utils/dateUtils';
type MembersType = {
  club_id: string;
  id: string;
  role: 'admin' | 'member' | null;
  user_id: string | null;
  progress?: number | null; // progress 필드 추가
};
const HomeTab = ({ club }: { club: Clubs | null }) => {
  const [clubMembers, setClubMembers] = useState<MembersType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchClubMembers = async () => {
      if (club?.id) {
        setLoading(true);

        try {
          let clubMem = await getBookClubMembers(club.id);

          // 각 멤버의 progress 값을 가져와 추가
          clubMem = await Promise.all(
            clubMem.map(async (member) => {
              const progress = await getUserProgress(member.user_id, club.id);
              return { ...member, progress };
            })
          );

          // 오름차순으로 정렬
          const sortedMembers = clubMem.sort(
            (a, b) => (b.progress ?? 0) - (a.progress ?? 0)
          );

          setClubMembers(sortedMembers);
        } catch (error) {
          console.error('Error fetching club members:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchClubMembers();
  }, [club]);

  const getUserProgress = async (userId: string | null, clubId: string) => {
    if (!userId) return 0;
    try {
      const supabase = createClient();
      const { data: activity, error: activityError } = await supabase
        .from('club_activities')
        .select('progress')
        .eq('club_id', clubId)
        .eq('user_id', userId)
        .order('progress', { ascending: false });

      if (activityError) {
        console.log('값 불러오는데 오류있음');
        throw activityError;
      }
      return activity[0]?.progress || 0; // progress 값이 없을 경우 0 반환
    } catch (error) {
      console.error('Error fetching user progress:', error);
      return 0;
    }
  };
  const createdAt = new Date(club?.created_at || '');
  const endDate = new Date(createdAt.getTime());
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(endDate.getDate() - 1);

  const formattedStartDate = formatDate(createdAt);
  const formattedEndDate = formatDate(endDate);

  return (
    <div className='overflow-y-scroll'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='p-5 text-fontMain'>
          <p className='text-[16px] font-bold '>함께 읽고 있는 책</p>
          <ClubBook club={club} />
          <div className='mt-8'>
            <p className='text-[16px] mb-4 font-bold'>멤버별 독서 진행률</p>
            <div className='grid grid-cols-3 gap-4'>
              {clubMembers.map((member, index) => (
                <Members member={member} key={index} index={index} />
              ))}
            </div>
          </div>
          <div className='mt-8 text-fontTitle'>
            <p className='font-bold'>모임 정보</p>
            <div className=' mt-4 flex text-[14px] h-[40px] font-medium items-center py-[11px] w-full '>
              <p className='text-subblue font-bold'>모임 기간</p>
              <p className='ml-4 text-fontMain'>
                {formattedStartDate} ~ {formattedEndDate}
              </p>
            </div>
            <p className='mt-8 font-bold'>북클럽 소개</p>
            <p className='mt-4 text-fontMain text-[14px]'>
              {club?.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeTab;
