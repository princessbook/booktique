import { Tables } from '@/lib/types/supabase';
import React from 'react';

const BookInfo = ({ clubData }: { clubData: Tables<'clubs'> }) => {
  return (
    <div className='flex flex-col'>
      <div className='flex justify-center mt-[78px]'>
        책 읽기 종료하고 기록하기
      </div>
      <div className='flex justify-center mt-[16px] gap-[19.92px]'>
        <figure>
          <img src={clubData.book_cover || ''} />
        </figure>
        <div>
          <div>{clubData.book_title}</div>
          <div>{clubData.book_author}</div>
          <div>{clubData.book_page}</div>
          <div>{clubData.book_category}</div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
