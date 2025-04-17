'use client';

import RecruitCard from '@/components/molecules/RecruitCard';
import { useRouter } from 'next/navigation';
import React from 'react';
import Pagination from 'react-js-pagination';

interface RecruitCardListProps {
  recruitCardList: IRecruitCard[];
}

const RecruitCardList = ({ recruitCardList }: RecruitCardListProps) => {
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
        {recruitCardList.map(recruitCard => (
          <RecruitCard
            recruitData={{
              id: recruitCard.id,
              created_at: recruitCard.created_at,
              title: recruitCard.title,
              content: recruitCard.content,
              link: recruitCard.link,
              like: recruitCard.like,
              view: recruitCard.view,
              author: recruitCard.author,
              contributor_group: recruitCard.contributor_group,
            }}
          />
        ))}
      </div>
      <Pagination
        innerClass="cus-pagination"
        itemClass="cus-pagination-li"
        activePage={page + 1}
        itemsCountPerPage={pageSize}
        totalItemsCount={recruitCardList.length}
        pageRangeDisplayed={6}
        prevPageText="‹"
        nextPageText="›"
        onChange={pageNumber => handleClickPagination(pageNumber)}
      />
    </div>
  );
};

export default RecruitCardList;
