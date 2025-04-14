'use client';

import DropDownBox from '@/components/molecules/Dropbox';
import MobileTabHeader from '@/components/molecules/MobileTabHeader';
import EpisodeList from '@/components/organisms/EpisodeList';
import WorkSpaceTabHeader from '@/components/organisms/WorkSpaceTabHeader';
import Image from 'next/image';
import { useState } from 'react';

interface EpisodeInterface {}

export default function EpisodeTemplate({}) {
  return (
    <div>
      <div className="sm:hidden">
        <MobileTabHeader currentTab="episode" />
      </div>
      <div className="hidden sm:block">
        <WorkSpaceTabHeader currentTab="/episode" />
      </div>
      <div className="mt-[8px] w-full bg-[white] bg-opacity-50 rounded-b-[10px]">
        <div className="px-[24px] py-[16px] flex justify-between items-center">
          <DropDownBox />

          <button className="bg-[white] bg-opacity-50 rounded-[100px] px-[16px] py-[8px] text-[#059eaf] text-[12px] font-[500] font-[spoqa] flex gap-[4px]">
            작품 보러 가기
          </button>
        </div>
        <div className="w-full px-[76px]">
          <EpisodeList />
        </div>
      </div>
    </div>
  );
}
