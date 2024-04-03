import React, { useEffect, useState } from 'react';
import { useInput } from '@/hooks/useInput';
import { createClient } from '@/utils/supabase/client';

const SelectForm = () => {
  const [nickname, setNickname] = useState<string>('');
  const [, , clearNickname] = useInput();
  const supabase = createClient();

  const handleNickname = async () => {
    const { data, error } = await supabase.from('profiles').select('*');
  };

  return (
    <div className='px-[12px]'>
      <input
        className='py-[12px] border-b-black border-b-2 text-black w-full'
        type='text'
        placeholder='닉네임'
        value={nickname}
        onChange={() => {}}
      />
      <button className='w-full bg-mainblue h-[48px] rounded-[999px]'>
        다음
      </button>
    </div>
  );
};
export default SelectForm;
