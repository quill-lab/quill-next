import { useEffect, useState } from 'react';

interface TimerProps {
  initialTime: number;
  onTimerComplete: () => void;
}

export const useTimer = ({ initialTime, onTimerComplete }: TimerProps) => {
  const [time, setTime] = useState<number>(initialTime);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive && time > 0) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
      if (time === 0) {
        onTimerComplete();
      }
    };
  }, [isActive, time, onTimerComplete]);

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setTime(initialTime);
    setIsActive(false);
  };

  return { time, isActive, startTimer, resetTimer };
};
