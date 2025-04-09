'use client';

import React from 'react';

import { Completed } from '@/components/Completed/Completed';
import { CompletedLogoTextHeader } from '@/components/CompletedLogoTextHeader/CompletedLogoTextHeader';

import styles from './complete.module.scss';
import { useRouter } from 'next/navigation';

const CreatedUser = () => {
  const route = useRouter();
  const handleLeftButton = () => {
    route.replace('/work-space/create');
  };

  const handleRightButton = () => {
    route.replace('/work-space');
  };

  return (
    <div className={styles.Container}>
      <Completed
        leftButtonLabel="소설공방 개설"
        leftButtonDescription="(대표작가로 진행)"
        rightButtonLabel="소설공방 참여"
        rightButtonDescription="(참여작가로 진행)"
        handleLeftButton={handleLeftButton}
        handleRightButton={handleRightButton}
      >
        <CompletedLogoTextHeader
          title="회원가입을 진심으로 축하드립니다 :)"
          description="작가의 정원을 통해 여러분의 상상력을 맘껏 펼쳐보세요."
        />
      </Completed>
    </div>
  );
};

export default CreatedUser;
