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
import { NovelItem, NovelListResponse, RoomStatus } from '@/shared';
import useOnWheelHandle from '@/hooks/onWheelHandle';
import NovelPageHeaderBackground from '@/images/novel-page-header-background.svg';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import dayjs from 'dayjs';

const TAB_NAMES = ['참여', '참여 신청'];

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
    router.push(`/work-space?page=${page}&size=${config.pageSize}&sort=OLDEST`);
  };

  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push('/work-space/create');
  };

  return (
    <div onWheel={wheelEvent} className="w-full">
      <div className="block sm:hidden">
        <PageContentHeader
          backgroundColor="#9CE1E6"
          pageImage={NovelPageHeaderBackground}
          pageName="소설공방"
          summary1={`동료 작가들과 함께\n글을 써보세요`}
        />
      </div>
      <div className="hidden sm:block">
        <PageContentHeader
          backgroundColor="#9CE1E6"
          pageImage={NovelPageHeaderBackground}
          pageName="소설공방"
          summary1="동료 작가들과 함께 글을 써보세요"
        />
      </div>

      {/* desktop */}
      <div className="hidden sm:block flex items-center bg-[#1C8D99] py-[18px]">
        <div className="flex items-center w-full justify-between">
          <div className="w-full" />
          <div className="w-full flex justify-center">
            <button
              type="button"
              onClick={handleClickButton}
              className="flex items-center justify-center py-[13px] px-[48px] white-btn"
            >
              소설공방개설 +
            </button>
          </div>
          <p className="text-white text-base font-medium w-full">
            내가 대표 작가로 동료들을 모집하고 글을 쓸 수 있어요.
          </p>
        </div>
      </div>

      {/* mobile */}
      <div className="sm:hidden flex flex-col gap-[16px] items-center bg-[#1C8D99] py-[16px]">
        <button
          type="button"
          onClick={handleClickButton}
          className="flex items-center justify-center py-[13px] px-[48px] white-btn"
        >
          소설공방개설 +
        </button>
        <p className="text-[white] text-center text-[16px] font-[500] w-full">
          내가 대표 작가로 동료들을 모집하고
          <br />
          글을 쓸 수 있어요.
        </p>
      </div>

      <main className="flex w-full flex-col items-center pt-[50px]">
        <div className="w-full max-w-[1200px]">
          <InformationText
            text="참여 중인 소설공방으로 입장 할 수 있습니다."
            type={InformationTextType.primary}
          />
          <div className="mt-4">
            <div className="flex justify-between">
              <NovelTabs
                tabs={TAB_NAMES}
                currentTab={currentTab}
                handleCurrentTab={handleClickTab}
              />
            </div>
            {/* <Table tab={roomState} tableData={items ?? []} /> */}

            <div className="flex flex-wrap gap-[24px] mt-[24px]">
              {items.length > 0 ? (
                items.map(item => (
                  <div
                    className="flex cursor-pointer justify-center items-center rounded-[10px] border border-[0.6px] border-[#D9D9D9] overflow-hidden"
                    style={{ boxShadow: '0px 4px 6px 0px rgba(63, 63, 63, 0.25)' }}
                    onClick={() => router.push(`/work-space/detail/${item.id}/info`)}
                  >
                    <div className="relative w-[174px] h-full">
                      <Image src={'/images/book-cover-1.png'} fill alt="book cover" />
                    </div>
                    <div className="w-full py-[16px] px-[16px] gap-[60px] flex flex-col">
                      <div className="w-full flex flex-col gap-[24px]">
                        <div className="w-full flex justify-between items-center">
                          <p className="w-full text-[#059EAF] text-[14px] font-spoqa text-[14px] font-[500]">
                            {'연재중'}
                          </p>
                          <p className="w-full text-[#959595] text-[14px] font-spoqa font-[500]">
                            {item.category.alias}
                          </p>
                        </div>
                        <div>
                          <h3 className="w-full text-[#2D2D2D] text-[20px] font-[700] font-spoqa">
                            {item.title}
                          </h3>
                          <p className="w-full mt-[4px] text-[#959595] font-spoqa text-[14px] font-[500]">
                            {item.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-[4px] max-w-[154px]">
                        <div className="py-[8px] px-[24px] flex justify-between items-center rounded-[100px] border border-[0.6px] border-[#059EAF] text-[12px] text-[#059EAF] font-[500] font-spoqa">
                          <p>개설일</p>
                          <p>{dayjs(item.createdAt).format('YYYY.M.D')}</p>
                        </div>
                        <div className="py-[8px] px-[36px] flex justify-between items-center rounded-[100px] border border-[0.6px] border-[#059EAF] text-[12px] text-[#059EAF] font-[500] font-spoqa">
                          <p>정원</p>
                          <p>
                            {item.contributorCount}/{item.maxContributorCount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <Pagination
          innerClass="cus-pagination"
          itemClass="cus-pagination-li"
          activePage={page + 1}
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
