import React from 'react';
import { CharacterInfo } from '@/interfaces';

type CharacterInfoCard = CharacterInfo;

export const CharacterInfoCard = ({
  name,
  description,
  updatedAt,
  lastModifier,
}: CharacterInfoCard) => {
  return (
    <div className={'w-[238px] max-h-50 px-4 bg-white-opacity-50 rounded-xl'}>
      <div className={'py-2 text-right'}>
        <span className={'text-blue1 text-[8px]'}>
          {lastModifier} {updatedAt}
        </span>
      </div>
      <div className={'overflow-y-auto max-h-[174px]'}>
        <div className={'flex flex-col w-[176px]'}>
          <span className={'text-sm font-bold'}>{name}</span>
          <span className={'text-sm pb-5'}>{description}</span>
        </div>
      </div>
    </div>
  );
};
