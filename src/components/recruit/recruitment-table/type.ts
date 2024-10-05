import { GetWriterWantedList } from '@/shared/';

export enum RecruitmentTableStatus {
  completed = 'completed',
  active = 'active',
}
export interface Props {
  data: GetWriterWantedList[];
  isLoading: boolean;
}
