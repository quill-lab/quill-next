import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface RecruitCardProps {
  recruitData: IRecruitCard;
}

const RecruitCard = ({ recruitData }: RecruitCardProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/recruit/${recruitData.id}`)}
      className="w-full py-[16px] px-[28px] flex flex-col items-start justify-center bg-[#FAFAFA] rounded-[10px] border border-[0.5px] border-[#D9D9D9] cursor-pointer"
    >
      <div className="flex justify-start items-center gap-[8px]">
        {recruitData.contributor_group.max_contributor_count ===
        recruitData.contributor_group.contributor_count ? (
          <div className="bg-[#FF9200] px-[12px] py-[4px] rounded-[100px]">
            <p className="text-[#fff] font-[400] text-[8px] text-center">모집완료</p>
          </div>
        ) : (
          <div className="bg-[#1CB09E] px-[12px] py-[4px] rounded-[100px]">
            <p className="text-[#fff] font-[400] text-[8px] text-center">모집중</p>
          </div>
        )}
        <p className="text-[#959595] text-[14px] font-[500] font-spoqa">
          {dayjs(recruitData.created_at).format('YYYY.MM.DD') ?? '2023.05.02'}
        </p>
      </div>
      {recruitData.contributor_group.max_contributor_count ===
      recruitData.contributor_group.contributor_count ? (
        <p className="mt-[24px] text-[#DCDCDC] text-[22px] font-[700] font-spoqa">
          {recruitData.title}
        </p>
      ) : (
        <p className="mt-[24px] text-[#2D2D2D] text-[22px] font-[700] font-spoqa">
          {recruitData.title}
        </p>
      )}
      <div className="mt-[16px] flex items-center gap-[68px]">
        <div className="flex gap-[16px] items-center">
          <p className="text-[#959595] text-[14px] font-[500] font-spoqa">제목</p>
          {recruitData.contributor_group.max_contributor_count ===
          recruitData.contributor_group.contributor_count ? (
            <p className="text-[#DCDCDC] text-[14px] font-[700] font-spoqa">
              {recruitData.contributor_group.novels.title}
            </p>
          ) : (
            <p className="text-[#2D2D2D] text-[14px] font-[700] font-spoqa">
              {recruitData.contributor_group.novels.title}
            </p>
          )}
        </div>
        <div className="flex gap-[16px] items-center">
          <p className="text-[#DCDCDC] text-[14px] font-[500] font-spoqa">작가 인원</p>
          {recruitData.contributor_group.max_contributor_count ===
          recruitData.contributor_group.contributor_count ? (
            <p className="text-[#2D2D2D] text-[14px] font-[700] font-spoqa">
              {recruitData.contributor_group.contributor_count}/
              {recruitData.contributor_group.max_contributor_count}
            </p>
          ) : (
            <p className="text-[#2D2D2D] text-[14px] font-[700] font-spoqa">
              {recruitData.contributor_group.contributor_count}/
              {recruitData.contributor_group.max_contributor_count}
            </p>
          )}
        </div>
      </div>
      <div className="mt-[16px] w-full flex justify-between items-center">
        <div className="flex items-center gap-[8px]">
          <Image src={'/images/avatar.png'} width={24} height={24} alt="profile img" />
          <p className="text-[#6A6A6A] text-[14px] font-[500] font-spoqa">
            {recruitData.author.name}
          </p>
        </div>
        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[4px]">
            <Image src={'/images/view-icon.svg'} width={24} height={12} alt="view" />
            <p className="text-[#959595] text-[14px] font-[400] font-spoqa">{recruitData.view}</p>
          </div>
          <div className="flex items-center gap-[4px]">
            <Image src={'/images/like-icon.svg'} width={14} height={14} alt="like" />
            <p className="text-[#959595] text-[14px] font-[400] font-spoqa">{recruitData.like}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitCard;
