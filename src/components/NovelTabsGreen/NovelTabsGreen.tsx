import React from 'react';

import styles from './NovelTabsGreen.module.scss';
import { NovelTabsGreenProps } from './type';

export const NovelTabsGreen = ({ tabs, currentTab, handleCurrentTab }: NovelTabsGreenProps) => (
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
