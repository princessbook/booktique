import { create } from 'zustand';

interface ModalStore {
  isModalOpen: boolean;
  toggleModal: () => void;
  resetModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isModalOpen: false,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  resetModal: () => set({ isModalOpen: false })
}));

export default useModalStore;
