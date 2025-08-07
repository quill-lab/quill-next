import { WritingModeType } from '@/shared';

import { TooltipTextField } from '@/components';
import st from './WritingModeSelector.module.scss';
import PeopleCount from '../PeopleCount/PeopleCount';
import React from 'react';

interface WritingModeSelectorProps {
  writingMode: WritingModeType;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleChangePeopleCount: (e: number) => void;
}

export const WritingModeSelector = ({
  onChange,
  writingMode,
  handleChangePeopleCount,
}: WritingModeSelectorProps) => (
  <>
    <TooltipTextField
      compulsory={true}
      categoryText="작가 정원"
      tooltipText="몇 명의 작가와 함께 글을 쓰고 싶나요?"
    >
      <div className={st.container}>
        <label className={st.inputBox}>
          <input
            type="radio"
            onChange={onChange}
            value="collaborate"
            checked={writingMode === 'collaborate'}
          />
          <p className={st.ml8}>같이 글쓰기</p>
        </label>
        <label className={st.inputBox}>
          <input type="radio" onChange={onChange} value="solo" checked={writingMode === 'solo'} />
          <p className={st.ml8}>혼자 글쓰기</p>
        </label>
      </div>
    </TooltipTextField>
    {writingMode === 'collaborate' && <PeopleCount onChange={handleChangePeopleCount} />}
  </>
);
