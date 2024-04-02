import React from 'react';

interface ButtonProps {
  selected?: boolean;
  text: string;
  customStyle?: string; // 사용자 정의 스타일 추가
}

const Button = ({ selected, text, customStyle }: ButtonProps) => {
  const defaultStyle = selected
    ? 'bg-blue-600 rounded-full'
    : 'bg-blue-400 rounded-full';

  return (
    <button
      className={`w-[302px] h-[56px] relative left-1/2 transform -translate-x-1/2 text-white ${defaultStyle} ${customStyle}`}>
      {text}
    </button>
  );
};

export default Button;
