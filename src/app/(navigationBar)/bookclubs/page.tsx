import { createClient } from '@/utils/supabase/server';
import { addOneMonth, extractDate } from '@/utils/time';
import Link from 'next/link';
import ClubMembersCount from './ClubMembersCount';
import Image from 'next/image';
import ClubAdminProfile from './ClubAdminProfile';
import ClubSearch from './ClubSearch';
import NoContentMessage from '@/components/common/NoContentMessage';

const BookClubsPage = async (props: any) => {
  const supabase = createClient();
  let bookclubs;

  if (props.searchParams.category) {
    if (props.searchParams.category === '기타') {
      const { data, error } = await supabase
        .from('clubs')
        .select('*')
        .not(
          'book_category',
          'in',
          '("건강/취미","경제경영","과학","에세이","사회과학","소설/시/희곡","여행","역사","예술/대중문화","인문학","자기계발","종교/역학","외국도서")'
        )
        .order('created_at', { ascending: false });
      bookclubs = data;
    } else {
      const { data: categoryData, error } = await supabase
        .from('clubs')
        .select('*')
        .eq('book_category', props.searchParams.category)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching clubs by category:', error.message);
        return null;
      }

      bookclubs = categoryData;
    }
  } else if (props.searchParams.search) {
    if (props.searchParams.tab === '책제목') {
      // console.log('searchParams', props.searchParams);
      const { data: searchData, error } = await supabase
        .from('clubs')
        .select('*')
        .or(`book_title.ilike.%${props.searchParams.search}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching clubs by search term:', error.message);
        return null;
      }

      bookclubs = searchData;
    } else if (props.searchParams.tab === '클럽이름') {
      // console.log('searchParams', props.searchParams);
      const { data: searchData, error } = await supabase
        .from('clubs')
        .select('*')
        .or(`name.ilike.%${props.searchParams.search}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching clubs by search term:', error.message);
        return null;
      }

      bookclubs = searchData;
    } else if (props.searchParams.tab === '작가') {
      console.log('작가르르르');
      const { data: searchData, error } = await supabase
        .from('clubs')
        .select('*')
        .or(`book_author.ilike.%${props.searchParams.search}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching clubs by search term:', error.message);
        return null;
      }
      bookclubs = searchData;
    }
  } else {
    const { data: allData, error } = await supabase
      .from('clubs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching clubs:', error.message);
      return null;
    }

    bookclubs = allData;
  }

  if (!bookclubs) {
    return <div>loading...</div>;
  }

  return (
    <div className='bg-primary500'>
      <h2 className='text-left h-[58px] text-[22px] px-3 flex items-center border-b border-opacity-30 border-b-white  text-white font-bold'>
        북클럽 찾기
      </h2>
      <ClubSearch />
      <div className='bg-white mb-[78px] overflow-y-auto'>
        <section className='p-3'>
          {bookclubs.length === 0 && (
            <NoContentMessage imgUrl='/no_search.png' width={125}>
              검색 결과가 없습니다
            </NoContentMessage>
          )}
          {bookclubs.map((bookclub, index) => {
            const isLastItem = index === bookclubs.length - 1;
            return (
              <Link key={bookclub.id} href={`/bookclubs/${bookclub.id}`}>
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
                      <ClubAdminProfile clubId={bookclub.id} />
                      <div className='mr-3 text-[14px]'>
                        <div>
                          <ClubMembersCount clubId={bookclub.id} />/
                          {bookclub.max_member_count}
                        </div>
                      </div>
                    </div>
                    <p className='mb-1 text-[12px] text-fontGray'>
                      활동기간 : {extractDate(bookclub.created_at)}-
                      {extractDate(addOneMonth(bookclub.created_at))}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
          <div className='flex justify-end'>
            <Link
              href='/bookclubs/create'
              className={`py-[15px] px-[20px] fixed bottom-24  text-white rounded-full shadow-lg hover:shadow-xl transition duration-300 font-bold cursor-pointer bg-[#3F3E4E]
              `}>
              북클럽 만들기
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookClubsPage;
