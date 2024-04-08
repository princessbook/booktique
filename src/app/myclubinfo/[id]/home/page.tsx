import React from 'react';
import Members from '@/components/myclubinfo/Members';
import ClubBook from '@/components/myclubinfo/ClubBook';
import { Tables } from '@/lib/types/supabase';
import { createClient } from '@/utils/supabase/server';
const HomeTab = async (props: { params: { id: string } }) => {
  //id는 클럽아이디임
  const id = props.params.id;
  const supabase = createClient();
  const { data: clubMembers } = await supabase
    .from('members')
    .select('*')
    .eq('club_id', id);

  const { data: clubinfo, error } = await supabase
    .from('clubs')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    throw error;
  }
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
      <div>
        <p className='px-5 font-medium'>함께 읽고 있는 책</p>
        <ClubBook club={clubinfo} />
        <div>
          <p className='px-5 mb-2 mt-3 font-medium'>멤버별 독서 진행률</p>
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
