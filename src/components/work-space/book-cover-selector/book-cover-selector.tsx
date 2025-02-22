'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { TooltipTextField } from '@/components';
import st from './book-cover-selector.module.scss';
import BCimg1 from '@/images/book-corver-1.png';
import BCimg2 from '@/images/book-corver-2.png';
import BCimg3 from '@/images/book-corver-3.png';
import BCimg4 from '@/images/book-corver-4.png';
import BCimg5 from '@/images/book-corver-5.png';

interface BookCoverSelectorProps {
  handleClickImage?: (value: StaticImageData) => void;
}

const resources = [BCimg1, BCimg2, BCimg3, BCimg4, BCimg5] as const;

export const BookCoverSelector = ({ handleClickImage }: BookCoverSelectorProps) => {
  const [bookSrc, setBookScr] = useState<StaticImageData | null>();

  const onClickImage = (image: StaticImageData) => {
    setBookScr(prev => (prev === image ? null : image));
    handleClickImage?.(image);
  };

  return (
    <div>
      <TooltipTextField
        compulsory={false}
        tooltipText="소설의 북커버를 선택해주세요."
        categoryText="북커버"
      >
        <div className={'flex flex-col items-center'}>
          <div
            className={`relative w-[120px] h-[120px] mt-5 rounded-xl flex justify-center items-center overflow-hidden ${
              bookSrc ? '' : 'border-[0.5px] border-gray1'
            }`}
          >
            {bookSrc ? (
              <Image className="rounded-xl" fill src={bookSrc} alt="북커버 이미지" />
            ) : (
              <span className={'text-gray2 text-sm'}>북커버 이미지</span>
            )}
          </div>
          <div className={'mt-12 flex justify-center items-center gap-2 cursor-pointer'}>
            {resources.map(image => (
              <Image
                key={image.src}
                width={73}
                height={73}
                onClick={() => onClickImage(image)}
                src={image}
                alt={image.src}
              />
            ))}
          </div>
        </div>
      </TooltipTextField>
    </div>
  );
};
