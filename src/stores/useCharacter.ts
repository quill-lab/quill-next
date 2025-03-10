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
      list: [...state.list, { name: '캐릭터 이름', description: '캐릭터 설명을 입력해주세요' }],
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
