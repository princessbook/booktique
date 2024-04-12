import React, { useState, useEffect } from 'react';
import closeInput from '../../public/closeInput.svg';
import Image from 'next/image';

type InputProps = {
  name: string;
  label?: string | null;
  inputRef: React.RefObject<HTMLInputElement>;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  name,
  label,
  inputRef,
  type,
  placeholder,
  value,
  onChange
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [rightMargin, setRightMargin] = useState<string>('right-10');

  const handleFocus = () => {
    setIsFocused(true);
    console.log(isFocused);
  };

  const handleBlur = () => {
    setIsFocused(false);
    console.log(isFocused);
  };

  const handleClear = () => {
    onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  useEffect(() => {
    setRightMargin(type === 'password' ? 'right-10' : 'right-3');
  }, [type]);

  return (
    <div>
      {label && (
        <label className='text-[12px]' htmlFor={label}>
          {label}
        </label>
      )}
      <div className='relative mt-2'>
        <input
          className='bg-gray-200 p-2 outline-none border-2 focus:border-mainblue px-3 py-[12px] mb-3 placeholder-opacity-60 rounded-[10px] w-full'
          ref={inputRef}
          id={label || ''}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {value && (
          <Image
            className={`absolute top-1/2 transform -translate-y-[75%] ${rightMargin} cursor-pointer`}
            onClick={handleClear}
            src={closeInput}
            alt='closeInput'
          />
        )}
      </div>
    </div>
  );
};

export default Input;
