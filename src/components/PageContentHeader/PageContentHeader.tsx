import Image from 'next/image';
import React, { ReactElement } from 'react';
import { PageContentHeaderProps } from './type';

const PageContentHeader = ({
  backgroundColor,
  pageImage,
  pageName,
  summary1,
  summary2,
}: PageContentHeaderProps): ReactElement => (
  <header
    style={{ backgroundColor }}
    className="flex flex-col items-center justify-end w-full px-[16px]"
  >
    <div className="block sm:hidden mt-[20px]">
      <Image src={pageImage} priority alt="소설 썸네일" />
    </div>
    <div className="flex flex-row items-end justify-between h-[14rem] mb-8">
      <div className="flex flex-col">
        <p className="text-white text-[24px] font-[400] font-normal font-hakgyoansim">{pageName}</p>
        <p className="text-white text-[40px] font-[700] sm:font-[400] font-hakgyoansim">
          {summary1}
        </p>
        {summary2 && (
          <p className="text-white text-[2.5rem] font-normal font-hakgyoansim">{summary2}</p>
        )}
      </div>
      <div className="hidden sm:block">
        <Image src={pageImage} priority alt="소설 썸네일" />
      </div>
    </div>
  </header>
);

export default PageContentHeader;
