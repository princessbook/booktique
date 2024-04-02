import SearchForm from '@/components/search/SearchForm';
import SearchResult from '@/components/search/SearchResult';

const page = ({ params }: { params: { keyword: string } }) => {
  const keyword = params.keyword;
  console.log(keyword);
  return (
    <div>
      <SearchForm />
      <SearchResult keyword={keyword} />
    </div>
  );
};

export default page;
