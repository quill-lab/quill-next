'use client';

import React, { ReactNode } from 'react';
import { TabsProvider } from '@/components/common/Tabs/TabsContext';
import { Tabs } from '@/components/common/Tabs/Tabs';
import { TabId } from '@/components/work-space/detail/DetailedWorkSpaceTabs/constants';

type Tab = {
  label: string;
  id: TabId;
  content: ReactNode;
};

interface DetailedWorkSpaceTabProps {
  tabs: Tab[];
}

export const DetailedWorkSpaceTab = ({ tabs }: DetailedWorkSpaceTabProps) => {
  return (
    <TabsProvider<TabId> initialTab="work-info">
      <Tabs<TabId> tabs={tabs} />
    </TabsProvider>
  );
};
