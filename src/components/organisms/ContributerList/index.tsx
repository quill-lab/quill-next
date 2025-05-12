'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Member } from '@/shared';
import { useSession } from 'next-auth/react';
import { useParams, useSearchParams } from 'next/navigation';
import { ChapterText } from '@/shared/interface/chapter';
import callApi from '@/shared/utils/fetchWrapper';
import { callApiResponse } from '@/shared/interface/api';

interface ContributerListProps {
  members: Member[];
}

const ContributerList = ({ members }: ContributerListProps) => {
  const { data: session } = useSession();
  const params = useParams();
  const searchParams = useSearchParams();
  const roomId = params?.roomId;
  const chapterId = searchParams?.get('episode');
  const [chapterTexts, setChapterTexts] =
    useState<{ id: string; content: string; authorName: string; createdAt: Date }[]>();

  useEffect(() => {
    const getChapterTexts = async () => {
      const chapterTexts = await callApi<{ items: ChapterText[] } & callApiResponse>({
        url: `/api/v1/novel-rooms/${roomId}/chapters/${chapterId}/texts`,
        method: 'GET',
        token: session?.user?.token,
      });

      const chapterText = chapterTexts?.items?.sort(
        (a: ChapterText, b: ChapterText) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      const mappingChapter = chapterText?.map(chapter => ({
        id: chapter.id,
        content: chapter.content,
        authorName: chapter.authorName,
        createdAt: chapter.createdAt,
      }));

      const sortedChapterTexts = mappingChapter?.sort(
        (a: ChapterText, b: ChapterText) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      setChapterTexts(sortedChapterTexts);
    };

    getChapterTexts();
    if (chapterId === null) {
      setChapterTexts([]);
    }
  }, [chapterId]);

  return (
    <div
      style={{
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      }}
      className="w-full relative mt-[70px] h-[468px] bg-[#fff] rounded-[20px] flex flex-col items-center"
    >
      <div className="py-[16px]">
        <p className="text-[#2D2D2D] text-[16px] font-[400]">
          참여 작가 ({members.length}/{members.length})
        </p>
      </div>

      <div className="pt-[21.5px] pl-[32px] flex flex-col gap-[24px] items-left w-full h-full overflow-auto">
        {members.map(member => (
          <div key={member.id} className="flex gap-[12px] items-center">
            <Image src={'/images/avatar.png'} width={24} height={24} alt="avatar" />
            <p>{member.nickname}</p>
            {member.role === 'MAIN' && (
              <Image src={'/images/novel-room-admin.svg'} width={16} height={16} alt="admin" />
            )}
            {chapterTexts &&
              chapterTexts?.length > 0 &&
              chapterTexts[chapterTexts.length - 1].authorName === member.nickname && (
                <Image src={'/images/pencil.svg'} width={12} height={18} alt="pencil" />
              )}
          </div>
        ))}
      </div>

      {/* <button className="w-full sticky bottom-0 left-0 bg-[#F8F8F8] py-[20px] text-center text-[#059EAF] text-[14px] font-[500] font-spoqa rounded-bl-[20px] rounded-br-[20px]">
        작가 순서 관리
      </button> */}
    </div>
  );
};

export default ContributerList;
