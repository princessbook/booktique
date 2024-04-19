import { createClient } from '../supabase/client';
import { Tables } from '@/lib/types/supabase';
type Profile = Tables<'profiles'>;
type Clubs = Tables<'clubs'>;
type Sentences = Tables<'sentences'>;
type Sentence_Comments = Tables<'sentence_comments'>;
type Member = Tables<'members'>;
type MembersType = {
  club_id: string;
  id: string;
  role: 'admin' | 'member' | null;
  user_id: string | null;
  progress?: number | null; // progress 필드 추가
};
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
    // console.log(data);
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
      .in('id', clubIds)
      .eq('archive', false);

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

export const getAllSentences = async (clubId: string): Promise<Sentences[]> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('sentences')
      .select('*')
      .eq('club_id', clubId);

    if (error) {
      console.error('북클럽의 모든 문장 불러오기 실패:', error.message);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('북클럽의 모든 문장 불러오기 실패:', error);
    return [];
  }
};

export const getSentenceComments = async (
  sentenceId: string
): Promise<Sentence_Comments[] | null> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('sentence_comments')
      .select('*')
      .eq('sentence_id', sentenceId);
    if (error) {
      console.error('문장의 댓글들 불러오기 실패', error.message);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('문장의 댓글들 불러오기 실패:', error);
    return [];
  }
};
export const getClubActivityProgress = async (
  clubId: string,
  userId: string
): Promise<number | null> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('club_activities')
      .select('progress')
      .eq('club_id', clubId)
      .eq('user_id', userId);

    if (error) {
      console.error('내 진척상황 불러오기 실패', error);
      return null;
    }
    // console.log(data[0].progress);
    return data[0].progress;
  } catch (error) {
    console.error('Error fetching club activities:', error);
    return null;
  }
};

export const getBookClubMembers = async (
  clubId: string
): Promise<MembersType[]> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('club_id', clubId);
    if (error) {
      console.error('클럽멤버 불러오기 실패:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('클럽멤버 불러오기 실패:', error);
    return [];
  }
};
