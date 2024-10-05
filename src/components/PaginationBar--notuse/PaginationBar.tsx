import { ReactElement, useState } from 'react';
import Pagination from 'react-js-pagination';

import st from './PaginationBar.module.scss';
import { PaginationBarProps } from './type';

export default function PaginationBar({
  type = 'white',
  chunkSize = 0,
  totalCount = 0,
  totalPage = 0,
}: PaginationBarProps): ReactElement {
  const [page, setPage] = useState<number>(1);
  return (
    <div className={`${st.pagination} ${type === 'dark' && st.paginationDark}`}>
      <Pagination
        // 현재 보고있는 페이지
        activePage={page}
        // 한페이지에 출력할 아이템수
        itemsCountPerPage={chunkSize}
        // 총 아이템수
        totalItemsCount={totalCount}
        // 표시할 페이지수
        pageRangeDisplayed={5}
        prevPageText="‹"
        nextPageText="›"
        activeLinkClass={st.colorRed}
        // 함수
        onChange={p => {
          setPage(p);
        }}
      />
    </div>
  );
}
