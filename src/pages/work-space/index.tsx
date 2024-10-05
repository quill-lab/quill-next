import Skeleton from '@mui/material/Skeleton';
import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import { useRouter } from 'next/router';

import { InformationText } from '@/components/InformationText/InformationText';
import { InformationTextType } from '@/components/InformationText/type';
import { NovelTable as Table } from '@/components/NovelTable/NovelTable';
import { NovelTabs } from '@/components';
import PageContentHeader from '@/components/PageContentHeader/PageContentHeader';
// import { Select } from '@/components/Select/Select';
import { config } from '@/config/config';
import { novelList } from '@/fetch/get';
import { NovelListResponse, RoomStatus } from '@/shared';
import useOnWheelHandle from '@/hooks/onWheelHandle';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import NovelPageHeaderBackground from '@/images/novel-page-header-background.svg';

import styles from './novel.module.scss';

const TAB_NAMES = ['참여중', '참여 신청'];

const WorkSpace = () => {
  const [page, setPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(TAB_NAMES[0]);
  const [roomState, setRoomStatus] = useState<RoomStatus>('attending');

  const wheelEvent = useOnWheelHandle(300);
  const router = useRouter();

  const { data, isSuccess } = useQueryWrap<NovelListResponse>({
    queryKey: ['api/novelList', roomState, page],
    queryFn: () => novelList({ roomState, page }),
  });

  const handleClickTab = (tab: string) => {
    if (currentTab === tab) return;

    setCurrentTab(tab);
    setRoomStatus(tab === TAB_NAMES[0] ? 'attending' : 'apptendApply');
    setPage(1);
  };

  const handleClickPagination = (page: number) => {
    setPage(page);
  };

  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 현재 연재중인 내 소설 공방이 있는지 검증
    const myWorkSpaces = data?.data.filter(res => res.writerCategory === 'host');
    // if (myWorkSpaces && myWorkSpaces.length > 1) {
    //   // TODO: 모달 추가
    //
    //   alert('소설공방 개설 횟수를 초과했습니다.');
    //   return;
    // }

    router.push('/work-space/create');
  };

  return (
    <div onWheel={wheelEvent}>
      <PageContentHeader
        backgroundColor="#9CE1E6"
        pageImage={NovelPageHeaderBackground}
        pageName="소설공방"
        summary1="동료 작가들과 함께 글을 써보세요"
      />
      <div className={styles.infoBar}>
        <div className={styles.roomCreateBtnBar}>
          <button
            type="button"
            onClick={handleClickButton}
            className={`white-btn ${styles.createBtn}`}
          >
            소설공방개설 +
          </button>
          <p>내가 대표 작가로 동료들을 모집하고 글을 쓸 수 있어요.</p>
        </div>
      </div>
      <main className={styles.main}>
        <div>
          <InformationText
            text="참여 중인 소설공방으로 입장 할 수 있습니다."
            type={InformationTextType.primary}
          />
          <div className={styles.novelContainer}>
            <div className={styles.novelHeader}>
              <NovelTabs
                tabs={TAB_NAMES}
                currentTab={currentTab}
                handleCurrentTab={handleClickTab}
              />
            </div>
            {/* {isLoading ?  : null} */}
            {!isSuccess &&
              Array(6)
                .fill(0)
                .map((item, index) => (
                  <Skeleton
                    key={item + index.toString()}
                    sx={{
                      width: '1200px',
                      height: '48px',
                      padding: '0px',
                      margin: '0px',
                    }}
                    animation="wave"
                  />
                ))}

            {isSuccess && <Table tab={roomState} tableData={data?.data ?? []} />}
          </div>
        </div>

        <Pagination
          innerClass="cus-pagination"
          itemClass="cus-pagination-li"
          activePage={page}
          itemsCountPerPage={config.pageSize}
          totalItemsCount={data?.meta?.totalCount ?? 0}
          pageRangeDisplayed={5}
          prevPageText="‹"
          nextPageText="›"
          onChange={pageNumber => handleClickPagination(pageNumber)}
        />
      </main>
    </div>
  );
};

export default WorkSpace;
