import { createClient } from '../supabase/client';

export const uploadAvatar = async (userId: string, file: File) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from('profileAvatars')
      .upload(`${userId}/avatar.png`, file, {
        upsert: true
      });
    console.log(data?.path);
    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    return `${
      process.env.NEXT_PUBLIC_SUPABASE_URL
    }/storage/v1/object/public/profileAvatars/${data.path}?${Math.random()}`;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};
