import React, { useEffect, useState } from 'react';

interface ReadButtonProps {
  onClick: () => void;
}
const ReadButton = ({ onClick }: ReadButtonProps) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
      onClick();
    }
  };

  return (
    <button
      className='bg-mainblue w-[302px] h-[56px] rounded-full text-bookyellow'
      onClick={handleClick}
      disabled={clicked}>
      {clicked ? '로딩 중...' : '북클럽 책읽기'}
    </button>
  );
};

export default ReadButton;
