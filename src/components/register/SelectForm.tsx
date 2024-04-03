'use client';
import React, { useEffect, useState } from 'react';
import { useInput } from '@/hooks/useInput';
import { createClient } from '@/utils/supabase/client';
import { PROFILES_TABLE } from '@/common/constants/tableNames';

const SelectForm = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [, , clearNickname] = useInput();

  useEffect(() => {
    const fetchUserData = async () => {
      const supabase = createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user?.id || '');
        if (error) {
          throw error;
        }
        if (data && data.length > 0) {
          setNickname(data[0].display_name); // Setting nickname from user profile data
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className='px-[12px]'>
      <input
        className='py-[12px] border-b-black border-b-2 text-black w-full'
        type='text'
        placeholder='닉네임'
        value={nickname ?? ''}
        onChange={() => {}}
      />
      <button className='w-full bg-mainblue h-[48px] rounded-[999px]'>
        다음
      </button>
    </div>
  );
};
export default SelectForm;
