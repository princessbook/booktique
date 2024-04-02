import { createClient } from '@/utils/supabase/server';
import { login, signup } from './action';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log(data);

  if (data.user) {
    redirect('/');
    return null;
  }
  return (
    <form>
      <label htmlFor='email'>Email:</label>
      <input id='email' name='email' type='email' required />
      <label htmlFor='password'>Password:</label>
      <input id='password' name='password' type='password' required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
