'use server';
import { MEMBERS_TABLE } from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/server';
import { addOneMonth, extractDate } from '@/utils/time';
import React from 'react';
import Image from 'next/image';

import BookClubDetailCSR from './BookClubCSR';

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
      <section className=' bg-grayBg p-4 py-4'>
        <div className='flex justify-between'>
          <h1 className='font-bold text-[18px] mb-2'>{bookclub.name}</h1>
          {/* <p>모집중</p> */}
        </div>
        <div className='flex items-center'>
          <div className=' mr-3 w-24 r-3 flex-shrink-0 flex items-center justify-center'>
            {bookclub.book_cover && (
              <Image
                src={bookclub.book_cover}
                alt='북커버'
                width={110}
                height={141}
              />
            )}
          </div>
          <div className=''>
            <h2 className='mb-3 text-[16px] font-bold'>
              {bookclub.book_title}
            </h2>
            {/* <p>모집기간:</p> */}
            <p className='text-[14px]'>
              시작:{extractDate(bookclub.created_at)}
            </p>
            <p className='text-[14px]'>
              종료:{extractDate(addOneMonth(bookclub.created_at))}
            </p>
            <p className='text-[14px]'>{bookclub.book_page}p</p>
          </div>
        </div>
      </section>
      <section className='p-3'>
        <div className='mb-3 h-32'>
          <h2 className='mb-3 font-bold'>소개</h2>
          <p>{bookclub.description}</p>
        </div>
      </section>
      <BookClubDetailCSR id={id} isMember={isMember} />
    </div>
  );
};

export default BookClubDetail;
