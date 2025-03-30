import React from 'react';
import { CharacterInfo } from '@/interfaces';
import './index.scss';
import Image from 'next/image';

type CharacterInfoCard = CharacterInfo;

export const CharacterInfoCard = ({ name, description }: CharacterInfoCard) => {
  return (
    <div className={'w-[238px] min-h-[200px] p-[20px] bg-white-opacity-50 rounded-xl'}>
      {/* <div className={'py-2 text-right'}> */}
      {/* <span className={'text-blue1 text-[8px]'}>
          {lastModifier} {updatedAt}
        </span> */}
      {/* </div> */}
      <div className={'overflow-y-auto max-h-[174px]'}>
        <div className={'flex flex-col w-[176px]'}>
          <span className={'text-[#2D2D2D] text-[14px] font-[500]'}>{name}</span>
          <span className={'text-[#2D2D2D] text-[14px] font-[400] custom-scrollbar'}>
            {description}
          </span>
        </div>
      </div>
    </div>
  );
};
