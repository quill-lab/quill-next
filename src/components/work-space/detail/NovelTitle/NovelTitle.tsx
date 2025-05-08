'use client';

import { Categorys, NovelRoomStatus } from '@/shared';
import { getNovelRoomStatus } from '@/shared/utils/get-enum-value';
import { useNovelRoom } from '@/stores';

type NovelTitleProps = {
  title: string;
  status: NovelRoomStatus;
  category: Categorys;
};

export const NovelTitle = ({ title, status, category }: NovelTitleProps) => {
  const { editMode, setEditTitle } = useNovelRoom();

  return (
    <div
      className={`flex w-full h-14 rounded-[10px] flex-row items-center justify-between py-4 px-8 rounded-[10px] bg-white/50`}
    >
      <div className="flex gap-3 items-baseline">
        {editMode ? (
          <input
            type="text"
            defaultValue={title}
            onChange={e => setEditTitle(e.target.value)}
            className="w-full bg-[transparent] border border-[1px] px-[4px]"
          />
        ) : (
          <p className="text-lg font-medium text-black1">{title}</p>
        )}

        <p className={'text-xs  font-medium text-black1'}>{category?.alias || ''}</p>
      </div>
      <p className="text-gray-900 text-center text-[16px] font-medium">
        {getNovelRoomStatus(status || 'prepare')}
      </p>
    </div>
  );
};
