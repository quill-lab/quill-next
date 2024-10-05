import { create } from 'zustand';

interface State {
  isShow: boolean;
}
interface Actions {
  show(): void;
  hide(): void;
}
const state: State = {
  isShow: false,
};

const useNovelPublishModal = create<State & Actions>()((set, get) => ({
  ...state,
  show() {
    set({ isShow: true });
  },
  hide() {
    set({ isShow: false });
  },
}));
export default useNovelPublishModal;
