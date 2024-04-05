import { createClient } from '@/utils/supabase/server';
import { addOneMonth, extractDate } from '@/utils/time';
import Link from 'next/link';
import ClubMembersCount from './ClubMembersCount';
import Image from 'next/image';
import ClubAdminProfile from './ClubAdminProfile';

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
    <div>
      <h2 className='text-center'>전체 북클럽</h2>
      <section className='p-3'>
        {bookclubs.map((bookclub) => {
          return (
            <Link key={bookclub.id} href={`/bookclubs/${bookclub.id}`}>
              <div className='flex bg-gray-100 justify-between p-3'>
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
  );
};

export default BookClubsPage;
