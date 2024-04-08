import { createClient } from '../supabase/client';

//post 단일의 article을 가져오는 함수
export const fetchPostDetail = async ({
  queryKey
}: {
  queryKey: [string, string];
}) => {
  const [, postId] = queryKey;
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*, profile:profiles (*)')
    .eq('id', postId)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

//post 전체 데이터를 불러오는 함수
export const fetchPosts = async ({
  queryKey
}: {
  queryKey: [string, string];
}) => {
  const [, clubId] = queryKey;
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*, profile:profiles (*), clubs (*)')
    .eq('club_id', clubId);

  if (error) throw new Error(error.message);
  return data;
};
