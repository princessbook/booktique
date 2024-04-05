import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/login/LoginForm';

export default async function LoginPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect('/myclub');
    return null;
  }
  return (
    <div className=' h-full'>
      <LoginForm />
    </div>
  );
}
