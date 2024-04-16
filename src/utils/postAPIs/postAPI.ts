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
  thumbnail: File | null;
};

// 새 글 등록 로직
export const createPost = async (newPost: NewPost) => {
  const supabase = createClient();
  if (newPost.thumbnail) {
    const res = await uploadImageToPost(newPost.thumbnail, newPost.id);
    const { data, error } = await supabase.from('posts').insert([
      {
        title: newPost.title,
        content: newPost.content,
        club_id: newPost.club_id,
        id: newPost.id,
        user_id: newPost.user_id,
        thumbnail: res
      }
    ]);
    if (error) throw error;
    return data;
  }
  const { data, error } = await supabase.from('posts').insert([
    {
      title: newPost.title,
      content: newPost.content,
      club_id: newPost.club_id,
      id: newPost.id,
      user_id: newPost.user_id,
      thumbnail: null
    }
  ]);
  if (error) throw error;
  return data;
};

type UpdatePost = {
  id: string;
  title: string;
  content: string;
  thumbnail: File | null;
};

//사진 저장 로직
export const uploadImageToPost = async (file: File, postId: string) => {
  const supabase = createClient();
  const filePath = `posts/${postId}`;

  const { error, data } = await supabase.storage
    .from('images')
    .upload(filePath, file, {
      upsert: true // 파일이 이미 존재하면 덮어쓰기
    });

  if (error) {
    throw new Error('Failed to upload image: ' + error.message);
  }
  if (data) {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/posts/${postId}`;
    return url;
  }
  return;
};

// 글 업데이트 로직
export const updatePost = async (newPost: UpdatePost) => {
  const supabase = createClient();
  if (newPost.thumbnail) {
    const res = await uploadImageToPost(newPost.thumbnail, newPost.id);
    const { data, error } = await supabase
      .from('posts')
      .update({
        title: newPost.title,
        content: newPost.content,
        thumbnail: res
      })
      .match({ id: newPost.id });
    if (error) throw error;
    return data;
  }
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
