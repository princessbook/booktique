'use client';

import { SetStateAction, useState } from 'react';
import SearchInput from '../../SearchInput';

const SearchForm = ({
  setSearchKeyword,
  searchKeyword,
  performSearch
}: {
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  searchKeyword: string;
  performSearch: (keyword: string) => void;
}) => {
  const handleSearchInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchKeyword(e.target.value);
  };
  const [isEnter, setIsEnter] = useState(false);

  const handleSearchEnter = () => {
    setIsEnter(true);
    performSearch(searchKeyword);
  };
  const handleSearchClose = () => {
    performSearch('');
    setSearchKeyword('');
  };

  return (
    <div className='flex justify-center'>
      <SearchInput
        handleSearchClose={handleSearchClose}
        handleSearchEnter={handleSearchEnter}
        searchText={searchKeyword}
        handleSearchText={handleSearchInputChange}
        placeholder='책 제목이나 저자 이름을 검색해 주세요.'
      />
      {/* <input
        className='border-2'
        placeholder='책 제목 또는 저자.'
        type='text'
        value={searchKeyword}
        onChange={handleSearchInputChange}
      /> */}
    </div>
  );
};

export default SearchForm;
