import React from 'react';
import { CharacterInfo } from '@/interfaces';
import './index.scss';
import Image from 'next/image';

type CharacterInfoCard = CharacterInfo;

export const CharacterInfoCard = ({ name, description }: CharacterInfoCard) => {
  return (
    <div className={'w-full min-h-[200px] p-[20px] bg-white-opacity-50 rounded-xl'}>
      <div className={'overflow-y-auto max-h-[174px] min-h-[174px]'}>
        <div className={'flex flex-col w-full'}>
          <span className={'text-[#2D2D2D] text-[14px] font-[500]'}>{name}</span>
          <span
            className={'text-[#2D2D2D] text-[14px] font-[400] custom-scrollbar whitespace-pre-line'}
          >
            {description}
          </span>
        </div>
      </div>
    </div>
  );
};
