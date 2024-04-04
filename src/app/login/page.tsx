import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/login/LoginForm';

export default async function LoginPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  const session = await supabase.auth.getSession();

  console.log('session => ', session);
  console.log('data => ', data);

  // if (data.user) {
  //   redirect('/myclub');
  //   return null;
  // }
  return (
    <div className='bg-mainblue h-full'>
      <LoginForm />
    </div>
  );
}
