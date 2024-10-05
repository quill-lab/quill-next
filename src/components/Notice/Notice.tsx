/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image';
import React from 'react';

import CloseDarkIcon from '@/images/close-dark.svg';
import CloseGreyIcon from '@/images/close-grey.svg';

import styles from './Notice.module.scss';
import { alarmAction, NoticeAlarm, NoticeAlarmForAction, NoticeProps } from './type';

export const Notice = ({ visible, handleVisible, handleAlarmItem }: NoticeProps) => {
  const isDot = true;
  const alarmList: NoticeAlarm[] = [
    {
      id: 0,
      created_at: '22023-10-23',
      title: '재벌집 막내아들 10화 머슴',
      user: '아얀',
      action: alarmAction.comment,
      description: '아얀님 글 좋네요.',
      is_read: false,
    },
    {
      id: 1,
      created_at: '22023-10-23',
      title: '몰라몰라',
      user: '아얀',
      action: alarmAction.like,
      is_read: true,
    },
  ];

  const alarmListForAction: NoticeAlarmForAction[] = alarmList.map(alarm => {
    let actionDescription = '';
    if (alarm.action === alarmAction.like) {
      actionDescription = '을 좋아합니다.';
    } else if (alarm.action === alarmAction.comment) {
      actionDescription = '에 댓글을 남겼습니다.';
    } else if (alarm.action === alarmAction.reject) {
      actionDescription = '참여가 반려 되었습니다.';
    } else {
      actionDescription = '참여가 승인 되었습니다.';
    }
    return { ...alarm, actionDescription };
  });

  return (
    <div className={styles.alarmContainer}>
      <span className={`${styles.alarm} ${isDot && styles.alarmOn}`} onClick={handleVisible}>
        알림
      </span>
      {visible && (
        <div className={styles.alarmBox}>
          {alarmListForAction.length === 0 ? (
            <span>새로운 알람이 없습니다.</span>
          ) : (
            <ul className={styles.alarmList}>
              {alarmListForAction.map(
                ({
                  id,
                  user,
                  title,
                  is_read,
                  actionDescription,
                  created_at,
                  description,
                }: NoticeAlarmForAction) => (
                  <li
                    key={`alarm-list-${id}`}
                    className={`${styles.alarmItem} ${is_read && styles.read}`}
                  >
                    <div className={styles.alarmItemLeft}>
                      <div className={styles.alarmItemLeftTitleWrap}>
                        <strong>{user}</strong>
                        <span> 님이 </span>
                        <strong className={styles.alarmItemLeftTitle}>{title}</strong>
                        <span> {actionDescription}</span>
                      </div>
                      {description && (
                        <span className={styles.alarmItemLeftDescription}>{description}</span>
                      )}
                      <span className={styles.alarmItemLeftDate}>{created_at}</span>
                    </div>
                    <div className={styles.alarmItemRight} onClick={() => handleAlarmItem(id)}>
                      <span>{is_read ? '읽음' : '안읽음'}</span>
                      <Image src={is_read ? CloseGreyIcon : CloseDarkIcon} alt="close-icon" />
                    </div>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
