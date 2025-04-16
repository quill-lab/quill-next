'use client';

import RecruitCardList from '@/components/organisms/RecruitCardList';
import { PageHeader } from '@/components/PageHeader/PageHeader';
import Image from 'next/image';
import React from 'react';

const RecruitTemplate = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full flex flex-col items-center justify-start">
        <div className="w-full bg-[#25C7C7] px-[16px] flex flex-col items-center">
          <PageHeader bg="rgba(246, 248, 248, 0.50)" />
          <div className="flex justify-between relative pb-[24px] w-full px-[200px]">
            <div className="flex flex-col justify-end items-start">
              <p className="text-[#fff] text-[24px] font-[400] tracking-[2.4px]">작가 모집</p>
              <p className="text-[#fff] text-[40px] font-[400] leading-[120%] tracking-[-2px]">
                혼자 글 쓰는 어려움 고민하지 마세요.
                <br />
                작가를 모집해서 함께 글을 작성해 보세요.
              </p>
            </div>
            <Image
              className="bg-transparent"
              src={'/images/recruit-character.png'}
              width={296}
              height={196}
              alt="recruit-character"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-[48px] px-[200px] pb-[72px] flex-grow">
        <RecruitCardList />
      </div>
    </div>
  );
};

export default RecruitTemplate;
