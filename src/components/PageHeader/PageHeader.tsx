'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';

import Logo from '@/images/login-logo.svg';
import useWheelState from '@/stores/useWheelState';

import { Notice } from '../Notice/Notice';
import { SearchInput } from '../SearchInput/SearchInput';
import styles from './PageHeader.module.scss';
import { storageKey } from '@/constants';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export const PageHeader = () => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();
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
    // localStorage.removeItem(storageKey);
    signOut();
    router.push('/');
  };

  const handleClickLogo = () => {
    router.push('/work-space');
  };

  return (
    <header
      className={`flex w-full justify-center items-center h-32 text-4 font-[500] bg-transparent`}
    >
      <div className="flex justify-between text-[#059EAF] px-[100px] w-full items-center h-16 rounded-full border border-[#059EAF] bg-gray-200 bg-opacity-50">
        <div className="flex content-center">
          <Image
            src={Logo}
            alt="logo"
            width={30}
            height={30}
            onClick={handleClickLogo}
            className="cursor-pointer"
          />
          <div className="flex gap-12 pl-12 items-center">
            <Link href="/work-space">소설공방</Link>
            <Link href="/recruit">작가모집</Link>
          </div>
        </div>
        <div className="flex gap-12">
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
