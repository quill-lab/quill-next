import { create } from 'zustand';

interface State {
  lastChapterId: number;
}
type Actions = {
  setLastChapterId: (id: number) => void;
};

export const useNovelRoom = create<State & Actions>()(set => ({
  lastChapterId: 0,
  setLastChapterId: (id: number) => {
    set({ lastChapterId: id });
  },
}));
