import { MEMBERS_TABLE } from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/server';
import { addOneMonth, extractDate } from '@/utils/time';
import React from 'react';
import JoinBtn from './JoinBtn';
import ClubMemberProfile from './ClubMemberProfile';

const BookClubDetail = async (props: { params: { id: string } }) => {
  const id = props.params.id;
  const supabase = createClient();

  const { data: bookclub, error } = await supabase
    .from('clubs')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    throw error;
  }

  const { data: clubMembers, error: membersError } = await supabase
    .from(MEMBERS_TABLE)
    .select('*')
    .eq('club_id', id);

  console.log(clubMembers);

  if (!bookclub) return;
  return (
    <div>
      <h2 className='text-center'>북클럽 상세페이지</h2>
      <section className='bg-gray-200 p-2'>
        <div className='flex justify-between'>
          <h1>{bookclub.name}</h1>
          {/* <p>모집중</p> */}
        </div>
        <div className='flex'>
          <div className='bg-gray-600 w-24 h-32 mr-3'>책사진</div>
          <div>
            <h2 className='mb-3 font-bold'>지적 대화를 위한 넓고 얕은 지식1</h2>
            {/* <p>모집기간:</p> */}
            <p>시작:{extractDate(bookclub.created_at)}</p>
            <p>종료:{extractDate(addOneMonth(bookclub.created_at))}</p>
            <p>400p</p>
          </div>
        </div>
      </section>
      <section className='p-3'>
        <div className='mb-3'>
          <h2 className='mb-3 h-32'>소개</h2>
          <p>{bookclub.description}</p>
        </div>
      </section>
      <section className='p-3'>
        <h2 className='mb-4'>{`참여인원(${
          clubMembers ? clubMembers.length : 0
        }/${bookclub.max_member_count})`}</h2>
        <div className='grid grid-cols-4 gap-3'>
          {clubMembers &&
            clubMembers.map((member, index) => {
              return <ClubMemberProfile member={member} key={index} />;
            })}
        </div>
      </section>
      {clubMembers!.length === bookclub.max_member_count ? (
        '모집인원꽉참'
      ) : (
        <JoinBtn clubId={id} />
      )}
    </div>
  );
};

export default BookClubDetail;
