import React from 'react';
import Members from '@/components/myclubinfo/Members';
import ClubBook from '@/components/myclubinfo/ClubBook';
import { createClient } from '@/utils/supabase/server';
import { getBookClubMembers } from '@/utils/userAPIs/authAPI';
import { CLUB_ACTIVITIES_TABLE } from '@/common/constants/tableNames';
const HomeTab = async (props: { params: { id: string } }) => {
  //id는 클럽아이디임
  const id = props.params.id;
  const supabase = createClient();

  let clubMembers = await getBookClubMembers(id);
  clubMembers = await Promise.all(
    clubMembers.map(async (member) => {
      const progress = await getUserProgress(member.user_id, id);
      return { ...member, progress };
    })
  );
  clubMembers.sort((a, b) => (b.progress || 0) - (a.progress || 0)); // 내림차순 정렬

  const { data: clubinfo, error } = await supabase
    .from('clubs')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    throw error;
  }
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
  const createdAt = new Date(clubinfo.created_at);
  const endDate = new Date(createdAt.getTime());
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(endDate.getDate() - 1);

  const formattedStartDate = formatDate(createdAt);
  const formattedEndDate = formatDate(endDate);
  return (
    <div>
      <div className='p-5'>
        <p className=' font-medium'>함께 읽고 있는 책</p>
        <ClubBook club={clubinfo} />
        <div>
          <p className='mb-2 mt-3 font-medium'>멤버별 독서 진행률</p>
          <div className='flex flex-wrap justify-center gap-2'>
            {clubMembers &&
              clubMembers.map((member, index) => {
                return <Members member={member} key={index} />;
              })}
          </div>
        </div>
        <div>
          <div className='p-3'>
            <p className='font-bold'>모임 정보</p>
            <div className='bg-[#EEEFF3] p-4 rounded-lg px-3 mt-2 flex'>
              <p className='text-subblue font-bold'>모임 기간</p>
              <p className='ml-4'>
                {formattedStartDate} ~ {formattedEndDate}
              </p>
            </div>
            <p className='mt-4 font-bold'>북클럽 소개</p>
            <p>{clubinfo.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
