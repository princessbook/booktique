import { createClient } from '../supabase/client';
import { Tables } from '@/lib/types/supabase';
type Profile = Tables<'profiles'>;
type Clubs = Tables<'clubs'>;
type Sentences = Tables<'sentences'>;

export const getUserId = async (): Promise<string | null> => {
  try {
    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    return user!.id;
  } catch (error) {
    console.error('유저아이디 받아올 수 없음:', error);
    return null;
  }
};

export const getUserProfile = async (
  userId: string
): Promise<Profile[] | null> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId);
    if (error) {
      return null;
    }
    return data;
  } catch (error) {
    console.error('유저정보불러오기 실패', error);
    return null;
  }
};

export const getUserClubIds = async (userId: string): Promise<string[]> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('members')
      .select('club_id')
      .eq('user_id', userId);

    if (error) {
      console.error('유저의 클럽아이디들 불러오기실패:', error.message);
      return [];
    }
    console.log(data);
    return data?.map((row: any) => row.club_id) || [];
  } catch (error) {
    console.error('유저의 클럽아이디들 불러오기실패:', error);
    return [];
  }
};

export const getClubInfo = async (clubIds: string[]): Promise<Clubs[]> => {
  try {
    const supabase = createClient();
    // clubIds 배열이 비어있으면 빈 배열 반환
    if (clubIds.length === 0) {
      return [];
    }
    const { data, error } = await supabase
      .from('clubs')
      .select('*')
      .in('id', clubIds);

    if (error) {
      console.error('클럽정보 불러오기 실패:', error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('클럽정보 불러오기 실패:', error);
    return [];
  }
};
export const getMySentences = async (userId: String): Promise<Sentences[]> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('sentences')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user sentences:', error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching user sentences:', error);
    return [];
  }
};
