import Image from 'next/image';
import React from 'react';

const BookCard = () => {
  return (
    <div className="w-[180px]">
      <div className="relative w-full h-[256px]">
        <Image src={'/images/book-cover-1.png'} fill alt="book-cover" />
      </div>
      <div className="mt-[24px] w-full">
        <p className="text-[#059EAF] text-[14px] font-[500] font-spoqa">연재중</p>
        <p className="text-[#2D2D2D] text-[18px] font-spoqa font-[700]">
          재벌집 막내아들 리부트...
        </p>
        <p className="text-[#959595] text-[14px] font-spoqa font-[500]">용진726 외4명</p>
      </div>
      <div className="mt-[16px] flex items-center gap-[16px]">
        <div className="flex items-center gap-[4px] text-[#2D2D2D] text-[14px] font-[400] font-spoqa">
          <Image src={'/images/view-icon.svg'} width={24} height={16} alt="view-icon" />
          <p>233</p>
        </div>
        <div className="flex items-center gap-[4px] text-[#2D2D2D] text-[14px] font-[400] font-spoqa">
          <Image src={'/images/like-icon.svg'} width={16} height={14} alt="like-icon" />
          <p>100</p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
