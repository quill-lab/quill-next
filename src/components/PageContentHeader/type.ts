import { StaticImageData } from 'next/image';

export interface PageContentHeaderProps {
  pageName: string;
  pageImage: StaticImageData;
  summary1: string;
  summary2?: string;
  backgroundColor: string;
}
