import { MEMBERS_TABLE } from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/server';
import { addOneMonth, extractDate } from '@/utils/time';
import Link from 'next/link';
import GetClubMembersNumber from './GetClubMembersNumber';

const BookClubsPage = async () => {
  const supabase = createClient();
  const { data: bookclubs, error } = await supabase.from('clubs').select('*');
  if (error) {
    throw error;
  }

  return (
    <div>
      <h2 className='text-center'>전체 북클럽</h2>
      <section className='p-3'>
        {bookclubs.map((bookclub) => {
          return (
            <Link key={bookclub.id} href={`/bookclubs/detail/${bookclub.id}`}>
              <div className='flex bg-gray-100 justify-between p-3'>
                <div className=' flex-1'>
                  <h1 className='mb-1 text-lg'>{bookclub.name}</h1>
                  <h2 className='mb-1 text-lg'>책제목</h2>
                  <p className='mb-1 text-xs'>
                    독서기간:
                    {extractDate(bookclub.created_at)}-
                    {extractDate(addOneMonth(bookclub.created_at))}
                  </p>
                  <p className='text-xs'>장르</p>
                  <div className='flex justify-between'>
                    <div className='flex justify-between items-center mr-2'>
                      <span className='bg-gray-300 block w-5 h-5 rounded-full'></span>
                      <span>방장닉네임</span>
                    </div>
                    <div className='mr-3'>
                      <div>
                        <GetClubMembersNumber clubId={bookclub.id} />/
                        {bookclub.max_member_count}
                      </div>
                    </div>
                  </div>
                </div>
                <figure className='w-24 bg-gray-800'>
                  <div>책 사진 들어갈 자리</div>
                </figure>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default BookClubsPage;
