import { create } from 'zustand';

interface initialzeApp {
  id: number;
  email: string;
  password: string;
  setEmail(data: string): void;
  setPassword(value: string): void;
}

const useLoginData = create<initialzeApp>()((set, get) => ({
  id: 0,
  email: '',
  password: '',

  setId(data: number) {
    set({
      id: data,
    });
  },
  setEmail(data: string) {
    set({
      email: data,
    });
  },
  setPassword(data: string) {
    set({
      password: data,
    });
  },
}));

export default useLoginData;
