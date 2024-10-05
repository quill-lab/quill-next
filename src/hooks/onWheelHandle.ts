import throttle from 'lodash/throttle';
import { useCallback, WheelEvent } from 'react';

import useWheelState from '@/stores/useWheelState';

interface useOnWheelHandleProps {
  minScroll?: number;
}
export default function useOnWheelHandle(minScroll = 0) {
  const { wheelChange, wheelTopChange } = useWheelState();
  const wheelUpDown = (e: WheelEvent<HTMLDivElement>) => {
    if (e.nativeEvent.deltaY > minScroll) {
      // scroll down event
      wheelChange(true);
    } else {
      // scroll up event
      wheelChange(false);
    }
  };

  const wheelTopNow = () => {
    if (window.scrollY < minScroll) {
      wheelTopChange(true);
    } else {
      wheelTopChange(false);
    }
  };

  const events = (e: WheelEvent<HTMLDivElement>) => {
    wheelUpDown(e);
    wheelTopNow();
  };

  return useCallback(throttle(events, 500), []);
}
