'use client';

import LoadingBar from '@/components/atoms/LoadingBar';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useTransition } from 'react';

interface NovelChapterProps {
  id: string;
  chapterNubmer: string;
  title: string;
  like: number;
  view: number;
  comment: number;
  // createdAt: string;
}

const NovelChapter = ({ id, chapterNubmer, title, like, view, comment }: NovelChapterProps) => {
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const roomId = params?.roomId;

  const handleMoveEpisode = () => {
    startTransition(() => {
      router.push(`/novel/${roomId}/episode/${id}`);
    });
  };

  return (
    <div
      onClick={handleMoveEpisode}
      className="cursor-pointer border-t border-t-[0.5px] border-[#D9D9D9] pt-[8px] pb-[4px] pl-[28px]"
    >
      {isPending && <LoadingBar />}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[80px]">
          <p className="text-[#2D2D2D] text-[16px] font-[500]">{chapterNubmer}</p>
          <p className="text-[#2D2D2D] text-[16px] font-[500]">{title}</p>
        </div>
        <div className="flex itmes-center gap-[10px]">
          <div className="px-[8px] py-[4px] flex gap-[4px] items-center">
            <Image src={'/images/view-icon.svg'} width={23} height={14} alt="view icon" />
            <p className="text-[#2D2D2D] text-[14px] font-[400]">{view}</p>
          </div>
          <div className="px-[8px] py-[4px] flex gap-[4px] items-center">
            <Image src={'/images/chat-icon.svg'} width={16} height={14} alt="chat icon" />
            <p className="text-[#2D2D2D] text-[14px] font-[400]">{comment}</p>
          </div>
          <div className="px-[8px] py-[4px] flex gap-[4px] items-center">
            <Image src={'/images/like-icon.svg'} width={16} height={14} alt="like icon" />
            <p className="text-[#2D2D2D] text-[14px] font-[400]">{like}</p>
          </div>
        </div>
      </div>

      <p className="w-full text-[#A8A8A8] text-[14px] text-end font-[400] pr-[8px]">2023.7.11</p>
    </div>
  );
};

export default NovelChapter;
