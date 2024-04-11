import { create } from 'zustand';

type TabState = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  selectedClubId: string;
  setSelectedClubId: (clubId: string) => void;
};

export const useTabStore = create<TabState>((set) => {
  // 클라이언트 사이드에서만 localStorage에서 상태 불러오기
  const initialSelectedTab =
    typeof window !== 'undefined'
      ? localStorage.getItem('selectedTab') || 'home'
      : 'home';
  const initialSelectedClubId =
    typeof window !== 'undefined'
      ? localStorage.getItem('selectedClubId') || ''
      : '';

  return {
    selectedTab: initialSelectedTab,
    selectedClubId: initialSelectedClubId,
    setSelectedTab: (tab) => {
      // 상태 변경 및 localStorage에 저장
      localStorage.setItem('selectedTab', tab);
      set({ selectedTab: tab });
    },
    setSelectedClubId: (clubId) => {
      // 상태 변경 및 localStorage에 저장
      localStorage.setItem('selectedClubId', clubId);
      set({ selectedClubId: clubId });
    }
  };
});
