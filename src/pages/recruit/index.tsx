import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';
import Pagination from 'react-js-pagination';

import PageContentHeader from '@/components/PageContentHeader/PageContentHeader';
import { RecruitmentTable } from '@/components';
import { config } from '@/config/config';
import { getWriterWantedList } from '@/fetch/get';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import NovelPageHeaderBackground from '@/images/novel-page-header-background.svg';

import styles from './recruite.module.scss';

export const recruitmentFilters = ['전체', '모집중', '모집완료'];

const RecruitmentPage = () => {
  const router = useRouter();
  const [filter, setFilter] = useState<string>(recruitmentFilters[1]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const { data: recruitment, isLoading } = useQueryWrap({
    queryKey: [config.apiUrl.getWriterWantedList, page],
    queryFn: () => getWriterWantedList({ page }),
  });

  const handleNovelFilter = (selectedItem: string) => {
    setFilter(selectedItem);
  };

  const handleTableItem = () => {
    // router.push(`/recruit/${tableItem.id}`);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmitSearch = () => {
    console.log(search);
  };

  return (
    <div>
      <PageContentHeader
        backgroundColor="#9CE1E6"
        pageImage={NovelPageHeaderBackground}
        pageName="소설공방"
        summary1="동료 작가들과 함께 글을 써보세요"
      />

      <main className={styles.main}>
        <div className={styles.recruitmentContainer}>
          <div className={styles.recruitmentSearchContainer}>
            {/* <SearchInput
              handleSearch={handleSearch}
              handleSubmitSearch={handleSubmitSearch}
              search={search}
            /> */}
          </div>
          {/* <div className={styles.recruitmentHeader}>
            <Select
              selectedItem={filter}
              options={recruitmentFilters}
              handleSelectedItem={handleNovelFilter}
            />
          </div> */}
          <RecruitmentTable data={recruitment?.data ?? []} isLoading={isLoading} />
        </div>

        <Pagination
          innerClass="cus-pagination"
          itemClass="cus-pagination-li"
          activePage={page}
          itemsCountPerPage={config.pageSize}
          totalItemsCount={recruitment?.meta?.totalCount ?? 0}
          pageRangeDisplayed={6}
          prevPageText="‹"
          nextPageText="›"
          onChange={n => {
            setPage(n);
          }}
        />
      </main>
    </div>
  );
};

export default RecruitmentPage;
