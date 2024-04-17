import create from 'zustand';

interface ModalStore {
  isModalOpen: boolean;
  toggleModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isModalOpen: false,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen }))
}));

export default useModalStore;
