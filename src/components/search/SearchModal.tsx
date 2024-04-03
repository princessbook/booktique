'use client';
import { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import { BookInfo } from '@/lib/types/BookAPI';
import { IoClose } from 'react-icons/io5';

const SearchModal = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  //이 state를 외부에서 사용하실 때 가져가서 써주세요
  const [bookInfo, setBookInfo] = useState<BookInfo>({
    isbn13: '초기값',
    cover: '초기값',
    title: '초기값',
    itemPage: 0,
    categoryName: '초기값',
    author: '초기값'
  });

  //테스트용 콘솔. 책을 검색 후 선택을 클릭해보세요
  useEffect(() => {
    console.table(bookInfo);
  }, [bookInfo]);

  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <div className='absolute w-full h-full bg-gray-900 opacity-50'></div>
      <div className=' bg-white w-[360px] h-[600px] rounded-lg shadow-lg z-50 overflow-y-auto relative'>
        <IoClose className='absolute right-1' />
        <div className=' p-4'>
          <div>
            <SearchForm setSearchKeyword={setSearchKeyword} />
            <SearchResult
              searchKeyword={searchKeyword}
              setBookInfo={setBookInfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
