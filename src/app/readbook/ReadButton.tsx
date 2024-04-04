import React from 'react';
interface ReadButtonProps {
  clubId: string;
  onClick: () => void;
}
const ReadButton = ({ clubId, onClick }: ReadButtonProps) => {
  return (
    <button className='bg-bookyellow' onClick={onClick}>
      북클럽 책읽기
    </button>
  );
};

export default ReadButton;
