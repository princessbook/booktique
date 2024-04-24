//승희 임시

import { createClient } from './supabase/client';

const supabase = createClient();

export const getReadBookPageData = async ({
  queryKey
}: {
  queryKey: [string, string];
}) => {
  const [, clubId] = queryKey;
  const { data, error } = await supabase
    .from('clubs')
    .select('*, members(*, profiles(*), club_activities(*))')
    .eq('id', clubId)
    .single();
  if (error) throw error;
  return data;
};
