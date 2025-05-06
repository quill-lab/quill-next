'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';

import useWheelState from '@/stores/useWheelState';

import { Notice } from '../Notice/Notice';
import { storageKey } from '@/constants';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface PageHeaderProps {
  bg?: string;
}

export const PageHeader = ({ bg = 'transparent' }: PageHeaderProps) => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();
  const [visibleAlarm, setVisibleAlarm] = useState<boolean>(false);

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
    signOut();
    router.push('/');
  };

  const handleClickLogo = () => {
    router.push('/work-space');
  };

  return (
    <header
      className={`flex w-full max-w-[1400px] justify-center items-center h-32 text-4 font-[500] bg-transparent`}
    >
      <div
        className="flex justify-between text-[#059EAF] px-[44px] w-full items-center h-16 rounded-full border border-[#059EAF] bg-gray-200 bg-opacity-50"
        style={{ backgroundColor: bg }}
      >
        <div className="w-full flex items-center gap-[44px]">
          <Image
            src={'/images/login-logo.svg'}
            alt="logo"
            width={30}
            height={30}
            onClick={handleClickLogo}
            className="cursor-pointer"
          />
          <div className="cursor-pointer" onClick={() => router.push('/main')}>
            웹소설
          </div>
          <div className="cursor-pointer" onClick={() => router.push('/work-space')}>
            소설공방
          </div>
          <div className="cursor-pointer" onClick={() => router.push('/recruit')}>
            작가모집
          </div>
        </div>
        <div className="w-full flex items-center justify-end gap-[44px]">
          <Notice
            visible={visibleAlarm}
            handleVisible={handleVisibleAralm}
            handleAlarmItem={handleAlarmItem}
          />
          <div onClick={() => router.push('/')}>내정보</div>
          <div className="cursor-pointer" onClick={handleClickLogout}>
            로그아웃
          </div>
        </div>
      </div>
    </header>
  );
};
