import React, { useState, useEffect } from 'react';
import closeInput from '../../public/close_input.png';
import Image from 'next/image';

type InputProps = {
  label?: string | null;
  inputRef: React.RefObject<HTMLInputElement>;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordError?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  inputRef,
  type,
  placeholder,
  value,
  onChange,
  passwordError
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [rightMargin, setRightMargin] = useState<string>('right-10');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
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
          className='bg-gray-200 px-3 py-[12px] mb-3 placeholder-opacity-60 rounded-[10px] w-full'
          ref={inputRef}
          id={label || ''}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {/* 입력란에 포커스가 있고, 입력된 값이 있으며 비밀번호 에러가 없을 때만 closeInput 이미지를 표시 */}
        {isFocused && value && !passwordError && (
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
