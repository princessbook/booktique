import { LIMIT_MESSAGE } from '@/lib/constant';
import { create } from 'zustand';

export type Imessage = {
  club_id: string;
  created_at: string;
  id: string;
  is_edit: boolean;
  send_from: string;
  text: string;
  send_photo_URL: string | null;
  profiles: {
    display_name: string | null;
    email: string | null;
    id: string;
    // interests: string | null;
    introduction: string | null;
    // most_favorite_book: string | null;
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
    weekday: string | null;
    last_read: boolean | null;
  } | null;
};
interface MessageState {
  hasMore: boolean;
  page: number;
  messages: Imessage[];
  addMessage: (message: Imessage) => void;
  optimisticIds: string[];
  setOptimisticIds: (id: string) => void;
  setMessages: (messages: Imessage[]) => void;
  resetPage: () => void;
}

export const useMessage = create<MessageState>()((set) => ({
  hasMore: true,
  page: 1,
  messages: [],
  optimisticIds: [],
  setMessages: (messages) =>
    set((state) => ({
      messages: [...messages, ...state.messages],
      page: state.page + 1,
      hasMore: messages.length >= LIMIT_MESSAGE
    })),
  setOptimisticIds: (id: string) =>
    set((state) => ({ optimisticIds: [...state.optimisticIds, id] })),
  addMessage: (newMessages) =>
    set((state) => ({
      messages: [...state.messages, newMessages],
      optimisticIds: [...state.optimisticIds, newMessages.id]
    })),
  resetPage: () =>
    set(() => ({
      page: 1,
      hasMore: true,
      messages: []
    }))
}));
