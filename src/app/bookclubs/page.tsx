import { createClient } from '@/utils/supabase/server';
import { addOneMonth, extractDate } from '@/utils/time';
import Link from 'next/link';
import ClubMembersCount from './ClubMembersCount';
import Image from 'next/image';
import ClubAdminProfile from './ClubAdminProfile';
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
      <h2 className='text-left h-[58px] text-xl px-3 flex items-center border-b border-opacity-30 border-b-white  text-white font-bold'>
        북클럽 찾기
      </h2>
      <ClubSearch />
      <div className='bg-white '>
        <section className='p-3'>
          {bookclubs.map((bookclub) => {
            return (
              <Link key={bookclub.id} href={`/bookclubs/${bookclub.id}`}>
                <div className='flex border-b-2 justify-between p-3'>
                  <figure className='w-24 bg-gray-800 mr-2'>
                    {bookclub.book_cover && (
                      <Image
                        width={200}
                        height={100}
                        src={bookclub.book_cover}
                        alt='북클럽이미지'
                      />
                    )}
                  </figure>
                  <div className='flex-1'>
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
                </div>
              </Link>
            );
          })}
          {/* 개설하기 버튼 */}
          <div className=''>
            <Link
              href='/bookclubs/create'
              className={`py-[15px] px-[20px] absolute bottom-24 right-4 text-white rounded-full shadow-lg hover:shadow-xl transition duration-300 font-bold cursor-pointer bg-[#3F3E4E]
              `}>
              북클럽 개설하기
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookClubsPage;
