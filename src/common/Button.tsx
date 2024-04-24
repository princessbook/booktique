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
      onClick={onClick}
      className={`${small && selected ? 'bg-primary500 ' : 'bg-primary500'} 
       ${
         large
           ? 'w-[343px] bg-bookyellow rounded-lg text-black'
           : 'text-lime font-bold'
       } 
      w-[302px] h-[56px] relative left-1/2 transform -translate-x-1/2  rounded-full mt-6`}>
      {text}
    </button>
  );
};

export default Button;
