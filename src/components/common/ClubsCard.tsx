import { Tables } from '@/lib/types/supabase';
import Image from 'next/image';
// import Link from 'next/link';
import React from 'react';
import ClubAdminProfile from '../../app/(navigationBar)/bookclubs/ClubAdminProfile';
import { addOneMonth, extractDate } from '@/utils/time';

const ClubsCard = (clubs: { clubs: any }) => {
  return (
    <>
      {clubs &&
        clubs.clubs.map((bookclub: any, index: any) => {
          const isLastItem = index === clubs.clubs.length - 1;
          return (
            <a key={bookclub.id} href={`/bookclubs/${bookclub.id}`}>
              <div
                className={`flex ${
                  isLastItem ? '' : 'border-b'
                } justify-between py-3 items-center border-b-[#E9EEF3] `}>
                <figure className='w-[78px] mr-2 flex items-center justify-center'>
                  <div className='w-[78px] h-full relative'>
                    {bookclub.book_cover && (
                      <Image
                        width='0'
                        height='0'
                        sizes='100vw'
                        className='w-auto h-auto'
                        src={bookclub.book_cover}
                        alt='북클럽이미지'
                      />
                    )}
                  </div>
                </figure>
                <div className='flex-1'>
                  <h1 className='mb-1 text-[14px] text-[#3F3E4E] font-bold break-words overflow-hidden line-clamp-2'>
                    {bookclub.name}
                  </h1>
                  <h2 className='mb-1 text-[14px] text-[#3F3E4E] w-64 break-words overflow-hidden line-clamp-2'>
                    {bookclub.book_title}
                  </h2>
                  <div className='flex justify-between text-[14px] mb-2'>
                    <ClubAdminProfile clubs={bookclub.members} />
                    <div className='mr-3 text-[14px]'>
                      <div>
                        <span className='text-[#3F3E4E]'>
                          {bookclub.members && bookclub.members.length}
                        </span>
                        /{bookclub.max_member_count}
                      </div>
                    </div>
                  </div>
                  <p className='mb-1 text-[12px] text-fontGray'>
                    활동기간 : {extractDate(bookclub.created_at)}-
                    {extractDate(addOneMonth(bookclub.created_at))}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
    </>
  );
};

export default ClubsCard;
