// store/characterStore.ts
import create from 'zustand';

type Character = {
  name: string;
  description: string;
};

type CharacterStore = {
  state: boolean;
  list: Character[];
  setEditingCharacters: (state: boolean) => void;
  addCharacter: () => void;
  removeCharacter: (index: number) => void;
  updateCharacter: (index: number, field: 'name' | 'description', value: string) => void;
};

export const useCharacterStore = create<CharacterStore>(set => ({
  state: false,
  list: [],

  setEditingCharacters: state => set({ state, list: [] }),

  addCharacter: () =>
    set(state => ({
      list: [
        ...state.list,
        { name: '등장인물 이름', description: '등장인물의 성격과 배경을 쉽게 설명해 주세요.' },
      ],
    })),

  removeCharacter: index =>
    set(state => {
      const newList = [...state.list];
      newList.splice(index, 1);
      return { list: newList };
    }),

  updateCharacter: (index, field, value) =>
    set(state => {
      const updatedList = [...state.list];
      updatedList[index][field] = value;
      return { list: updatedList };
    }),
}));
