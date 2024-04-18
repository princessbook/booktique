import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import RegisterForm from '@/components/register/RegisterForm';

const RegisterPage = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (data.user) {
    redirect('/my-clubs');
    return null;
  }
  if (!data) {
    return null; // 혹은 다른 처리 로직 추가
  }
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
