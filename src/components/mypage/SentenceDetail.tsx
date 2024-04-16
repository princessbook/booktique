import React from 'react';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
const SentenceDetail = async ({ sentenceId }: { sentenceId: string }) => {
  const supabase = createClient();
  const { data: sentenceData } = await supabase
    .from('sentences')
    .select('*')
    .eq('id', sentenceId);
  if (!sentenceData || sentenceData.length === 0) {
    return null;
  }
  const clubId = sentenceData[0].club_id;
  const { data: clubData } = await supabase
    .from('clubs')
    .select('book_title,name,id,book_author,book_cover')
    .eq('id', clubId);
  if (!clubData || clubData.length === 0) {
    return null;
  }
  const formattedDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  return (
    <div>
      <div className='w-full flex-row sticky top-0 left-0 right-0 z-10 flex items-center mb-6 border-b-2 h-[58px] p-4 bg-white'>
        <Link href='/mypage'>
          <svg
            width='23'
            height='24'
            viewBox='0 0 23 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M14.4546 18.9439L7.56158 12.087L14.6059 5.00591'
              stroke='#292929'
              strokeWidth='1.6'
              strokeLinecap='round'
            />
          </svg>
        </Link>
        <p className='items-center flex-grow text-center font-bold text-[17px] mr-4'>
          {clubData[0].name}
        </p>
      </div>
      <div className='p-4 text-[16px]'>
        <p className='text-[20px] font-bold'>{clubData[0].book_title}</p>
        <div className='flex flex-row'>
          <p>{clubData[0].book_author}</p>
          <p className='ml-auto mr-2'>{sentenceData[0].sentence_page} page.</p>
        </div>
        <div className='flex flex-end mt-2'>
          <p className='ml-auto text-[#939393]'>
            {formattedDate(sentenceData[0].created_at)}
          </p>
        </div>
        <div className='flex justify-center'>
          <Image
            src={clubData[0].book_cover || '/booktiquereadblue.png'}
            alt='책 사진'
            width={100}
            height={100}
            priority={true}
            className='w-[156px] h-[244px] mt-4 mb-4'
          />
        </div>

        <p className='tracking-wide'>{sentenceData[0].sentence_content}</p>
      </div>
    </div>
  );
};

export default SentenceDetail;
