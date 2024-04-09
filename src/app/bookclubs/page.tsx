import { createClient } from '@/utils/supabase/server';
import { addOneMonth, extractDate } from '@/utils/time';
import Link from 'next/link';
import ClubMembersCount from './ClubMembersCount';
import Image from 'next/image';
import ClubAdminProfile from './ClubAdminProfile';
import { bookCategories } from '@/common/constants/bookCategories';
import ClubSearch from './ClubSearch';

export const revalidate = 0;
const BookClubsPage = async () => {
  const supabase = createClient();
  const { data: bookclubs, error } = await supabase
    .from('clubs')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    throw error;
  }
  if (!bookclubs) {
    return <div>loading...</div>;
  }

  return (
    <div className='bg-primary500 '>
      <h2 className='text-center h-[58px]  text-white'>북클럽 찾기</h2>
      <ClubSearch />
      <div className='bg-white'>
        <h1 className=' text-lg font-bold px-3 mb-2'>
          책 분야로 개설된 북클럽
        </h1>
        <div className='flex overflow-x-auto px-2 border-b-2'>
          {bookCategories.map((bookCategory, idx) => {
            return (
              <span
                className='bg-grayBgLight rounded-full mr-2 p-2 mb-2 whitespace-nowrap'
                key={idx}>
                {bookCategory}
              </span>
            );
          })}
        </div>
        <section className='p-3'>
          {bookclubs.map((bookclub) => {
            return (
              <Link key={bookclub.id} href={`/bookclubs/${bookclub.id}`}>
                <div className='flex border-b-2 justify-between p-3'>
                  <div className=' flex-1'>
                    <h1 className='mb-1 text-lg'>{bookclub.name}</h1>
                    <h2 className='mb-1 text-lg'>{bookclub.book_title}</h2>
                    <p className='mb-1 text-xs'>
                      독서기간:
                      {extractDate(bookclub.created_at)}-
                      {extractDate(addOneMonth(bookclub.created_at))}
                    </p>
                    <p className='text-xs'>{bookclub.book_category}</p>
                    <div className='flex justify-between'>
                      <ClubAdminProfile clubId={bookclub.id} />
                      <div className='mr-3'>
                        <div>
                          <ClubMembersCount clubId={bookclub.id} />/
                          {bookclub.max_member_count}
                        </div>
                      </div>
                    </div>
                  </div>
                  <figure className='w-24 bg-gray-800'>
                    {bookclub.book_cover && (
                      <Image
                        width={200}
                        height={100}
                        src={bookclub.book_cover}
                        alt='북클럽이미지'
                      />
                    )}
                  </figure>
                </div>
              </Link>
            );
          })}
          {/* 개설하기 버튼 */}
          <div className='fixed bottom-28 right-10'>
            <Link
              href='/bookclubs/create'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full'>
              북클럽 개설하기
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookClubsPage;
