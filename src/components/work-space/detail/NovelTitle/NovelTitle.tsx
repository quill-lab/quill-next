'use client';

import { NovelGenreButton } from '@/components/work-space/detail/NovelTitle/NovelGenreButton';
import { Categorys, NovelRoomStatus } from '@/shared';
import { getNovelRoomStatus } from '@/shared/utils/get-enum-value';

type NovelTitleProps = {
  title: string;
  status: NovelRoomStatus;
  category: Categorys;
  editMode: boolean;
};

export const NovelTitle = ({ title, status, category, editMode }: NovelTitleProps) => {
  return (
    <div
      className={`flex w-full h-14 rounded-[10px] ${
        editMode ? 'bg-white' : 'bg-white/50'
      } flex-row items-center justify-between py-4 px-8 rounded-[10px]`}
    >
      <div className="flex gap-3 items-baseline">
        <p className="text-lg font-medium text-black1">{title}</p>
        <p className={'text-xs  font-medium text-black1'}>{category?.name || ''}</p>
        <NovelGenreButton disabled={!editMode} category={category} />
      </div>
      <p className="text-gray-900 text-center text-[16px] font-medium">
        {getNovelRoomStatus(status || 'prepare')}
      </p>
    </div>
  );
};
