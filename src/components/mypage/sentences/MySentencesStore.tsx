import React from 'react';
import Link from 'next/link';
import useUserSentences from '@/hooks/mypage/useUserSentences';
const MySentencesStore = async ({ userId }: { userId: string }) => {
  const { userSentences, clubsData } = await useUserSentences(userId);

  const firstThreeSentences = userSentences.slice(0, 3);
  return (
    <div className='mt-6'>
      <div className='flex flex-row mb-4'>
        <h2 className='font-bold text-[16px] flex items-center'>
          내가 작성한 문장
        </h2>
        <Link href={'/mypage/mysentences'} className='ml-auto'>
          <button className=' text-[14px] font-medium text-[#B3C1CC] '>
            더보기
          </button>
        </Link>
      </div>
      <ul>
        {firstThreeSentences.map((sentence) => {
          const club = clubsData?.find((club) => club.id === sentence.club_id);
          return (
            <li
              key={sentence.id}
              className=' bg-[#F6F7F9] rounded-md mb-3 p-2 flex flex-row items-center'>
              {sentence.sentence_content && (
                <div className='w-[80%] flex flex-col'>
                  <p
                    className='text-[14px] text-[#3F3E4E]'
                    style={{ wordWrap: 'break-word' }}>
                    {sentence.sentence_content}
                  </p>

                  {club && (
                    <div className='text-[11px] mt-1'>
                      <div className='flex flex-col'>
                        <p className='text-[#8A9DB3] font-bold text-[12px]'>
                          {club.name}
                        </p>
                        <p className='text-[#3F3E4E] opacity-60 font-medium'>
                          {club.book_title}
                        </p>
                        <p className=' text-[#939393]'>
                          {sentence.sentence_page}p
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className='ml-auto'>
                <Link href={`/my-clubs/${club?.id}/sentences`}>
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
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MySentencesStore;
