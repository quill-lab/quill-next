import { create } from 'zustand';

interface State {
  lastChapterId: number;
  editMode: boolean;
  editTitle: string;
  editDescription: string;
  editSynopsis: string;
  editTags: string[];

  initEditTags: (tags: string[]) => void;
  setLastChapterId: (id: number) => void;
  setEditMode: (bool: boolean) => void;
  toggleEditMode: () => void;
  setEditTitle: (title: string) => void;
  setEditTags: (tags: string[]) => void;
  setEditDescription: (desc: string) => void;
  setEditSynopsis: (synopsis: string) => void;
  addTags: () => void;
  updateTags: (index: number, value: string) => void;
  removeTags: (index: number) => void;
  initEditSynopsis: (synopsis: string) => void;
  initEditDescription: (description: string) => void;
}

export const useNovelRoom = create<State>()(set => ({
  lastChapterId: 0,
  editMode: false,
  editTitle: '',
  editTags: [],
  editDescription: '',
  editSynopsis: '',

  initEditTags: (tags: string[]) => {
    set({ editTags: tags });
  },

  setLastChapterId: (id: number) => {
    set({ lastChapterId: id });
  },

  setEditMode: (bool: boolean) => {
    set({ editMode: bool });
  },

  setEditTitle: (title: string) => {
    set({ editTitle: title });
  },

  setEditTags: (tags: string[]) => {
    set({ editTags: tags });
  },

  initEditSynopsis: (synopsis: string) => {
    set({ editSynopsis: synopsis });
  },

  initEditDescription: (description: string) => {
    set({ editDescription: description });
  },

  toggleEditMode: () => {
    set(state => ({ editMode: !state.editMode }));
  },

  setEditDescription: (desc: string) => {
    set({ editDescription: desc });
  },

  setEditSynopsis: (synopsis: string) => {
    set({ editSynopsis: synopsis });
  },

  addTags: () => {
    set(state => ({
      editTags: [...state.editTags, ''],
    }));
  },

  updateTags: (index: number, value: string) => {
    set(state => {
      const updatedTags = [...state.editTags];
      updatedTags[index] = value;
      return { editTags: updatedTags };
    });
  },

  removeTags: (index: number) => {
    set(state => {
      const newTags = [...state.editTags];
      newTags.splice(index, 1);
      return { editTags: newTags };
    });
  },
}));
