'use client';

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Image from 'next/image';
import { Member } from '@/shared';

interface ContributerListProps {
  members: Member[];
}

const ContributerList = ({ members }: ContributerListProps) => {
  const [draggedMembers, setDraggedMembers] = useState(members);

  // 드래그가 끝난 후 순서 변경 함수
  const handleOnDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    // 순서가 바뀌지 않은 경우
    if (destination.index === source.index) return;

    const updatedMembers = Array.from(draggedMembers);
    const [removed] = updatedMembers.splice(source.index, 1);
    updatedMembers.splice(destination.index, 0, removed);

    setDraggedMembers(updatedMembers);
  };

  return (
    <div
      style={{
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      }}
      className="w-full relative mt-[70px] h-[468px] bg-[#fff] rounded-[20px] flex flex-col items-center"
    >
      <div className="py-[16px]">
        <p className="text-[#2D2D2D] text-[16px] font-[400]">참여 작가 (5/5)</p>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="members-list">
          {provided => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="pt-[21.5px] pl-[32px] flex flex-col gap-[24px] items-left w-full h-full"
            >
              {draggedMembers.map((member, index) => (
                <Draggable key={member.id} draggableId={member.id.toString()} index={index}>
                  {provided => (
                    <div
                      className="flex gap-[12px]"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Image src={'/images/avatar.png'} width={24} height={24} alt="avatar" />
                      <p>{member.nickname}</p>
                      {member.role === 'MAIN' && (
                        <Image
                          src={'/images/novel-room-admin.svg'}
                          width={16}
                          height={16}
                          alt="admin"
                        />
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button className="w-full stiky bottom-0 left-0 bg-[#F8F8F8] py-[20px] text-center text-[#059EAF] text-[14px] font-[500] font-spoqa rounded-bl-[20px] rounded-br-[20px]">
        작가 순서 관리
      </button>
    </div>
  );
};

export default ContributerList;
