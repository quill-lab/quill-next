// store/characterStore.ts
import { generateId } from '@/utils/generateId';
import create from 'zustand';

type Character = {
  id: string;
  name: string;
  description: string;
  isNew?: boolean;
};

type CharacterStore = {
  state: boolean;
  list: Character[];
  toggleEditingCharacters: () => void;
  addCharacter: () => void;
  removeCharacter: (id: string) => void;
  updateCharacter: (index: number, field: 'name' | 'description', value: string) => void;
  initialCharacters: (characters: Character[]) => void;
};

export const useCharacterStore = create<CharacterStore>(set => ({
  state: false,
  list: [],

  initialCharacters: (characters: Character[]) => {
    set({ list: characters });
  },

  toggleEditingCharacters: () => set(state => ({ state: !state })),

  addCharacter: () =>
    set(state => ({
      list: [
        ...state.list,
        {
          id: generateId(),
          name: '등장인물 이름',
          description: '등장인물의 성격과 배경을 쉽게 설명해 주세요.',
          isNew: true,
        },
      ],
    })),

  removeCharacter: id =>
    set(state => ({
      list: state.list.filter(character => character.id !== id),
    })),

  updateCharacter: (index, field, value) =>
    set(state => {
      const updatedList = [...state.list];
      updatedList[index][field] = value;
      return { list: updatedList };
    }),
}));
