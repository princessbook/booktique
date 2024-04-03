'use client';

import { SetStateAction } from 'react';

const SearchForm = ({
  setSearchKeyword
}: {
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleSearchInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div className='flex justify-center'>
      <input
        className='border-2'
        placeholder='책 제목 또는 저자.'
        type='text'
        onChange={handleSearchInputChange}
      />
    </div>
  );
};

export default SearchForm;
