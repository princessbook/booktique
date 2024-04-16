import React from 'react';
interface ReadButtonProps {
  clubId: string;
  onClick: () => void;
}
const ReadButton = ({ clubId, onClick }: ReadButtonProps) => {
  return (
    <button
      className='bg-mainblue w-[302px] h-[56px] rounded-full text-bookyellow'
      onClick={onClick}>
      북클럽 책읽기
    </button>
  );
};

export default ReadButton;
