'use client';
import React, { useEffect, useState } from 'react';
import { useInput } from '@/hooks/useInput';
import { createClient } from '@/utils/supabase/client';
import { PROFILES_TABLE } from '@/common/constants/tableNames';

const SelectForm = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [newNickname, setNewNickname] = useState<string>('');
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
          setNickname(data[0].display_name);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);
  const handleUpdateNickname = async () => {
    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ display_name: newNickname })
        .eq('id', user?.id || '');
      if (error) {
        throw error;
      }
      setNickname(newNickname);
      setNewNickname('');
      window.location.href = '/register/avatar';
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='px-[12px]'>
      <input
        className='py-[12px] border-b-black border-b-2 text-black w-full'
        type='text'
        placeholder='닉네임'
        value={newNickname !== '' ? newNickname : nickname ?? ''}
        onChange={(e) => setNewNickname(e.target.value)}
      />
      <button
        className='w-full bg-mainblue h-[48px] rounded-[999px]'
        onClick={handleUpdateNickname}>
        다음
      </button>
    </div>
  );
};
export default SelectForm;
