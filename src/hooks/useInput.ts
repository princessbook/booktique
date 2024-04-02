import { ChangeEvent, useState } from 'react';

export const useInput = (): [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  () => void
] => {
  const [value, setValue] = useState('');
  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const valueClear = () => {
    setValue('');
  };
  return [value, handler, valueClear];
};
