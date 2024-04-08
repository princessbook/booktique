import MyNicknameForm from '@/components/nickname/MyNicknameForm';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const NicknameForm = async () => {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  // const { data: profilesData, error: profilesError } = await supabase
  //   .from('profiles')
  //   .select('*')
  //   .eq('id', userData?.user?.id || '');
  // if (profilesError || !profilesData || profilesData.length === 0) {
  //   console.log('????????????????');
  // } else {
  //   redirect('/myclub');
  //   return null;
  // }
  // if (data.user) {
  //   redirect('/myclub');
  //   return null;
  // }
  return (
    <>
      <MyNicknameForm />
    </>
  );
};

export default NicknameForm;
