import { ReactElement, useEffect, useState } from 'react';

import ChaterInfo from '@/components/ChaterInfo/ChaterInfo';
import GenreBtn from '@/components/GenreBtn/GenreBtn';
import { NovelDefaultInfo, NovelChatManager } from '@/components';
import NovelJoinUserManager from '@/components/NovelJoinUserManager/NovelJoinUserManager';
import { NovelTabsGray } from '@/components/NovelTabsGray/NovelTabsGray';
import WriterManagerBox from '@/components/WriterManagerBox/WriterManagerBox';
import { config } from '@/config/config';
import { getNovelChapterList, novelRoomInfo } from '@/fetch/get';
import useOnWheelHandle from '@/hooks/onWheelHandle';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import useSocketIO from '@/hooks/useSocketIO';
import { useUrlDatas } from '@/hooks/useUrlDatas';
import { useNovelRoom } from '@/stores/useNovelRoom';
import NovelPublish from '@/components/modals/NovelPublish/NovelPublish';
import st from './detail.module.scss';
import NovelChapterTitle from '@/components/modals/NovelChapterTitle/NovelChapterTitle';
import { useNovelChapter } from '@/stores/useChapter';
import { getNovelRoomStatus } from '@/shared/utils/get-enum-value';

const PAGE_1 = '기본정보';
const PAGE_2 = '회차정보';
const PAGE_3 = '소설쓰기';
const PAGE_4 = '작가관리';

const tabList = [PAGE_1, PAGE_2, PAGE_3, PAGE_4];

const useChapterList = ({ page, roomId }: { page: number; roomId: number }) => {
  const novelRoom = useNovelRoom();
  const novelChapter = useNovelChapter();
  const { isSuccess, data } = useQueryWrap({
    queryKey: [config.apiUrl.novelChapterList, page, roomId],
    queryFn: () => getNovelChapterList({ novelRoomId: roomId, page }),
  });

  useEffect(() => {
    if (!isSuccess || !data || data.data.length === 0) return;

    // 상태가 변경되지 않았을 때는 업데이트하지 않음
    if (novelRoom.lastChapterId !== data.data[0].id) {
      novelRoom.setLastChapterId(data.data[0].id);
    }

    if (novelChapter.title !== data.data[0].title) {
      novelChapter.setChapterTitle(data.data[0].title);
    }
  }, [isSuccess, data, novelRoom, novelChapter]);
};

const WorkSpaceDetail = () => {
  const wheelEvent = useOnWheelHandle(300);
  const [page, setPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(tabList[0]);
  const [editMode, setEditMode] = useState(false);

  const roomId = useUrlDatas<number>('room');
  useChapterList({ page, roomId });

  const { data: novelInfo, error: novelInfoError } = useQueryWrap({
    queryKey: [config.apiUrl.novelRoomInfo(roomId), roomId],
    queryFn: () => novelRoomInfo(roomId),
  });

  const handleCurrentTab = (tab: string) => {
    if (editMode && !window.confirm('편집을 종료하시겠습니까?')) return;
    setCurrentTab(tab);
    setEditMode(false);
  };

  useSocketIO({
    url: `${config.wsLink}/room-${roomId}`,
    onChangeWriterSeq: res => {
      console.log(res);
    },
    onKickUser: res => {
      console.log(res);
    },
    onNewChat: res => {
      console.log(res);
    },
    onUpdateChat: res => {
      console.log(res);
    },
  });

  if (!novelInfo) return <div>로딩 중...</div>;
  if (novelInfoError) return <div>에러가 발생했습니다.</div>;

  return (
    <div className={st.mainBody} onWheel={wheelEvent}>
      <NovelPublish />
      <NovelChapterTitle />
      <div className={st.mainBody_content}>
        <WriterManagerBox />
        <div className={st.mainBody_content_column}>
          <div className={`${st.mainBody_content_title} ${editMode ? st.on : ''}`}>
            <div className={st.content_row}>
              <p className={st.content_text}>{novelInfo.data.title}</p>
              <GenreBtn disabled={!editMode} category={novelInfo.data.category} />
            </div>
            <p className={st.content_status}>
              {getNovelRoomStatus(novelInfo.data.status || 'prepare')}
            </p>
          </div>
          <div className={st.mainBody_tab}>
            <NovelTabsGray
              tabs={tabList}
              currentTab={currentTab}
              handleCurrentTab={handleCurrentTab}
            />
          </div>
          <NovelDefaultInfo isShow={currentTab === PAGE_1} />
          <ChaterInfo isShow={currentTab === PAGE_2} />
          <NovelChatManager isShow={currentTab === PAGE_3} />
          <NovelJoinUserManager isShow={currentTab === PAGE_4} />
        </div>
      </div>
    </div>
  );
};

export default WorkSpaceDetail;
