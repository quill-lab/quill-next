'use client';

import RecruitCard from '@/components/molecules/RecruitCard';
import { useRouter } from 'next/navigation';
import React from 'react';
import Pagination from 'react-js-pagination';

interface RecruitCardListProps {}

const RecruitCardList = ({}: RecruitCardListProps) => {
  const router = useRouter();
  const pageSize = 6;

  // mockData
  const totalCount = 8;
  const page = 0;
  const handleClickPagination = (pageNumber: number) => {
    router.push(`/recruit?page=${pageNumber}`);
  };

  return (
    <div>
      <div className="w-full grid grid-cols-2 gap-x-4 gap-y-6 place-items-center">
        <RecruitCard />
        <RecruitCard />
        <RecruitCard />
        <RecruitCard />
        <RecruitCard />
        <RecruitCard />
      </div>
      <Pagination
        innerClass="cus-pagination"
        itemClass="cus-pagination-li"
        activePage={page + 1}
        itemsCountPerPage={pageSize}
        totalItemsCount={totalCount ?? 0}
        pageRangeDisplayed={5}
        prevPageText="‹"
        nextPageText="›"
        onChange={pageNumber => handleClickPagination(pageNumber)}
      />
    </div>
  );
};

export default RecruitCardList;
