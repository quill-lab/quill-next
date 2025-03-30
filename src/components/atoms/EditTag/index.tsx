import { useNovelRoom } from '@/stores';
import { useEffect, useRef } from 'react';

type EditTagProps = {
  text: string;
  index: number;
  isLast?: boolean;
};

const EditTag = ({ text, index, isLast }: EditTagProps) => {
  const { updateTags, addTags, setIsTagFocused, isTagFocused } = useNovelRoom();
  const inputRef = useRef<HTMLInputElement>(null);

  const calculateWidth = (text: string) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return 0;

    context.font = '12px Spoqa Han Sans';
    const metrics = context.measureText(text);
    return Math.ceil(metrics.width);
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const width = calculateWidth(input.value);
    input.style.width = `${width + 20}px`;
  };

  useEffect(() => {
    if (isLast && inputRef.current && isTagFocused) {
      inputRef.current.focus();
    }
  }, [isLast, isTagFocused]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Tab') {
      e.preventDefault();
      if (e.currentTarget.value) {
        updateTags(index, e.currentTarget.value);
        addTags();
        setIsTagFocused(true);
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      const width = calculateWidth(text);
      inputRef.current.style.width = `${width + 20}px`;
    }
  }, [text]);

  return (
    <div className={'bg-white rounded py-[6.5px] px-[18px] flex justify-center'}>
      <div className="text-[#333] font-spoqa text-[12px] font-[400] flex items-center">
        <span>#</span>
        <input
          ref={inputRef}
          defaultValue={text}
          type="text"
          className="w-auto min-w-[1ch] outline-none border-none p-0 box-border"
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onBlur={e => {
            if (e.currentTarget.value) {
              updateTags(index, e.currentTarget.value);
              setIsTagFocused(false);
            }
          }}
        />
      </div>
    </div>
  );
};

export default EditTag;
