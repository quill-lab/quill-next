import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';

import Logo from '@/images/login-logo.svg';
import useWheelState from '@/stores/useWheelState';

import { Notice } from '../Notice/Notice';
import { SearchInput } from '../SearchInput/SearchInput';
import styles from './PageHeader.module.scss';
import { storageKey } from '@/constants';
import { useRouter } from 'next/router';

export const PageHeader = () => {
  const [search, setSearch] = useState<string>('');
  const route = useRouter();
  const [visibleAlarm, setVisibleAlarm] = useState<boolean>(false);

  const { isWheelTop } = useWheelState();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmitSearch = () => {
    console.log('search');
  };

  const handleVisibleAralm = () => {
    setVisibleAlarm(prev => !prev);
    if (!visibleAlarm) {
      readAlarm();
    }
  };

  const handleAlarmItem = (id: number) => {
    console.log(id);
  };

  const readAlarm = () => {
    console.log('read api');
  };

  const handleClickLogout = () => {
    localStorage.removeItem(storageKey);
  };

  const handleClickLogo = () => {
    route.push('/');
  };

  return (
    <header
      className={styles.header}
      style={{ backgroundColor: isWheelTop ? '#ffffff00' : '#ffffff' }}
    >
      <div className={`${styles.outline} flex justify-between px-[100px] items-center`}>
        <div className={'flex content-center'}>
          <Image
            src={Logo}
            alt="작가의 정원 로고"
            onClick={handleClickLogo}
            className={'cursor-pointer'}
          />
          <div className={'flex gap-12 pl-12 items-center'}>
            <Link href="/work-space">소설공방</Link>
            <Link href="/recruit">작가모집</Link>
          </div>
        </div>
        <div className={'flex gap-12 '}>
          <Notice
            visible={visibleAlarm}
            handleVisible={handleVisibleAralm}
            handleAlarmItem={handleAlarmItem}
          />
          <Link href="/" onClick={handleClickLogout}>
            로그아웃
          </Link>
        </div>
      </div>
    </header>
  );
};
