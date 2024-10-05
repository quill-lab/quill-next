import { CusSelectBoxGreenProps } from '../CusSelectBoxGreen/type';

export interface NovelTabsGreenAndSelectProps extends CusSelectBoxGreenProps {
  tabs: string[];
  currentTab: string;
  handleCurrentTab: (tab: string) => void;
}
