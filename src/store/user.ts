import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

type UserState = {
  user: User | undefined;
};

export const useUser = create<UserState>()((set) => ({
  user: undefined
}));
