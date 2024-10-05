import { create } from 'zustand';

interface State {
  isWheelDown: boolean;
  isWheelTop: boolean;
}
interface Actions {
  wheelChange(state: boolean): void;
  wheelTopChange(state: boolean): void;
}

const useWheelState = create<State & Actions>(set => ({
  isWheelDown: false,
  isWheelTop: true,
  wheelChange(state) {
    set({ isWheelDown: state });
  },
  wheelTopChange(state) {
    set({
      isWheelTop: state,
    });
  },
}));

export default useWheelState;
