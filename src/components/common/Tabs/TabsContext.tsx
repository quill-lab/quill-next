'use client';

// contexts/TabsContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface TabsContextType<T> {
  selectedTab: T;
  setSelectedTab: (tab: T) => void;
}

const TabsContext = createContext<TabsContextType<any> | undefined>(undefined);

export const TabsProvider = <T,>({
  children,
  initialTab,
}: {
  children: React.ReactNode;
  initialTab: T;
}) => {
  const [selectedTab, setSelectedTab] = useState<T>(initialTab);

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab }}>{children}</TabsContext.Provider>
  );
};

export const useTabs = <T,>() => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context as TabsContextType<T>;
};
