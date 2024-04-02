import { supabase } from '@/lib/supabase';

export const uploadAvatar = async (userId: string, file: File) => {
  try {
    const { data, error } = await supabase.storage
      .from('profileAvatars')
      .upload(`${userId}/avatar.png`, file, {
        upsert: true
      });

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    // const photoUrl = data?.path;
    // console.log(photoUrl);
    // return photoUrl;
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profileAvatars/${userId}/avatar.png`;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};
