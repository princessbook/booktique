import React from 'react';
import Members from './Members';
import ClubBook from './ClubBook';
import { Tables } from '@/lib/types/supabase';
import { createClient } from '@/utils/supabase/server';
type Clubs = Tables<'clubs'>;
import formatDate from '@/utils/dateUtils';
import ResignBtn from './ResignBtn';

const HomeTab = async ({ club }: { club: Clubs | null }) => {
  if (!club) {
    return null;
  }
  const supabase = createClient();
  const getBookClubMembers = async (clubId: string) => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*, club_activities(progress)')
        .eq('club_id', clubId);

      if (error) {
        console.error('클럽멤버 불러오기 실패:', error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('클럽멤버 불러오기 실패:', error);
      return [];
    }
  };
  const clubMembers = await getBookClubMembers(club.id);

  const createdAt = new Date(club?.created_at || '');
  const endDate = new Date(createdAt.getTime());
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(endDate.getDate() - 1);

  const formattedStartDate = formatDate(createdAt);
  const formattedEndDate = formatDate(endDate);

  return (
    <div className='overflow-y-scroll mb-[78px]'>
      <div className='p-5 text-fontMain'>
        <p className='text-[16px] font-bold '>함께 읽고 있는 책</p>
        <ClubBook club={club} />
        <div className='mt-8'>
          <p className='text-[16px] mb-4 font-bold'>멤버별 독서 진행률</p>
          <div className='grid grid-cols-3 gap-4'>
            {clubMembers
              .map((member, index) => {
                let progress = 0;
                if (member.club_activities.length > 0) {
                  progress = member.club_activities[0].progress ?? 0;
                }
                return {
                  ...member,
                  progress
                };
              })
              .toSorted((a, b) => {
                return b.progress - a.progress;
              })
              .map((data, index) => {
                return <Members member={data} key={index} index={index} />;
              })}
          </div>
        </div>
        <div className='mt-8 text-fontTitle'>
          <p className='font-bold'>북클럽 기간</p>
          <div className=' mt-4 flex text-[14px] h-[40px] font-medium items-center py-[11px] w-full '>
            <p className='text-subblue font-bold'>기간</p>
            <p className='ml-4 text-fontMain'>
              {formattedStartDate} ~ {formattedEndDate}
            </p>
          </div>
          <p className='mt-8 font-bold'>북클럽 소개</p>
          <p className='mt-4 text-fontMain text-[14px]'>{club?.description}</p>
        </div>
        <ResignBtn clubId={club.id} />
      </div>
    </div>
  );
};

export default HomeTab;
