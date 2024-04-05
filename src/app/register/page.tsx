import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import RegisterForm from '@/components/register/RegisterForm';

const RegisterPage = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log(data.user?.id);
  // if (data.user) {
  //   redirect('/myclub');
  //   return null;
  // }
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
