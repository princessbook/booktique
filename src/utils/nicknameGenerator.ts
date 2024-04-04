import { createClient } from '@/utils/supabase/client';

export const generateUniqueNickname = async () => {
  const supabase = createClient();
  const baseNickname = '북티크';
  let randomSuffix = '';

  for (let i = 0; i < 7; i++) {
    randomSuffix += Math.floor(Math.random() * 10);
  }
  let randomNickname = baseNickname + randomSuffix;
  while (true) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('display_name', randomNickname);
    if (error) {
      console.error(error);
      return '';
    }
    if (!data || data.length === 0) {
      return randomNickname;
    }
    randomSuffix = '';
    for (let i = 0; i < 7; i++) {
      randomSuffix += Math.floor(Math.random() * 10);
    }
    randomNickname = baseNickname + randomSuffix;
  }
};
