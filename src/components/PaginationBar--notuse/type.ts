import { Pagination } from '@/shared';

export interface PaginationBarProps extends Partial<Pagination> {
  type: 'white' | 'dark';
}
