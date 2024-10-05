import { NovelJoinWriteList } from '@/shared';

export interface DndItemProps extends Partial<NovelJoinWriteList> {
  disabled: boolean;
  overlayMode: boolean;
}
