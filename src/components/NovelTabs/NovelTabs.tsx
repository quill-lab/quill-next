import React from 'react';

import styles from './NovelTabs.module.scss';
import { NobelTabsProps } from './type';

export const NovelTabs = ({ tabs, currentTab, handleCurrentTab }: NobelTabsProps) => (
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
