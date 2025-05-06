import NovelChapter from '@/components/molecules/NovelChapter';
import NovelTag from '@/components/molecules/NovelTag';
import NovelTagSection from '@/components/organisms/NovelTagSection';
import { PageHeader } from '@/components/PageHeader/PageHeader';
import { NovelItem } from '@/shared';
import { Chapter } from '@/shared/interface/chapter';
import Image from 'next/image';
import React from 'react';

interface NovelTemplateProps {
  episodes: Chapter[];
  novelInfo: NovelItem;
  authorList: { role: string; name: string }[];
}

const NovelTemplate = ({ episodes, novelInfo, authorList }: NovelTemplateProps) => {
  const convertAuthorListForView = (authorList: { role: string; name: string }[]) => {
    const mainAuthor = authorList.find(author => author.role === 'MAIN');
    return `${mainAuthor?.name} 외${authorList.length}명`;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="max-w-[1308px] w-full">
        <PageHeader />
      </div>

      <div className="w-full max-w-[792px]">
        <div className="w-full h-[288px] w-full mt-[32px] flex items-center gap-[24px]">
          <div className="w-full h-full rounded-[20px] overflow-hidden relative">
            <Image src={'/images/book-cover-1.png'} fill alt="book cover" />
          </div>
          <div className="w-full h-full flex flex-col justify-between">
            <div>
              <p className="text-[#1CB09E] text-[16px] font-[500]">연재중</p>
              <h2 className="text-[#2D2D2D] text-[32px] font-[700] mt-[4px]">{novelInfo.title}</h2>
              <div className="mt-[4px] flex items-center gap-[16px]">
                <div className="flex items-center gap-[4px] text-[#2D2D2D] text-[14px] font-[400]">
                  <Image src={'/images/view-icon.svg'} width={23} height={14} alt="view icon" />
                  <p>233</p>
                </div>
                <div className="flex items-center gap-[4px] text-[#2D2D2D] text-[14px] font-[400]">
                  <Image src={'/images/like-icon.svg'} width={16} height={14} alt="view icon" />
                  <p>100</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[#959595] text-[14px] font-[500]">
                {convertAuthorListForView(authorList)}
              </p>
              <p className="mt-[8px] text-[#2D2D2D] text-[14px] font-[700]">한줄소개</p>
              <p className="text-[#959595] text-[14px] font-[500]">{novelInfo.synopsis}</p>
              <div className="mt-[8px]">
                <NovelTagSection />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-[44px] pb-[120px]">
          <div className="w-full flex justify-between items-center">
            <div className="px-[68px] py-[16px] rounded-tl-[20px] rounded-tr-[20px] bg-[#059EAF] text-[#fff] flex justify-center items-center text-[14px] font-[500]">
              회차 정보
            </div>
            <div className="py-[8px] px-[20px] rounded-[100px] bg-[#FAFAFA] flex items-center gap-[4px]">
              <p className="text-[#2D2D2D] text-[12px] font-[500]">첫화부터</p>
              <Image src={'/images/tool-tip-novel.svg'} width={10} height={8} alt="tool tip" />
            </div>
          </div>
          {episodes.map(episode => (
            <NovelChapter
              key={episode.id}
              id={episode.id}
              title={episode.title}
              chapterNubmer={episode.episode}
              view={episode.metadata.viewCount}
              like={episode.metadata.likeCount}
              comment={episode.metadata.commentCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NovelTemplate;
