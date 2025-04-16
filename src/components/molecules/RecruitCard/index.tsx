import Image from 'next/image';
import React from 'react';

const RecruitCard = () => {
  return (
    <div className="w-full py-[16px] px-[28px] flex flex-col items-start justify-center bg-[#FAFAFA] rounded-[10px] border border-[0.5px] border-[#D9D9D9]">
      <div className="flex justify-start items-center gap-[8px]">
        <div className="bg-[#1CB09E] px-[12px] py-[4px] rounded-[100px]">
          <p className="text-[#fff] font-[400] text-[8px] text-center">모집중</p>
        </div>
        <p className="text-[#959595] text-[14px] font-[500] font-spoqa">2023.05.02</p>
      </div>
      <p className="mt-[24px] text-[#2D2D2D] text-[22px] font-[700] font-spoqa">
        12월 목표로 판타지 소설 작성해 보실 분 구해요!
      </p>
      <div className="mt-[16px] flex items-center gap-[68px]">
        <div className="flex gap-[16px] items-center">
          <p className="text-[#959595] text-[14px] font-[500] font-spoqa">제목</p>
          <p className="text-[#2D2D2D] text-[14px] font-[700] font-spoqa">재벌집 막내아들</p>
        </div>
        <div className="flex gap-[16px] items-center">
          <p className="text-[#959595] text-[14px] font-[500] font-spoqa">작가 인원</p>
          <p className="text-[#2D2D2D] text-[14px] font-[700] font-spoqa">1/5</p>
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-[8px]">
          <Image src={'/images/avatar.png'} width={24} height={24} alt="profile img" />
          <p className="text-[#6A6A6A] text-[14px] font-[500] font-spoqa">용진 726</p>
        </div>
        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[4px]">
            <Image src={'/images/view-icon.svg'} width={24} height={12} alt="view" />
            <p className="text-[#959595] text-[14px] font-[400] font-spoqa">456</p>
          </div>
          <div className="flex items-center gap-[4px]">
            <Image src={'/images/like-icon.svg'} width={14} height={14} alt="like" />
            <p className="text-[#959595] text-[14px] font-[400] font-spoqa">3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitCard;
