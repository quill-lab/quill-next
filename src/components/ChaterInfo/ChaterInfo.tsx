import { useQueryClient } from '@tanstack/react-query';
import { ReactElement, useState } from 'react';

import { config } from '@/config/config';
import { getNovelChapterList } from '@/fetch/get';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import { useUrlDatas } from '@/hooks/useUrlDatas';

import CusSelectBox from '../CusSelectBox/CusSelectBox';
import EpisodeListOneRow from '../EpisodeListOneRow/EpisodeListOneRow';
import st from './ChaterInfo.module.scss';

export default function ChaterInfo({ isShow = false }: { isShow: boolean }): ReactElement {
  const roomId = useUrlDatas<number>('room');
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const [selectListData, setSelectListData] = useState<string[]>(['첫화부터', '마지막화부터']);

  const { data: chapterList } = useQueryWrap({
    queryKey: [config.apiUrl.novelChapterList, page, roomId],
    queryFn: () => getNovelChapterList({ novelRoomId: roomId, page }),
  });
  // const chapterList = queryClient.getQueryData<GetNovelChaterListResponse>([
  //   config.apiUrl.novelChapterList,
  //   page,
  //   roomId,
  // ]);
  return (
    <div className={st.main} style={{ display: isShow ? 'flex' : 'none' }} aria-hidden={isShow}>
      <div className={st.main_list}>
        {/* select bar가 있는 영역 start */}
        <div className={st.main_list_selectBar}>
          <CusSelectBox data={selectListData} />
        </div>
        {/* select bar가 있는 영역 end */}

        {/* 회차정보 list column name bar start */}
        <div className={st.main_list_columnName}>
          <p className={st.main_list_episode}>회차</p>
          <p className={st.main_list_title}>제목</p>
          <p className={st.main_list_finalRetouchDate}>최종작성일</p>
          <p className={st.main_list_status}>상태</p>
          <p className={st.main_list_serialApprovalDate}>연재승인일</p>
          <p className={st.main_list_views}>조회수</p>
          <p className={st.main_list_commnents}>댓글</p>
          <p className={st.main_list_likes}>좋아요</p>
        </div>
        {/* 회차정보 list column name bar end */}

        {/* 회차정보 row start */}
        {chapterList?.data.map(i => (
          <EpisodeListOneRow key={i.id} {...i} />
        ))}
        {/* 회차정보 row end */}
        {/* {chapterList ? <PaginationBar type="white" {...chapterList?.meta} /> : null} */}
      </div>
    </div>
  );
}
