'use server';
import { MEMBERS_TABLE } from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/server';
import { addOneMonth, extractDate } from '@/utils/time';
import React from 'react';
import Image from 'next/image';

import BookClubDetailCSR from './BookClubCSR';
import BackBtn from './BackBtn';

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
    <div className='mb-[78px] overflow-y-auto '>
      <h2 className='h-[54px] relative flex text-[17px] items-center justify-center'>
        <BackBtn />
        <div>북클럽 찾기</div>
      </h2>
      <section className='bg-[#EDEEF2] p-4 py-6 mb-6'>
        <div className='flex justify-between'>
          <h1 className='font-bold text-[18px] mb-2 text-fontBlack opacity-80'>
            {bookclub.name}
          </h1>
          {/* <p>모집중</p> */}
        </div>
        <div className='flex items-center'>
          <div className=' mr-3 w-[78px] r-3  flex-shrink-0 flex items-center justify-center'>
            {bookclub.book_cover && (
              <Image
                src={bookclub.book_cover}
                alt='북커버'
                width={78}
                height={141}
              />
            )}
          </div>
          <div className=''>
            <h2 className='mb-5 text-[14px] font-bold'>
              {bookclub.book_title}
            </h2>
            {/* <p>모집기간:</p> */}
            {/* <p className='text-[14px]'>
              시작:{extractDate(bookclub.created_at)}
            </p>
            <p className='text-[14px]'>
              종료:{extractDate(addOneMonth(bookclub.created_at))}
            </p> */}
            <p className=' text-fontBlack text-[12px]'>
              {bookclub.book_author}p
            </p>
            <p className='text-fontBlack text-[12px]'>{bookclub.book_page}p</p>
          </div>
        </div>
      </section>
      <section className='p-3'>
        <div className='mb-4'>
          <h2 className='mb-3 font-bold text-[16px] text-[#292929]'>
            북클럽 소개
          </h2>
          <p className='text-[14px] text-fontBlack'>{bookclub.description}</p>
        </div>
      </section>
      <section className='p-3'>
        <h2 className='mb-3 font-bold text-[16px] text-[#292929]'>모임 정보</h2>
        <p className='text-[14px] mb-2 text-fontBlack'>
          <span className=' text-mainblue font-bold mr-1'>모임 날</span>
          매주 월, 화, 수, 목, 금, 토, 일
        </p>
        <p className='text-[14px] text-fontBlack'>
          <span className='text-mainblue font-bold mr-1'>모임 기간</span>
          {extractDate(bookclub.created_at)}-
          {extractDate(addOneMonth(bookclub.created_at))}
        </p>
      </section>
      <BookClubDetailCSR id={id} isMember={isMember} />
    </div>
  );
};

export default BookClubDetail;
