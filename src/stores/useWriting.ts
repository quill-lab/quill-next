import { NovelJoinWriteList } from '@/shared';
import { DraftText } from '@/shared/interface/chapter';
import { create } from 'zustand';

interface State {
  isSaving: boolean;
  draftContent: string;
}

interface Actions {
  setIsSaving: (arg: boolean) => void;
  setDraftContent: (content: string) => void;
}

export const useWriting = create<State & Actions>()(set => ({
  isSaving: false,
  draftContent: '',
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
