import { NovelJoinWriteList } from '@/shared';
import { DraftText } from '@/shared/interface/chapter';
import { create } from 'zustand';

interface State {
  isSaving: boolean;
  draftContent: string;
  description: string;
}

interface Actions {
  setIsSaving: (arg: boolean) => void;
  setDraftContent: (content: string) => void;
  setDescription: (content: string) => void;
}

export const useWriting = create<State & Actions>()(set => ({
  isSaving: false,
  draftContent: '',
  description: '',
  setDescription: content => set({ description: content }),
  setIsSaving: arg =>
    set({
      isSaving: arg,
    }),
  setDraftContent(content) {
    set({
      draftContent: content,
    });
  },
}));
