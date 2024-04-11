import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

export type Imessage = {
  club_id: string;
  created_at: string;
  id: string;
  is_edit: boolean;
  send_from: string;
  text: string;
  profiles: {
    display_name: string | null;
    email: string | null;
    id: string;
    interests: string | null;
    introduction: string | null;
    most_favorite_book: string | null;
    photo_URL: string | null;
  } | null;
  clubs: {
    archive: boolean | null;
    book_author: string | null;
    book_category: string | null;
    book_cover: string | null;
    book_id: string | null;
    book_page: number | null;
    book_title: string | null;
    created_at: string;
    description: string | null;
    id: string;
    max_member_count: number | null;
    name: string | null;
    thumbnail: string | null;
  } | null;
};
interface MessageState {
  messages: Imessage[];
  addMessage: (message: Imessage) => void;
  optimisticIds: string[];
  setOptimisticIds: (id: string) => void;
}

export const useMessage = create<MessageState>()((set) => ({
  messages: [],
  optimisticIds: [],
  setOptimisticIds: (id: string) =>
    set((state) => ({ optimisticIds: [...state.optimisticIds, id] })),
  addMessage: (newMessages) =>
    set((state) => ({
      messages: [...state.messages, newMessages],
      optimisticIds: [...state.optimisticIds, newMessages.id]
    }))
}));
