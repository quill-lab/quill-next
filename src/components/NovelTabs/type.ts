export interface NobelTabsProps {
  tabs: string[];
  currentTab: string;
  handleCurrentTab: (tab: string) => void;
}
