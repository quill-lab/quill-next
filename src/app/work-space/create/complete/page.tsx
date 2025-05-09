'use client';

import React from 'react';

import { Completed } from '@/components/Completed/Completed';
import { CompletedLogoTextHeader } from '@/components/CompletedLogoTextHeader/CompletedLogoTextHeader';

import styles from './complete.module.scss';
import { useRouter } from 'next/navigation';

const CompleteWorkSpaceCreation = ({ searchParams }: { searchParams: { room: string } }) => {
  const router = useRouter();
  const roomId = searchParams?.room;

  const handleLeftButton = (): void => {
    router.push(`/work-space/detail/${roomId}/info`);
  };

  const handleRightButton = (): void => {
    router.push('/work-space');
  };

  return (
    <div className={styles.Container}>
      <Completed
        leftButtonLabel="소설공방 바로가기"
        rightButtonLabel="메인으로"
        handleLeftButton={handleLeftButton}
        handleRightButton={handleRightButton}
      >
        <CompletedLogoTextHeader
          title="소설공방을 개설 했습니다."
          description="작가의 정원을 통해 여러분의 상상력을 맘껏 펼쳐보세요."
        />
      </Completed>
    </div>
  );
};

export default CompleteWorkSpaceCreation;
