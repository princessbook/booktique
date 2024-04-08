import React, { useState, useEffect } from 'react';
import Members from './Members';
import ClubBook from './ClubBook';
import { Tables } from '@/lib/types/supabase';
import { getBookClubMembers } from '@/utils/userAPIs/authAPI';
import { createClient } from '@/utils/supabase/client';
import { CLUB_ACTIVITIES_TABLE } from '@/common/constants/tableNames';
type Clubs = Tables<'clubs'>;
type MembersType = {
  club_id: string;
  id: string;
  role: 'admin' | 'member' | null;
  user_id: string;
  progress?: number | null; // progress 필드 추가
};

const HomeTab = ({ club }: { club: Clubs | null }) => {
  const [clubMembers, setClubMembers] = useState<MembersType[]>([]);

  useEffect(() => {
    const fetchClubMembers = async () => {
      if (club?.id) {
        let clubMem = await getBookClubMembers(club.id);

        // 각 멤버의 progress 값을 가져와 추가
        clubMem = await Promise.all(
          clubMem.map(async (member) => {
            const progress = await getUserProgress(member.user_id, club.id);
            return { ...member, progress };
          })
        );
        // progress 값에 따라 내림차순으로 정렬
        const sortedMembers = clubMem.sort((a, b) => {
          return (b.progress ?? 0) - (a.progress ?? 0);
        });

        setClubMembers(sortedMembers);
      }
    };

    fetchClubMembers();
  }, [club]);

  const getUserProgress = async (userId: string, clubId: string) => {
    try {
      const supabase = createClient();
      const { data: activity, error: activityError } = await supabase
        .from(CLUB_ACTIVITIES_TABLE)
        .select('progress')
        .eq('club_id', clubId)
        .eq('user_id', userId)
        .order('progress', { ascending: false });

      if (activityError) {
        throw activityError;
      }
      return activity[0]?.progress || 0; // progress 값이 없을 경우 0 반환
    } catch (error) {
      console.error('Error fetching user progress:', error);
      return 0;
    }
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const createdAt = new Date(club?.created_at || '');
  const endDate = new Date(createdAt.getTime());
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(endDate.getDate() - 1);

  const formattedStartDate = formatDate(createdAt);
  const formattedEndDate = formatDate(endDate);

  return (
    <div>
      <div className='p-5'>
        <p className='font-medium'>함께 읽고 있는 책</p>
        <ClubBook club={club} />
        <div>
          <p className=' mb-2 font-medium'>전체 독서 진행률</p>
          <div className='grid grid-cols-3 gap-4'>
            {clubMembers.map((member, index) => (
              <Members member={member} key={index} index={index} />
            ))}
          </div>
        </div>
        <div className='p-2'>
          <p className='font-bold'>모임 정보</p>
          <div className='bg-[#EEEFF3] p-2 rounded-lg px-2 mt-2 flex'>
            <p className='text-subblue font-bold'>모임 기간</p>
            <p className='ml-4'>
              {formattedStartDate} ~ {formattedEndDate}
            </p>
          </div>
          <p className='mt-4 font-bold'>북클럽 소개</p>
          <p>{club?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
