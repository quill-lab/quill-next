import Image from 'next/image';
import React, { KeyboardEvent } from 'react';

import SearchIconPrimary from '@/images/search-icon-primary.svg';

import styles from './SearchInput.module.scss';
import { SearchInputProps } from './type';

export const SearchInput = ({
  handleSearch,
  handleSubmitSearch,
  search,
  style,
}: SearchInputProps) => {
  const handleEnterSearch = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSubmitSearch();
    }
  };

  const handleClickSearchButton = (): void => {
    handleSubmitSearch();
  };
  return (
    <div className={`${styles.recruitmentSearchWrap} ${style}`}>
      <input
        value={search}
        onChange={handleSearch}
        onKeyDown={e => handleEnterSearch(e)}
        placeholder="검색어를 입력해주세요."
      />
      <button type="button" onClick={handleClickSearchButton}>
        <Image src={SearchIconPrimary} alt="작가의 정원 전체 검색" />
      </button>
    </div>
  );
};
