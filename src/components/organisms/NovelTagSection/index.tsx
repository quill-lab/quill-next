'use client';

import NovelTag from '@/components/molecules/NovelTag';
import React from 'react';

const NovelTagSection = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex gap-[8px] items-center">
      {tags.length && tags?.map(tag => <NovelTag text={tag} />)}
    </div>
  );
};

export default NovelTagSection;
