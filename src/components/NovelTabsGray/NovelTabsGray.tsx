import React from 'react';

import styles from './NovelTabsGray.module.scss';
import { NovelTabsGrayProps } from './type';

export const NovelTabsGray = ({ tabs, currentTab, handleCurrentTab }: NovelTabsGrayProps) => (
  <div className={styles.novelTabs}>
    {tabs.map(tab => (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div
        key={tab}
        onClick={() => handleCurrentTab(tab)}
        className={`${styles.novelTab} ${currentTab === tab ? styles.active : ''}`}
      >
        {tab}
      </div>
    ))}
  </div>
);
