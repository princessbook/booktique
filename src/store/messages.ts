import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

export type Imessage =
  | {
      created_at: string;
      id: string;
      is_edit: boolean;
      sent_by: string;
      text: string;
    }[]
  | null;
interface MessageState {
  messages: Imessage[];
}

export const useMessage = create<MessageState>()((set) => ({
  messages: []
}));
