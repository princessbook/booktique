import { supabase } from '@/lib/supabase';

export const uploadAvatar = async (userId: string, file: File) => {
  try {
    const { data, error } = await supabase.storage
      .from('profileAvatars')
      .upload(`${userId}/${file.name}`, file, {
        upsert: true
      });

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    const photoUrl = data?.path;
    return photoUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};
