import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
interface ReadButtonProps {
  clubId: string;
  onClick: () => void;
}
const ReadButton = ({ clubId, onClick }: ReadButtonProps) => {
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
      북클럽 책읽기
    </button>
  );
};

export default ReadButton;
