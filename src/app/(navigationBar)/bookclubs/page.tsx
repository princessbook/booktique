import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import ClubSearch from './ClubSearch';
import NoContentMessage from '@/components/common/NoContentMessage';
import LoadingAnimation from '@/components/common/LoadingAnimation';
import { fetchClubs } from '@/action/fetch-clubs';
import { LoadMore } from './LoadMore';
import ClubsCard from '../../../components/common/ClubsCard';
const supabase = createClient();
const BookClubsPage = async (props: any) => {
  let bookclubs;
  if (props.searchParams.category) {
    if (props.searchParams.category === '기타') {
      bookclubs = null;
      const { data, error } = await supabase
        .from('clubs')
        .select('*,members(*,profiles(*))')

        .order('created_at', { ascending: false })
        .not(
          'book_category',
          'in',
          '("건강/취미","경제경영","과학","에세이","사회과학","소설/시/희곡","여행","역사","예술/대중문화","인문학","자기계발","종교/역학","외국도서")'
        )
        .order('created_at', { ascending: false })
        .eq('archive', false);
      bookclubs = data;
    } else {
      bookclubs = null;
      const { data: categoryData, error } = await supabase
        .from('clubs')
        .select('*,members(*,profiles(*))')

        .eq('book_category', props.searchParams.category)
        .order('created_at', { ascending: false })
        .eq('archive', false);

      if (error) {
        console.error('Error fetching clubs by category:', error.message);
        return null;
      }

      bookclubs = categoryData;
    }
  } else if (props.searchParams.search) {
    bookclubs = null;
    if (props.searchParams.tab === '책제목') {
      // console.log('searchParams', props.searchParams);
      const { data: searchData, error } = await supabase
        .from('clubs')
        .select('*,members(*,profiles(*))')

        .or(`book_title.ilike.%${props.searchParams.search}%`)
        .order('created_at', { ascending: false })
        .eq('archive', false);

      if (error) {
        console.error('Error fetching clubs by search term:', error.message);
        return null;
      }

      bookclubs = searchData;
    } else if (props.searchParams.tab === '클럽이름') {
      bookclubs = null;
      // console.log('searchParams', props.searchParams);
      const { data: searchData, error } = await supabase
        .from('clubs')
        .select('*,members(*,profiles(*))')

        .or(`name.ilike.%${props.searchParams.search}%`)
        .order('created_at', { ascending: false })
        .eq('archive', false);

      if (error) {
        console.error('Error fetching clubs by search term:', error.message);
        return null;
      }

      bookclubs = searchData;
    } else if (props.searchParams.tab === '작가') {
      bookclubs = null;
      console.log('작가르르르');
      const { data: searchData, error } = await supabase
        .from('clubs')
        .select('*,members(*,profiles(*))')

        .or(`book_author.ilike.%${props.searchParams.search}%`)

        .order('created_at', { ascending: false })
        .eq('archive', false);

      if (error) {
        console.error('Error fetching clubs by search term:', error.message);
        return null;
      }
      bookclubs = searchData;
    }
  } else {
    bookclubs = await fetchClubs(0);
  }

  if (!bookclubs) {
    return (
      <div>
        <LoadingAnimation />
      </div>
    );
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
          <ClubsCard clubs={bookclubs!} />
          {!props.searchParams.search && !props.searchParams.category && (
            <LoadMore />
          )}
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
