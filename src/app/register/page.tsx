import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import RegisterForm from '@/components/register/RegisterForm';

const RegisterPage = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (data.user) {
    redirect('/');
    return null;
  }
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
