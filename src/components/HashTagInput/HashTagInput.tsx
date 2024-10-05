import Image from 'next/image';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { TooltipTextField } from '@/components';
import tagDeleteBtn from '@/images/tag-delete-btn.svg';
import st from './HashTagInput.module.scss';
import { TooltipTextFieldProps } from '@/components';

export type MakeTagArrayReturn = string[] | null;
export interface HashTagInputProps extends Omit<TooltipTextFieldProps, 'children'> {
  errorText: string;
  isError: boolean;
  onChange(value: string[]): void;
}

const TAG_REGEXP = /#[^\s#]+/g;
const MAX_TAG_LENGTH = 20;

export default function HashTagInput({
  isError,
  errorText,
  onChange: passTags,
  ...props
}: HashTagInputProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const isKeyHandledRef = useRef(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      isKeyHandledRef.current = true;
      const newTags = extractTags();
      if (newTags) {
        setTags(prevTags => deduplicateTags([...prevTags, ...newTags]));
        setInputValue('');
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isKeyHandledRef.current) {
      isKeyHandledRef.current = false; // 상태 리셋
      return;
    }
    setInputValue(e.target.value);
  };

  const extractTags = (): MakeTagArrayReturn => {
    const matchedTags = inputValue.match(TAG_REGEXP);
    return matchedTags
      ? matchedTags
          .map(tag => tag.trim())
          .filter(tag => tag.length > 1 && tag.length <= MAX_TAG_LENGTH)
      : null;
  };

  const deduplicateTags = (newTags: string[]): string[] => {
    return Array.from(new Set(newTags));
  };

  const handleTagDelete = (index: number) => {
    setTags(prevTags => prevTags.filter((_, i) => i !== index));
  };

  useEffect(() => {
    passTags(tags);
  }, [tags, passTags]);

  return (
    <TooltipTextField {...props}>
      <div className={st.tagArea}>
        <div className={st.tagContainer}>
          {tags.map((tag, index) => (
            <div className={st.tagContainer_tag} key={tag + index}>
              <p>{tag}</p>
              <Image
                onClick={() => handleTagDelete(index)}
                className={'ml-1 cursor-pointer'}
                alt="태그 삭제"
                src={tagDeleteBtn}
              />
            </div>
          ))}
          <input
            value={inputValue}
            onKeyDown={handleKeyDown}
            onInput={handleInputChange}
            className={`${st.tagContainer_input} border-none outline-none`}
            placeholder="#카테고리"
          />
        </div>
        {isError && <p className={st.tagArea_errorText}>{errorText}</p>}
      </div>
    </TooltipTextField>
  );
}
