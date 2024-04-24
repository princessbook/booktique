import { createClient } from '../supabase/client';
import { Tables } from '@/lib/types/supabase';
type Profile = Tables<'profiles'>;
type Clubs = Tables<'clubs'>;
export const getUserProfile = async (): Promise<Profile[] | null> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('profiles').select('*');

    if (error) {
      return null;
    }
    return data;
  } catch (error) {
    console.error('유저정보불러오기 실패', error);
    return null;
  }
};
export const updateUserProfile = async (formData: FormData) => {
  const displayName = formData.get('display_name') as string;
  const introduction = formData.get('introduction') as string;
  const photoUrl = formData.get('photo_URL') as string;
  const id = formData.get('id') as string;

  // Supabase를 사용하여 프로필 정보를 업데이트합니다.
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .update({
      display_name: displayName,
      introduction: introduction,
      photo_URL: photoUrl
    })
    .match({ id: id });

  if (error) {
    throw error;
  }

  return data;
};
// export const getBookClubs = async (): Promise<Clubs[] | null> => {
//   const supabase = createClient();
//   const { data, error } = await supabase.from('clubs').select('*');
//   if (error) {
//     throw new Error('데이터를 불러오는 도중 오류가 발생했습니다.');
//   }
//   if (data && data.length > 0) {
//     return data;
//   }
//   return null;
// };
