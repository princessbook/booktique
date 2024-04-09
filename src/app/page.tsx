'use client';
import Button from '@/common/Button';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { useEffect } from 'react';

export default function Home() {
  // useEffect(() => {
  //   const supabase = createClient();

  //   const fetchData = async () => {
  //     try {
  //       const { data, error } = await supabase.auth.getUser();
  //       if (error) {
  //         throw error;
  //       }
  //       console.log('Logged in user:', data);
  //     } catch (error) {
  //       console.error('Error fetching user:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className='flex flex-col'>
      <Button selected={false} text='Small Button' small></Button>
      <Button text='Large Button' large></Button>
    </div>
  );
}
