import { create } from 'zustand';

interface initializeApp {
  id: number;
  email: string;
  nickname: string;
  setUser: (data: { id: number; email: string; nickname: string }) => void;
}

export const useLoginUser = create<initializeApp>()((set, get) => ({
  id: 0,
  email: '',
  nickname: '',
  setUser: (data: { id: number; email: string; nickname: string }) => {
    set({
      id: data.id,
      email: data.email,
      nickname: data.nickname,
    });
  },
}));
