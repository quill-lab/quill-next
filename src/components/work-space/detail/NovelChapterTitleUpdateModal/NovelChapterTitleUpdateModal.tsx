import { ChangeEvent, useState } from 'react';

import CusModal from '@/components/CusModal/CusModal';
import { config } from '@/config/config';
import { novelChapterTitle } from '@/fetch/put';
import { useMutationWrap } from '@/hooks/reactQeuryWrapper';
import { useNovelChapter, useNovelRoom, useNovelTitleModal } from '@/stores';

export const NovelChapterTitleUpdateModal = () => {
  const [chapterTitle, setChapterTitle] = useState('');

  const modal = useNovelTitleModal();
  const roomData = useNovelRoom();
  const novelChapter = useNovelChapter();
  const novelTitleApi = useMutationWrap({
    mutationKey: [config.apiUrl.novelChapterTitle(roomData.lastChapterId)],
    mutationFn: novelChapterTitle,
    onSuccess() {
      modal.hide();
    },
  });

  if (!modal.isShow) {
    return;
  }

  const handleChapterTitle = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setChapterTitle(e.target.value);
    novelChapter.setChapterTitle(e.target.value);
  };

  const handleClickUpdateTitle = () => {
    if (!chapterTitle) return;

    novelTitleApi.mutate({
      chapterId: roomData.lastChapterId,
      title: chapterTitle,
    });
  };

  return (
    <CusModal>
      <div className="w-96 h-60 flex flex-col items-center">
        <p className="text-black text-center text-lg font-medium mt-12">회차 제목 수정하기</p>
        <p className="mt-4 text-gray-400 text-center text-sm font-normal ">
          수정할 제목을 작성해주세요
        </p>
        <input
          className="w-1/2 mt-4 border border-gray-300 bg-white rounded-md h-12 px-4"
          value={chapterTitle}
          onChange={handleChapterTitle}
        />
        <div className="flex flex-row justify-between w-96 h-12 mt-auto">
          <button
            className="w-1/2 border-none text-gray-600 text-center text-base font-medium bg-white border border-gray-300 cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 rounded-bl-md"
            onClick={handleClickUpdateTitle}
            type="button"
          >
            수정하기
          </button>
          <button
            className="w-1/2 border-none text-gray-600 text-center text-base font-medium bg-white border border-gray-300 cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 rounded-br-md"
            onClick={() => {
              modal.hide();
            }}
            type="button"
          >
            취소
          </button>
        </div>
      </div>
    </CusModal>
  );
};
