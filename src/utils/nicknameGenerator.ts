import { createClient } from '@/utils/supabase/client';

export const generateUniqueNickname = async () => {
  const supabase = createClient();
  const baseNicknames = [
    '북티크',
    '북북딱지',
    '금독기은독기',
    '북극',
    '부끄럽',
    '북끄',
    '책이싫은사람',
    '개나리',
    '책책책'
  ];
  const randomIndex = Math.floor(Math.random() * baseNicknames.length);
  const baseNickname = baseNicknames[randomIndex];
  let randomSuffix = '';

  for (let i = 0; i < 6; i++) {
    randomSuffix += .floor(Math.random() * 10);
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
    for (let i = 0; i < 6; i++) {
      randomSuffix += Math.floor(Math.random() * 10);
    }
    randomNickname = baseNickname + randomSuffix;
  }
};
