'use client';
import { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import { BookInfo } from '@/lib/types/BookAPI';
import { IoClose } from 'react-icons/io5';

type SearchModalProps = {
  setBookInfo: React.Dispatch<React.SetStateAction<BookInfo | undefined>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
};
const SearchModal = ({
  setBookInfo,
  setIsModalOpen,
  isModalOpen
}: SearchModalProps) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  if (!isModalOpen) {
    return;
  }
  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <div className='absolute w-full h-full bg-gray-900 opacity-50'></div>
      <div className=' bg-white w-[360px] h-[600px] rounded-lg shadow-lg z-50 overflow-y-auto relative'>
        <IoClose
          onClick={() => {
            setIsModalOpen(false);
          }}
          className='absolute right-1'
        />
        <div className=' p-4'>
          <div>
            <SearchForm setSearchKeyword={setSearchKeyword} />
            <SearchResult
              setIsModalOpen={setIsModalOpen}
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
