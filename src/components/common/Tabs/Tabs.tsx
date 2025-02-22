import React from 'react';
import { useTabs } from './TabsContext';

interface Tab<T> {
  label: string;
  id: T;
  content: React.ReactNode;
}

interface TabsProps<T> {
  tabs: Tab<T>[];
}

export const Tabs = <T,>({ tabs }: TabsProps<T>) => {
  const { selectedTab, setSelectedTab } = useTabs<T>();

  return (
    <div>
      <div className="flex gap-4">
        {tabs.map(tab => (
          <button
            key={tab.id as string}
            className={`px-16 py-4 rounded-t-[20px] text-sm bg-[white] bg-opacity-80 grow shrink-0 ${
              selectedTab === tab.id ? 'bg-[white] bg-opacity-[100]' : ''
            }`}
            onClick={() => setSelectedTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-2">
        {tabs.map(tab =>
          selectedTab === tab.id ? <div key={tab.id as string}>{tab.content}</div> : null
        )}
      </div>
    </div>
  );
};
