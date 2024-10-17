import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useId, useState } from 'react';

import { config } from '@/config/config';
import { novelJoinWriteList } from '@/fetch/get';
import { novelWriterSequence } from '@/fetch/put';
import { NovelJoinWriteList } from '@/shared';
import { useMutationWrap, useQueryWrap } from '@/hooks/reactQeuryWrapper';
import { useUrlDatas } from '@/hooks/useUrlDatas';

import DndItem from '../../DndItem/DndItem';

export const WriterOrderManager = () => {
  const roomId = useUrlDatas<number>('room');
  const id: string = useId();

  const [modifyMode, setModifyMode] = useState(false);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [writers, setWriters] = useState<NovelJoinWriteList[]>([]);

  const {
    data: writerList,
    isSuccess,
    refetch,
  } = useQueryWrap({
    queryKey: [config.apiUrl.novelJoinWriterList, roomId],
    queryFn: () => novelJoinWriteList(roomId),
    retryOnMount: false,
  });

  const writerSequence = useMutationWrap({
    mutationKey: [config.apiUrl.novelWriterSequence],
    mutationFn: novelWriterSequence,
    onSuccess() {
      setModifyMode(false);
      refetch();
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (isSuccess) {
      setWriters(writerList.data.writers);
    }
  }, [isSuccess, writerList]);

  const startModification = () => setModifyMode(true);

  const cancelModification = () => {
    setModifyMode(false);
    setWriters(writerList?.data?.writers ?? []);
  };

  const handleComplete = () => {
    writerSequence.mutate({
      novelRoomId: roomId,
      writerIdSeq: writers.map(i => i.id),
    });
  };

  const handleDragStart = (event: DragStartEvent) => setActiveId(event?.active?.id ?? null);

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = writers.findIndex(i => i.id === active.id);
      const newIndex = writers.findIndex(i => i.id === over.id);
      setWriters(arrayMove(writers, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      id={id}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col items-center mt-18">
        <div className="flex flex-col items-center w-[264px] h-[462px] rounded-[20px] bg-white shadow-md">
          <div className="flex items-center justify-center w-full h-[52px] text-gray-900 text-[16px] font-normal">
            참여 작가 ({writers.length}/5)
          </div>

          <div className="w-full overflow-y-auto">
            <SortableContext
              disabled={!modifyMode}
              items={writers ?? []}
              strategy={verticalListSortingStrategy}
            >
              {writers.map(item => (
                <DndItem
                  {...item}
                  overlayMode={false}
                  disabled={!modifyMode}
                  id={item.id}
                  key={item.id}
                />
              ))}
            </SortableContext>
          </div>

          <DragOverlay dropAnimation={null}>
            {activeId && writers.length > 0 && (
              <DndItem
                overlayMode={false}
                disabled={!modifyMode}
                {...writers.find(item => item.id === activeId)}
              />
            )}
          </DragOverlay>

          {modifyMode ? (
            <div className="flex justify-between w-full h-[56px] mt-auto">
              <button
                type="button"
                onClick={handleComplete}
                className="flex flex-1 items-center justify-center bg-blue1 rounded-bl-[20px] text-white text-[14px] font-medium cursor-pointer"
              >
                완료
              </button>
              <button
                onClick={cancelModification}
                type="button"
                className="flex flex-1 items-center justify-center bg-white rounded-br-[20px] border-[0.5px] border-gray-1 text-gray6 text-[14px] font-medium cursor-pointer"
              >
                취소
              </button>
            </div>
          ) : (
            <button
              onClick={startModification}
              className="flex items-center justify-center w-full h-[56px] mt-auto rounded-b-[20px] text-blue-500 text-[14px] font-medium cursor-pointer text-blue2 bg-neutral"
              type="button"
            >
              작가 순서 관리
            </button>
          )}
        </div>
      </div>
    </DndContext>
  );
};
