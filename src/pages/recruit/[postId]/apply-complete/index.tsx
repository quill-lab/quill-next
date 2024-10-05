import React from 'react';

import { Completed } from '@/components/Completed/Completed';

import styles from './complete.module.scss';

const ApplyComplete = () => {
  const completedRecruitmentData = {
    title: '재별집 막내아들',
  };

  const handleLeftButton = (): void => {
    console.log('handleLeftButton');
  };

  const handleRightButton = (): void => {
    console.log('handleRightButton');
  };

  return (
    <div className={styles.Container}>
      <Completed
        leftButtonLabel="소설공방 바로가기"
        rightButtonLabel="메인으로"
        handleLeftButton={handleLeftButton}
        handleRightButton={handleRightButton}
      >
        <header className={styles.header}>
          <h2 className={styles.headerTitle}>{completedRecruitmentData.title}</h2>
          <p className={styles.headerSubTitle}>소설공방 참여 신청이 완료 되었습니다.</p>
          <div className={styles.headerDescription}>
            <p>{`승인/반려 현황을 확인하시려면 '소설공방' 메뉴에서 확인 가능하며,`}</p>
            <p>결과를 알림으로도 발송해 드립니다.</p>
          </div>
        </header>
      </Completed>
    </div>
  );
};

export default ApplyComplete;
