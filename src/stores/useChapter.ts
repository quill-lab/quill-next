import { create } from 'zustand';

interface State {
  lastChapterId: number;
  title: string;
}

interface Actions {
  setLastChapterId: (id: number) => void;
  setChapterTitle: (title: string) => void;
}

export const useNovelChapter = create<State & Actions>()(set => ({
  title: '',
  lastChapterId: 0,
  setLastChapterId: (id: number) => set({ lastChapterId: id }),
  setChapterTitle: (title: string) => set({ title }),
}));
