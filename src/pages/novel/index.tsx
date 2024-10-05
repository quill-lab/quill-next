import { useState } from 'react';

import HorizonCategoryList from '@/components/HorizonCategoryList/HorizonCategoryList';
import NovelAllList from '@/components/NovelAllList/NovelAllList';
import { NovelTabsGreen } from '@/components/NovelTabsGreen/NovelTabsGreen';
import { TopFiveCardProp } from '@/components/TopFiveCard/type';
import TopFiveCardList from '@/components/TopFiveCardList/TopFiveCardList';

import st from './novel.module.scss';

const PAGE_1 = '전체';
const PAGE_2 = '연재중';
const PAGE_3 = '완결';

const CATE_1 = '일반소설';
const CATE_2 = '로맨스/드라마';
const CATE_3 = '코믹';
const CATE_4 = '시/수필/에세이';
const CATE_5 = '판타지/SF';
const CATE_6 = '퓨전';
const CATE_7 = '액션/무협';
const CATE_8 = '스포츠/학원';
const CATE_9 = '공포/추리';
const topL = [
  {
    leader: '쌉쌀라만',
    member: 2,
    status: true,
    title: '재벌집 아이들1',
  },
  {
    leader: '쌉쌀라만',
    member: 2,
    status: true,
    title: '재벌집 아이들2',
  },
  {
    leader: '쌉쌀라만',
    member: 2,
    status: true,
    title: '재벌집 아이들3',
  },
  {
    leader: '쌉쌀라만',
    member: 2,
    status: true,
    title: '재벌집 아이들4',
  },
  {
    leader: '쌉쌀라만',
    member: 2,
    status: true,
    title: '재벌집 아이들5',
  },
];
const allL = [
  {
    leader: '쌉쌀라만',
    member: 2,
    status: true,
    title: '재벌집 아이들1',
  },
  {
    leader: '쌉쌀라만',
    member: 2,
    status: true,
    title: '재벌집 아이들2',
  },
  {
    leader: '쌉쌀라만',
    member: 2,
    status: true,
    title: '재벌집 아이들3',
  },
  {
    leader: '쌉쌀라만',
    member: 2,
    status: true,
    title: '재벌집 아이들4',
  },
  {
    leader: '쌉쌀라만',
    member: 2,
    status: true,
    title: '재벌집 아이들5',
  },
  {
    leader: '쌉쌀라만',
    member: 2,
    status: true,
    title: '재벌집 아이들6',
  },
  {
    leader: '쌉쌀라만',
    member: 2,
    status: true,
    title: '재벌집 아이들7',
  },
  {
    leader: '쌉쌀라만',
    member: 2,
    status: true,
    title: '재벌집 아이들8',
  },
  {
    leader: '쌉쌀라만',
    member: 2,
    status: true,
    title: '재벌집 아이들9',
  },
  {
    leader: '쌉쌀라만',
    member: 2,
    status: true,
    title: '재벌집 아이들10',
  },
];
export default function NovelList() {
  const [tabList, setTabList] = useState<string[]>([PAGE_1, PAGE_2, PAGE_3]);
  const [currentTab, setCurrentTab] = useState(tabList[0]);

  const [top5, setTop5] = useState<TopFiveCardProp[]>(topL);
  const [allList, setAllList] = useState<TopFiveCardProp[]>(allL);
  const [cateList, setCateList] = useState<string[]>([
    CATE_1,
    CATE_2,
    CATE_3,
    CATE_4,
    CATE_5,
    CATE_6,
    CATE_7,
    CATE_8,
    CATE_9,
  ]);

  return (
    <div className={st.main}>
      <div className={st.main_center}>
        <div>
          <NovelTabsGreen
            currentTab={currentTab}
            handleCurrentTab={e => {
              setCurrentTab(e);
            }}
            tabs={tabList}
          />
        </div>

        {currentTab === PAGE_1 ? (
          <>
            <TopFiveCardList listModifier="실시간 전체" listTitle="일반소설" datas={top5} />

            <TopFiveCardList listModifier="작가의 정원" listTitle="진작 소설" datas={top5} />
          </>
        ) : null}

        {currentTab === PAGE_2 ? (
          <>
            <div />
            <HorizonCategoryList categoryNames={cateList} />

            <NovelAllList listModifier="작가의 정원" listTitle="진작 소설" datas={allList} />
          </>
        ) : null}

        {currentTab === PAGE_3 ? (
          <>
            <div />
            <HorizonCategoryList categoryNames={cateList} />

            <NovelAllList listModifier="작가의 정원" listTitle="진작 소설" datas={allList} />
          </>
        ) : null}
      </div>
    </div>
  );
}
