'use client';

import ChapterItemList from '@/components/organisms/ChapterItemList';
import WorkSpaceTabHeader from '@/components/organisms/WorkSpaceTabHeader';
import Image from 'next/image';
import './custom-scrollbar.scss';

const WritingTemplate = () => {
  return (
    <div className="">
      <WorkSpaceTabHeader currentTab="writing" />

      <div className="w-full">
        <div className="w-full mt-[8px] rounded-tl-[10px] rounded-tr-[10px] bg-[white] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex justify-between items-center py-[18px] px-[32px]">
          <h2 className="text-[#2D2D2D] font-spoqa text-[16px] font-[500]">1화 적극적 어필</h2>
          <p className="text-[#2D2D2D] font-spoqa text-[16px] font-[500]">작성중</p>
        </div>
        <div className="w-full h-[16px] rounded-bl-[10px] rounded-br-[10px] bg-[#077D8A] shadow-[0px 4px 4px 0px rgba(0, 0, 0, 0.25)]" />
      </div>
      <ChapterItemList />

      <div className="flex justify-between w-full h-[120px] mt-[16px] rounded-[10px] shadow-[0px 4px 4px 0px rgba(0, 0, 0, 0.25)]">
        <textarea
          className="w-full py-[16px] px-[32px] bg-white rounded-tl-[10px] rounded-bl-[10px] placeholder-[#686868] resize-none placeholder:text-[16px] placeholder:font-[400] placeholder:font-spoqa custom-scrollbar"
          placeholder="문장을 이어 나갈 차례입니다. 30자 이상 작성해 주세요."
        />
        <button className="relative w-[84px]">
          <Image
            src={'/images/submit-btn.png'}
            fill
            alt="submit-btn"
            className="rounded-tr-[10px] rounded-br-[10px]"
          />
        </button>
      </div>
    </div>
  );
};

export default WritingTemplate;
