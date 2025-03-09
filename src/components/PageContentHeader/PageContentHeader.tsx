import Image from 'next/image';
import React, { ReactElement } from 'react';

import st from './PageContentHeader.module.scss';
import { PageContentHeaderProps } from './type';

const PageContentHeader = ({
  backgroundColor,
  pageImage,
  pageName,
  summary1,
  summary2,
}: PageContentHeaderProps): ReactElement => (
  <header style={{ backgroundColor }} className={st.header}>
    <div className={st.contentBox}>
      <div className={st.textContent}>
        <p className={`${st.pageName} font-hakgyoansim`}>{pageName}</p>
        <p className={`${st.summary1} font-hakgyoansim`}>{summary1}</p>
        {summary2 && <p className={`${st.summary2} font-hakgyoansim`}>{summary2}</p>}
      </div>
      <div>
        <Image src={pageImage} priority alt="소설 썸네일" />
      </div>
    </div>
  </header>
);

export default PageContentHeader;
