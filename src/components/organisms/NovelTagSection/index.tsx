import NovelTag from '@/components/molecules/NovelTag';
import React from 'react';

const NovelTagSection = () => {
  return (
    <div className="flex gap-[8px] items-center">
      <NovelTag text="#스릴러로맨스" />
      <NovelTag text="#마지막반전" />
      <NovelTag text="#분위기있는" />
    </div>
  );
};

export default NovelTagSection;
