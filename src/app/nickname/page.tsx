import MyNicknameForm from '@/components/nickname/MyNicknameForm';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const NicknameForm = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (data.user) {
    redirect('/myclub');
    return null;
  }
  return (
    <>
      <MyNicknameForm />
    </>
  );
};

export default NicknameForm;
