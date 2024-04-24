'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    console.log(error);
  }
  // console.log('로그인');
  revalidatePath('/', 'layout');
  // redirect('/myclub');
}

export async function signup(formData: FormData) {
  const supabase = createClient();
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
function showAlert(message: any) {
  alert(message);
}
