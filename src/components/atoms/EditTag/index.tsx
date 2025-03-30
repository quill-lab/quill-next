import { useNovelRoom } from '@/stores';
import { useEffect, useRef } from 'react';

type EditTagProps = {
  text: string;
  index: number;
  isLast?: boolean;
};

const EditTag = ({ text, index, isLast }: EditTagProps) => {
  const { updateTags, addTags } = useNovelRoom();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLast && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLast]);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    input.style.width = `${input.value.length}ch`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Tab') {
      e.preventDefault();
      if (e.currentTarget.value) {
        updateTags(index, e.currentTarget.value);
        addTags();
      }
    }
  };

  return (
    <div className={'bg-white rounded py-[6.5px] px-[18px] flex justify-center'}>
      <div className="text-[#333] font-spoqa text-[12px] font-[400] flex items-center">
        <span>#</span>
        <input
          ref={inputRef}
          defaultValue={text}
          type="text"
          className="w-auto min-w-[1ch] outline-none border-none p-0 box-border"
          style={{ width: `${text.length}ch` }}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onBlur={e => {
            if (e.currentTarget.value) {
              updateTags(index, e.currentTarget.value);
            }
          }}
        />
      </div>
    </div>
  );
};

export default EditTag;
