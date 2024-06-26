// components/SentenceItem.tsx
import React from 'react';
import Link from 'next/link';

type SentenceItemProps = {
  club_id: string;
  created_at: string;
  id: string;
  sentence_content: string | null;
  sentence_page: number | null;
  user_id: string | null;
  clubs: {
    book_title: string | null;
    name: string | null;
    id: string;
    book_author: string | null;
  } | null;
};

const SentenceItem = ({ sentence }: { sentence: SentenceItemProps }) => {
  return (
    <Link href={`/my-clubs/${sentence.club_id}/sentences`}>
      <li className='bg-[#F6F7F9] rounded-[10px] mb-3 py-2 px-4 flex flex-row items-center'>
        {sentence.sentence_content && (
          <div className='w-[90%] flex flex-col'>
            <p
              className='text-[14px] text-fontMain'
              style={{ wordWrap: 'break-word' }}>
              {sentence.sentence_content}
            </p>
            <div className='text-[11px] mt-1'>
              <div className='flex flex-col'>
                <p className='text-[#8A9DB3] font-bold text-[12px]'>
                  {sentence.clubs?.name}
                </p>
                <p className='text-fontMain opacity-60 font-medium'>
                  {sentence.clubs?.book_title}
                </p>
                <p className='text-[#939393]'>{sentence.sentence_page}p</p>
              </div>
            </div>
          </div>
        )}
        <div className='ml-auto'>
          <svg
            width='22'
            height='22'
            viewBox='0 0 22 22'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M7.56294 4.03125L14.4379 10.9062L7.375 17.9688'
              stroke='#B3C1CC'
              strokeWidth='1.6'
              strokeLinecap='round'
            />
          </svg>
        </div>
      </li>
    </Link>
  );
};

export default SentenceItem;
