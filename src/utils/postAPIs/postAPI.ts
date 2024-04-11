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

// 글 수정용 데이터 로딩
export const fetchSinglePost = async (postId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*, profile:profiles (*)')
    .eq('id', postId)
    .single();
  if (error) throw new Error(error.message);
  return data;
};
type NewPost = {
  title: string;
  content: string;
  id: string;
  club_id: string;
  user_id: string;
};
// 새 글 등록 로직
export const createPost = async (newPost: NewPost) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('posts').insert([
    {
      title: newPost.title,
      content: newPost.content,
      club_id: newPost.club_id,
      id: newPost.id,
      user_id: newPost.user_id
    }
  ]);
  if (error) throw error;
  return data;
};

type UpdatePost = {
  id: string;
  title: string;
  content: string;
};

// 글 업데이트 로직
export const updatePost = async (newPost: UpdatePost) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('posts')
    .update({
      title: newPost.title,
      content: newPost.content
    })
    .match({ id: newPost.id });

  if (error) throw error;

  return data;
};

//글 삭제로직
export const deletePost = async (postId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('posts')
    .delete()
    .match({ id: postId });

  if (error) throw error;
  return data;
};
