import { NovelJoinWriteList } from '@/shared';
import { create } from 'zustand';

interface State {
  writerList: NovelJoinWriteList[];
}

interface Actions {
  setWriterList: (writerList: NovelJoinWriteList[]) => void;
}

export const useNovelWriterListStore = create<State & Actions>()(set => ({
  writerList: [],
  setWriterList: writerList =>
    set({
      writerList: [...writerList],
    }),
}));
