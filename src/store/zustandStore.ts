import { create } from 'zustand';

type TabState = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  selectedClubId: string;
  setSelectedClubId: (clubId: string) => void;
};

export const useTabStore = create<TabState>((set) => {
  // 클라이언트 사이드에서만 localStorage에 접근
  const initialSelectedTab =
    typeof window !== 'undefined'
      ? localStorage.getItem('selectedTab')
      : 'home';
  const initialSelectedClubId =
    typeof window !== 'undefined' ? localStorage.getItem('selectedClubId') : '';

  return {
    selectedTab: initialSelectedTab || 'home',
    selectedClubId: initialSelectedClubId || '',
    setSelectedTab: (tab) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedTab', tab);
      }
      set({ selectedTab: tab });
    },
    setSelectedClubId: (clubId) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedClubId', clubId);
      }
      set({ selectedClubId: clubId });
    }
  };
});
