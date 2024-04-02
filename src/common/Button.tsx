import React from 'react';

interface ButtonProps {
  text: string;
  large?: boolean;
  small?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

const Button = ({ large, small, selected, text, onClick }: ButtonProps) => {
  return (
    <button
      className={`${small && selected ? 'bg-blue-600 ' : 'bg-blue-400'} 
       ${
         large ? 'w-[343px] bg-bookyellow rounded-lg text-black' : 'text-white'
       } 
      w-[302px] h-[56px] relative left-1/2 transform -translate-x-1/2  rounded-full`}>
      {text}
    </button>
  );
};

export default Button;
