'use client';

import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import { useRouter } from 'next/navigation';

import { InformationText } from '@/components/InformationText/InformationText';
import { InformationTextType } from '@/components/InformationText/type';
import { NovelTable as Table } from '@/components/NovelTable/NovelTable';
import { NovelTabs } from '@/components';
import PageContentHeader from '@/components/PageContentHeader/PageContentHeader';
import { config } from '@/config/config';
import { novelList } from '@/fetch/get';
import { NovelItem, NovelListResponse, RoomStatus } from '@/shared';
import useOnWheelHandle from '@/hooks/onWheelHandle';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import NovelPageHeaderBackground from '@/images/novel-page-header-background.svg';

import styles from './novel.module.scss';
import { useSession } from 'next-auth/react';

const TAB_NAMES = ['참여중', '참여 신청'];

interface WordSpaceProps {
  items: NovelItem[];
  totalCount: number;
  size: number;
  page: number;
}

const WorkSpace = ({ items, totalCount, size, page }: WordSpaceProps) => {
  const [currentTab, setCurrentTab] = useState(TAB_NAMES[0]);
  const [roomState, setRoomStatus] = useState<RoomStatus>('attending');
  const wheelEvent = useOnWheelHandle(300);
  const router = useRouter();
  const { data: session } = useSession();

  const handleClickTab = (tab: string) => {
    // if (currentTab === tab) return;
    // setCurrentTab(tab);
    // setRoomStatus(tab === TAB_NAMES[0] ? 'attending' : 'apptendApply');
    // setPage(1);
  };

  const handleClickPagination = (page: number) => {
    // setPage(page);
  };

  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push('/work-space/create');
  };

  return (
    <div onWheel={wheelEvent} className="w-full">
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
            {/* {!isSuccess &&
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
                ))} */}

            <Table tab={roomState} tableData={items ?? []} />
          </div>
        </div>

        <Pagination
          innerClass="cus-pagination"
          itemClass="cus-pagination-li"
          activePage={page}
          itemsCountPerPage={config.pageSize}
          totalItemsCount={totalCount ?? 0}
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
