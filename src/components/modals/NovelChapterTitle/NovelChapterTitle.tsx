import { ChangeEvent, ReactElement, useState } from 'react';

import CusModal from '@/components/CusModal/CusModal';
import { config } from '@/config/config';
import { novelChapterTitle, novelPublish } from '@/fetch/put';
import { useMutationWrap } from '@/hooks/reactQeuryWrapper';
import st from './NovelTitle.module.scss';

import { useNovelChapter, useNovelRoom, useNovelTitleModal } from '@/stores/';

export default function NovelChapterTitle() {
  const [chapterTitle, setChapterTitle] = useState('');

  const modal = useNovelTitleModal();
  const roomData = useNovelRoom();
  const novelChapter = useNovelChapter();
  const novelTitleApi = useMutationWrap({
    mutationKey: [config.apiUrl.novelChapterTitle(roomData.lastChapterId)],
    mutationFn: novelChapterTitle,
    onSuccess() {
      // todo
      modal.hide();
    },
  });

  const handleChapterTitle = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setChapterTitle(e.target.value);
    novelChapter.setChapterTitle(e.target.value);
  };

  if (!modal.isShow) {
    return null;
  }

  return (
    <CusModal>
      <div className={st.contents}>
        <p className={st.contents_title}>회차 제목 수정하기</p>
        <p>수정할 제목을 작성해주세요</p>
        <input value={chapterTitle} onChange={handleChapterTitle} />
        <div className={st.contents_btnBox}>
          <button
            onClick={() => {
              if (!chapterTitle) return;
              novelTitleApi.mutate({
                chapterId: roomData.lastChapterId,
                title: chapterTitle,
              });
            }}
            type="button"
          >
            수정하기
          </button>
          <button
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
}
