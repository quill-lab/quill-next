'use client';

import ChapterItem from '@/components/molecules/ChapterItem';
import { ChapterText, DraftText } from '@/shared/interface/chapter';
import { useSession } from 'next-auth/react';

interface ChapterItemListProps {
  chapter: ChapterText[];
  draftText: DraftText;
}

const ChapterItemList = ({ chapter, draftText }: ChapterItemListProps) => {
  const { data: session } = useSession();

  return (
    <div className="w-full mt-[10px] flex flex-col gap-[16px] rounded-[10px] shadow-[0px 4px 4px 0px rgba(0, 0, 0, 0.25)] bg-[rgba(255, 255, 255, 0.50)]">
      {chapter.length ? (
        chapter.map((item, index) => {
          return (
            <ChapterItem
              key={item.id}
              text={item.content}
              mine={item.authorName === session?.user?.name}
              isEdited={item.authorName === session?.user?.name && index === chapter.length - 1}
            />
          );
        })
      ) : (
        <ChapterItem draftText={draftText} isEdited />
      )}

      {/* 작성 차례일 때만 보이게 할 컴포넌트 */}
      {(chapter.length === 0 || chapter[chapter.length - 1].authorName === session?.user?.name) && (
        <div>{/* 여기에 작성 차례일 때만 보여줄 컴포넌트 추가 */}</div>
      )}
    </div>
  );
};

export default ChapterItemList;
