import create from 'zustand';

interface AlarmStore {
  alarms: string[];
  addAlarm: (alarm: string) => void;
  clearAlarms: () => void;
}

const useAlarmStore = create<AlarmStore>((set) => ({
  alarms: [],
  addAlarm: (alarm) => set((state) => ({ alarms: [...state.alarms, alarm] })),
  clearAlarms: () => set({ alarms: [] })
}));

export default useAlarmStore;
