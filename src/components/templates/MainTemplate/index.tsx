'use client';

import BookContainer from '@/components/organisms/BookContainer';
import MainBannerSlider from '@/components/organisms/MainBannerSlider';
import { PageHeader } from '@/components/PageHeader/PageHeader';
import Image from 'next/image';

export const MainTemplate = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-[1480px]">
        <PageHeader />
      </div>
      <div className="flex flex-col items-center justify-center gap-[8px] w-full mt-[60px]">
        <p className="text-[#059EAF] text-[24px] font-[700] font-spoqa text-center">
          작가의 정원은
        </p>
        <p className="text-[#2D2D2D] text-center text-[34px] font-[700]">
          여러분의 이야기를
          <br />
          쉽게 만들 수 있어요.
        </p>
      </div>

      <div className="mt-[120px] w-full">
        <MainBannerSlider />
      </div>

      <div className="mt-[120px] w-full max-w-[1208px]">
        <h3 className="text-[#059EAF] font-spoqa text-[24px] text-center font-[700]">
          실시간 연재중인 웹소설
        </h3>
        <p className="text-[#2D2D2D] text-center text-[34px] font-[700]">
          작가의 정원 유저들이
          <br />
          선택한 작품을 지금 바로 확인 해보세요.
        </p>

        <div className="py-[120px]">
          <div className="mt-[40px]">
            <BookContainer title="실시간 전체" strongTitle="인기 북클립" />
          </div>
          <div className="mt-[56px]">
            <BookContainer title="작가의 정원" strongTitle="신작 소개" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTemplate;
