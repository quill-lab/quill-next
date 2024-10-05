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
// import { restrictToVerticalAxis } from '@dnd-kit/modifiers'; //uninstall but, interesting information
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';
import { ReactElement, useEffect, useId, useState } from 'react';

import { config } from '@/config/config';
import { novelJoinWriteList } from '@/fetch/get';
import { novelWriterSequence } from '@/fetch/put';
import { NovelJoinWriteList } from '@/shared';
import { useMutationWrap, useQueryWrap } from '@/hooks/reactQeuryWrapper';
import { useUrlDatas } from '@/hooks/useUrlDatas';

import DndItem from '../DndItem/DndItem';
import st from './WriterManagerBox.module.scss';

export default function WriterManagerBox(): ReactElement {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const roomId = useUrlDatas<number>('room');
  const id: string = useId();
  const [modifyMode, setModifyMode] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const queryClient = useQueryClient();
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
  const [data, setData] = useState<NovelJoinWriteList[]>([]);
  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    setData(writerList.data.writers);
  }, [isSuccess]);
  const modifyCancel = (): void => {
    setModifyMode(false);
    setData(writerList?.data?.writers ?? []);
  };
  const doModify = () => {
    setModifyMode(true);
  };
  const handleDragStart = (event: DragStartEvent) => {
    if (!event) {
      setActiveId(null);
    }
    setActiveId(event.active.id);
  };
  const onDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
    handleDragEnd(e);
  };
  const complete = () => {
    writerSequence.mutate({
      novelRoomId: roomId,
      writerIdSeq: data.map(i => i.id),
    });
  };
  const handleDragEnd = (event: DragEndEvent): void => {
    if (!writerList) {
      return;
    }
    const { active, over } = event;
    if (over === null) {
      return;
    }
    if (active.id !== over.id) {
      const old = data.findIndex(i => i.id === active.id);
      const newA = data.findIndex(i => i.id === over.id);
      setData(arrayMove(data, old, newA));
    }
  };
  return (
    <DndContext
      sensors={sensors}
      id={id}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
    >
      <div className={st.column}>
        <div className={st.box}>
          <div className={st.box_title}>참여작가({data.length}/5)</div>

          <div className={st.scrollBox}>
            <SortableContext
              disabled={!modifyMode}
              items={data ?? []}
              strategy={verticalListSortingStrategy}
            >
              {data?.map(item => (
                // 마우스가 드래그를 하면 마우스를 따라오는 것이 아닌 드래그 아이템이 놓아질 위치에 그려지는 element
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

          {/* 마우스가 드래그를 시작하면 마우스를 따라오는 오버레이 element */}
          <DragOverlay dropAnimation={null}>
            {activeId && data.length > 0 ? (
              <DndItem
                overlayMode={false}
                disabled={!modifyMode}
                {...data.find(item => item.id === activeId)}
              />
            ) : null}
          </DragOverlay>

          {!modifyMode ? (
            <button onClick={doModify} className={st.box_button} type="button">
              작가 순서 관리
            </button>
          ) : null}

          {modifyMode ? (
            <div className={st.box_btns}>
              <button type="button" onClick={complete}>
                완료
              </button>
              <button onClick={modifyCancel} type="button">
                취소
              </button>
            </div>
          ) : null}
        </div>

        <button className={st.column_btn} type="button">
          완결하기
        </button>
      </div>
    </DndContext>
  );
}
