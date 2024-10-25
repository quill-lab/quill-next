import { create } from 'zustand';

interface initialzeApp {
  id: number;
  email: string;
  nickname: string;
  setUser: (data: { id: number; email: string; nickanem: string }) => void;
}

export const useLoginUser = create<initialzeApp>()((set, get) => ({
  id: 0,
  email: '',
  nickname: '',
  setUser: (data: { id: number; email: string; nickanem: string }) => {
    set({
      id: data.id,
      email: data.email,
      nickname: data.nickanem,
    });
  },
}));
