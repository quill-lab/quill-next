'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Member } from '@/shared';

interface MobileContributerListProps {
  members: Member[];
}

const MobileContributerList = ({ members }: MobileContributerListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

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
    <motion.div
      className="block sm:hidden fixed w-full bottom-[0px] left-[0px] rounded-tl-[10px] rounded-tr-[10px] bg-[#F8F8F8] py-[8px] px-[24px] flex flex-col items-start"
      initial={{ height: 50 }} // 초기 높이
      animate={{ height: isOpen ? '280px' : '50px' }}
      transition={{ duration: 0.3 }} // 애니메이션 속도
      onClick={handleClick}
    >
      <div className="w-full flex items-center justify-between px-[24px] py-[8px]">
        <div />
        <div
          className="text-[#059EAF] text-[14px] font-[500] font-spoqa cursor-pointer"
          onClick={handleClick} // 클릭 시 슬라이딩
        >
          작가 순서 관리
        </div>
        <Image
          src={isOpen ? '/images/tooltip-down.svg' : '/images/tooltip.svg'}
          alt="tool-tip"
          width={12}
          height={10}
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <div className={`w-full text-[#2d2d2d] text-center text-[16px] py-[16px] font-[400]`}>
          참여 작가 ({members.length}/5)
        </div>

        <div className="flex flex-col gap-[16px] items-start w-full justify-center">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="members-list">
              {provided => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="pl-[24px] flex flex-col gap-[24px] items-left w-full h-full"
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
        </div>
      </div>
    </motion.div>
  );
};

export default MobileContributerList;
