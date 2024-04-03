import React, { useState } from 'react';
import closeInput from '../../public/icon_input.png';
import Image from 'next/image';

type InputProps = {
  label: string;
  inputRef: React.RefObject<HTMLInputElement>;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  label,
  inputRef,
  type,
  placeholder,
  value,
  onChange
}) => {
  const [isCleared, setIsCleared] = useState(false);
  const [rightMargin, setRightMargin] = useState<string>('right-10');

  const handleClear = () => {
    setIsCleared(true);
    onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };
  React.useEffect(() => {
    setRightMargin(type === 'password' ? 'right-10' : 'right-3');
  }, [type]);
  return (
    <div>
      <label className='opacity-60' htmlFor={label}>
        {label}
      </label>
      <div className='relative'>
        <input
          className='px-3 py-[12px] mb-3 text-white placeholder-white placeholder-opacity-60 rounded-[10px] w-full bg-subblue'
          ref={inputRef}
          id={label}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e);
            setIsCleared(false);
          }}
        />
        {value && !isCleared && (
          <Image
            className={`absolute top-1/2 transform -translate-y-[75%] ${rightMargin}`}
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
