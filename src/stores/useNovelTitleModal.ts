import { create } from 'zustand';

interface State {
  isShow: boolean;
}

type Actions = {
  show: () => void;
  hide: () => void;
};

export const useNovelTitleModal = create<State & Actions>()(set => ({
  isShow: false,
  show: () => {
    set({ isShow: true });
  },
  hide: () => {
    set({ isShow: false });
  },
}));
