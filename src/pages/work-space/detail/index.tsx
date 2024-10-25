import { useEffect, useState } from 'react';

import ChapterInfo from '@/components/ChaterInfo/ChaterInfo';
import GenreBtn from '@/components/GenreBtn/GenreBtn';
import { NovelDefaultInfo, NovelChatManager } from '@/components';
import NovelJoinUserManager from '@/components/NovelJoinUserManager/NovelJoinUserManager';
import { NovelTabsGray } from '@/components/NovelTabsGray/NovelTabsGray';
import { WriterOrderManager } from '@/components';
import { config } from '@/config/config';
import { getNovelChapterList, getUser, novelJoinWriteList, novelRoomInfo } from '@/fetch/get';
import useOnWheelHandle from '@/hooks/onWheelHandle';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import useSocketIO from '@/hooks/useSocketIO';
import { useUrlDatas } from '@/hooks/useUrlDatas';
import { useNovelRoom } from '@/stores/useNovelRoom';
import NovelPublish from '@/components/modals/NovelPublish/NovelPublish';
import NovelChapterTitle from '@/components/modals/NovelChapterTitle/NovelChapterTitle';
import { useNovelChapter } from '@/stores/useChapter';
import { getNovelRoomStatus } from '@/shared/utils/get-enum-value';
import { useLoginUser } from '@/stores';

const PAGE_1 = '기본정보';
const PAGE_2 = '회차정보';
const PAGE_3 = '소설쓰기';
const PAGE_4 = '작가관리';

const tabList = [PAGE_1, PAGE_2, PAGE_3, PAGE_4];
// useChapterList 훅: 회차 정보 관리
const useChapterList = ({ page, roomId }: { page: number; roomId: number }) => {
  const novelRoom = useNovelRoom();
  const novelChapter = useNovelChapter();

  const { isSuccess, data } = useQueryWrap({
    queryKey: [config.apiUrl.novelChapterList, page, roomId],
    queryFn: () => getNovelChapterList({ novelRoomId: roomId, page }),
    enabled: !!roomId,
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

  const {
    data: loginUser,
    error: loginUserError,
    isSuccess,
  } = useQueryWrap({
    queryKey: [config.apiUrl.getUser],
    queryFn: () => getUser(),
  });

  const { setUser } = useLoginUser();

  useEffect(() => {
    if (loginUser?.data.id) {
      setUser({
        id: loginUser.data.id,
        email: loginUser.data.email,
        nickname: loginUser.data.nickname,
      });
    }
  }, [isSuccess, loginUser?.data.id]);

  // 회차 정보 훅 호출
  useChapterList({ page, roomId });

  // 소설 기본 정보 쿼리
  const { data: novelInfo, error: novelInfoError } = useQueryWrap({
    queryKey: [config.apiUrl.novelRoomInfo(roomId), roomId],
    queryFn: () => novelRoomInfo(roomId),
    enabled: !!roomId,
  });

  const { data: writerList } = useQueryWrap({
    queryKey: [config.apiUrl.novelJoinWriterList, roomId],
    queryFn: () => novelJoinWriteList(roomId),
    retryOnMount: false,
  });

  // 탭 변경 핸들러
  const handleCurrentTab = (tab: string) => {
    if (editMode && !window.confirm('편집을 종료하시겠습니까?')) return;
    setCurrentTab(tab);
    setEditMode(false);
  };

  // 소켓 연결
  useSocketIO({
    url: roomId ? `${config.wsLink}/room-${roomId}` : undefined,
    onChangeWriterSeq: res => console.log(res),
    onKickUser: res => console.log(res),
    onNewChat: res => console.log(res),
    onUpdateChat: res => console.log(res),
  });

  const isCurrentUserHost = writerList?.data.writers.some(
    writer => writer.id === loginUser?.data.id && writer.category === 'host'
  );

  if (!novelInfo) return <div>로딩 중...</div>;
  if (novelInfoError) return <div>에러가 발생했습니다.</div>;

  return (
    <div
      className="flex flex-col items-center w-full min-h-screen bg-cover bg-[url('/images/back-image.svg')] pb-[100px] overscroll-none"
      onWheel={wheelEvent}
    >
      <NovelPublish />
      <NovelChapterTitle />
      <div className="flex flex-row w-[1300px] mt-[7.9rem]">
        <WriterOrderManager isCurrentUserHost={isCurrentUserHost ?? false} />
        <div className="flex flex-col w-[996px] ml-10">
          <div
            className={`flex w-full min-h-[56px] rounded-[10px] ${
              editMode ? 'bg-white' : 'bg-white/50'
            } flex-row items-center justify-between p-4`}
          >
            <div className="flex flex-row items-end">
              <p className="text-gray-900 text-[18px] font-medium mr-6">{novelInfo.data.title}</p>
              <GenreBtn disabled={!editMode} category={novelInfo.data.category} />
            </div>
            <p className="text-gray-900 text-center text-[16px] font-medium">
              {getNovelRoomStatus(novelInfo.data.status || 'prepare')}
            </p>
          </div>
          <div className="mt-4">
            {/*TODO: tab component refactoring*/}
            <NovelTabsGray
              tabs={isCurrentUserHost ? [PAGE_1, PAGE_2, PAGE_3, PAGE_4] : [PAGE_1, PAGE_2, PAGE_3]}
              currentTab={currentTab}
              handleCurrentTab={handleCurrentTab}
            />
          </div>
          <NovelDefaultInfo isCurrentUserHost={isCurrentUserHost} isShow={currentTab === PAGE_1} />
          <ChapterInfo isShow={currentTab === PAGE_2} />
          <NovelChatManager isShow={currentTab === PAGE_3} />
          {isCurrentUserHost && <NovelJoinUserManager isShow={currentTab === PAGE_4} />}
        </div>
      </div>
    </div>
  );
};

export default WorkSpaceDetail;
