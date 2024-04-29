import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/login/LoginForm';

export default async function LoginPage() {
  const supabase = createClient();

  const { data: users } = await supabase.from('profiles').select('*');

  return (
    <div className=' h-full'>
      <LoginForm users={users || []} />
    </div>
  );
}
