'use server';
import { MEMBERS_TABLE } from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/server';
import { addOneMonth, extractDate } from '@/utils/time';
import React from 'react';
import JoinBtn from './JoinBtn';
import ClubMemberProfile from './ClubMemberProfile';
import Image from 'next/image';
import ResignBtn from './ResignBtn';
import JoinAndResignBtn from './JoinAndResignBtn';
import BookClubCSR from './BookClubCSR';

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

  let isMember = false;
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (user) {
    const { data: members, error } = await supabase
      .from(MEMBERS_TABLE)
      .select('*')
      .eq('user_id', user.id)
      .eq('club_id', id);
    if (members && members.length > 0) {
      isMember = true;
    } else {
      isMember = false;
    }
  }

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
          <div className='bg-gray-600 w-24 h-32 mr-3'>
            {bookclub.book_cover && (
              <Image
                src={bookclub.book_cover}
                alt='북커버'
                width={200}
                height={200}
              />
            )}
          </div>
          <div>
            <h2 className='mb-3 font-bold'>{bookclub.book_title}</h2>
            {/* <p>모집기간:</p> */}
            <p>시작:{extractDate(bookclub.created_at)}</p>
            <p>종료:{extractDate(addOneMonth(bookclub.created_at))}</p>
            <p>{bookclub.book_page}p</p>
          </div>
        </div>
      </section>
      <section className='p-3'>
        <div className='mb-3 h-32'>
          <h2 className='mb-3 font-bold'>소개</h2>
          <p>{bookclub.description}</p>
        </div>
      </section>
      <BookClubCSR id={id} isMember={isMember} />
    </div>
  );
};

export default BookClubDetail;
