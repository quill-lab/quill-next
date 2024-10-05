export interface NovelTabsGreenProps {
  tabs: string[];
  currentTab: string;
  handleCurrentTab: (tab: string) => void;
}
