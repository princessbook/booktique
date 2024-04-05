import create from 'zustand';
type TabState = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

export const useTabStore = create<TabState>((set) => ({
  selectedTab: 'home',
  setSelectedTab: (tab) => set((state) => ({ selectedTab: tab }))
}));
