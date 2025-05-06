'use client';

import { PageHeader } from '@/components/PageHeader/PageHeader';
import { ChapterText } from '@/shared/interface/chapter';
import React from 'react';

interface NovelEpisodeTemplateProps {
  episodeTexts: ChapterText[];
  episodeData: { title: string; episodeTitle: string; chapterNumber: number };
}

const NovelEpisodeTemplate = ({ episodeTexts, episodeData }: NovelEpisodeTemplateProps) => {
  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-[#059EAF]">
      <div className="w-full max-w-[1308px]">
        <PageHeader bg="#F6F8F880" />
      </div>

      <div className="flex justify-center items-center mt-[20px] gap-[44px]">
        <p className="text-[#FFF] text-[24px] font-[300]">{episodeData.title}</p>
        <p className="text-[#FFF] text-[24px] font-[500]">
          {episodeData.chapterNumber}화 {episodeData.episodeTitle}
        </p>
      </div>

      <div className="mt-[70px] flex flex-col gap-[32px] w-full max-w-[1000px] text-[#fff] text-[20px] font-[500] leading-[35px] whitespace-pre-line">
        {episodeTexts.map((text, index) => (
          <p key={index} className="mb-4">
            {text.content}
          </p>
        ))}
      </div>
    </div>
  );
};

export default NovelEpisodeTemplate;
