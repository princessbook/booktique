import { Tables } from '@/lib/types/supabase';
import Image from 'next/image';
import React from 'react';
import close from '../../../../../public/close_read.png';

const SaveBookInfo = ({ clubData }: { clubData: Tables<'clubs'> }) => {
  return (
    <div className='flex flex-col'>
      <div className='h-[42px]'>헤더</div>
      <div className='flex flex-row bg-subblue border-b-[1px] w-full '>
        <img
          src='/close_read.png'
          className='w-[22px] h-[22px] m-[16px]'
          alt='close'></img>
        <div className='flex h-[54px] items-center ml-[94px] text-white'>
          책 읽기 종료
        </div>
      </div>
      <div className='flex justify-center gap-[19.92px] bg-subblue '>
        {/* <figure>
          <img src={clubData.book_cover || ''} />
        </figure> */}
        <div className='w-full'>
          <div className='h-[39px] mt-[16px] text-center'>타이머</div>
          <div className='text-center my-[16px] text-white'>
            {clubData.book_title}
          </div>
          {/* <div>{clubData.book_author}</div>
          <div>{clubData.book_page}</div>
          <div>{clubData.book_category}</div> */}
        </div>
      </div>
    </div>
  );
};

export default SaveBookInfo;
