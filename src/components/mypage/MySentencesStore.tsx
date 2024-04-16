import React from 'react';
import { Tables } from '@/lib/types/supabase';

type Sentences = Tables<'sentences'>;
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

const MySentencesStore = async ({ userId }: { userId: string }) => {
  const supabase = createClient();
  const { data: userSentences, error } = await supabase
    .from('sentences')
    .select('*')
    .eq('user_id', userId);

  if (userSentences) {
    const clubIds = userSentences.map((sentence) => sentence.club_id);

    const { data: clubsData, error: clubsError } = await supabase
      .from('clubs')
      .select('book_title,name,id,book_author')
      .in('id', clubIds);
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
      <div className='mt-6'>
        <div className='flex flex-row mb-4'>
          <h2 className='font-bold text-[16px] flex items-center'>
            내가 작성한 문장
          </h2>
          <Link href={'/mypage/mysentences'} className='ml-auto'>
            <button className=' text-[14px] font-medium text-[#B3C1CC] p-2'>
              더보기
            </button>
          </Link>
        </div>
        <ul>
          {userSentences.map((sentence) => {
            const club = clubsData?.find(
              (club) => club.id === sentence.club_id
            );
            return (
              <li
                key={sentence.id}
                className=' bg-[#F6F7F9] rounded-md mb-3 p-2 flex flex-row items-center'>
                {sentence.sentence_content && (
                  <div className='w-[80%] flex flex-col'>
                    <p className='text-[14px] break-words line-clamp-4'>
                      {sentence.sentence_content}
                    </p>

                    {club && (
                      <div className='text-[11px]'>
                        <div className='flex flex-row'>
                          <p>
                            {/* {club.name} -  */}
                            {club.book_title}
                          </p>
                          <p className=' text-[#939393] ml-1'>
                            {sentence.sentence_page}p
                          </p>
                        </div>

                        <p>{club.book_author}</p>
                        <p className=' text-[#939393]'>
                          {formattedDate(sentence.created_at)}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                <div className='ml-auto'>
                  <Link href={`/mypage/sentencedetail/${sentence.id}`}>
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
  }
};
export default MySentencesStore;
