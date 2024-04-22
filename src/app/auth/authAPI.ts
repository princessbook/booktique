import { createClient } from '@/utils/supabase/client';

export const getOrCreateUserProfile = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  if (user !== null) {
    const userId = user.id;
    const userEmail = user.email;

    // 프로필 조회
    const { data: profilesData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId);

    if (!profilesData || profilesData.length > 0) {
      return profilesData;
    }

    // 프로필이 존재하지 않는 경우, 새로운 프로필 추가
    const { data, error: newProfileError } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email: userEmail
      });

    if (newProfileError) {
      // 삽입 중 오류 발생 시 예외 처리
      throw newProfileError;
    }

    // console.log('newProfile', data);
    return data;
  }

  return null;
};
