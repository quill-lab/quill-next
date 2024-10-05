import { ReactElement } from 'react';

import CusModal from '@/components/CusModal/CusModal';
import { config } from '@/config/config';
import { novelPublish } from '@/fetch/put';
import { useMutationWrap } from '@/hooks/reactQeuryWrapper';
import useNovelPublishModal from '@/stores/useNovelPublishModal';
import { useNovelRoom } from '@/stores/useNovelRoom';

import st from './NovelPublish.module.scss';

export default function NovelPublish(): ReactElement {
  const modal = useNovelPublishModal();
  const roomData = useNovelRoom();
  const novelPublishApi = useMutationWrap({
    mutationKey: [config.apiUrl.novelPublish(roomData.lastChapterId)],
    mutationFn: novelPublish,
    onSuccess() {
      // todo
      modal.hide();
    },
  });
  if (!modal.isShow) {
    return <> </>;
  }
  return (
    <CusModal>
      <div className={st.contents}>
        <p className={st.contents_title}>연재 신청하기</p>
        <p>연재 시 독자에게 공개됩니다</p>

        {/* bottom button start */}
        <div className={st.contents_btnBox}>
          <button
            onClick={() => {
              novelPublishApi.mutate({ chapterId: roomData.lastChapterId });
            }}
            type="button"
          >
            연재하기
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
        {/* bottom button end */}
      </div>
    </CusModal>
  );
}
