import React, { useState } from 'react';

interface ReadButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const ReadButton = ({ onClick, disabled }: ReadButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    onClick();
  };

  return (
    <button
      className='bg-mainblue w-[302px] h-[56px] rounded-full text-bookyellow'
      onClick={handleClick}
      disabled={disabled || loading}>
      {loading ? '로딩 중...' : '북클럽 책읽기'}
    </button>
  );
};

export default ReadButton;
