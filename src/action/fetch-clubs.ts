'use server';

import { createClient } from '@/utils/supabase/server';

export async function fetchClubs(offset: number, page: number = 10) {
  const from = offset * page;
  const to = from + page - 1;
  try {
    const supabase = createClient();

    const { data: allData, error } = await supabase
      .from('clubs')
      .select('*,members(*,profiles(*))')
      .order('created_at', { ascending: false })
      .range(from, to);

    return allData;
  } catch (err) {
    console.error('Error fetching clubs:', err);
    return null;
  }
}
