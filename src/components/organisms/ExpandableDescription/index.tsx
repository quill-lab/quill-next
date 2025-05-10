'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useWriting } from '@/stores/useWriting';
import callApi from '@/shared/utils/fetchWrapper';
import { useSession } from 'next-auth/react';
import { useParams, useSearchParams } from 'next/navigation';
import { Member } from '@/shared';

const ExpandableDescription = ({
  title,
  description,
  adminAccount,
}: {
  title: string;
  description: string;
  adminAccount: Member;
}) => {
  const { data: session } = useSession();
  const params = useParams();
  const roomId = params?.roomId;
  const searchParams = useSearchParams();
  const chapterId = searchParams?.get('episode');

  const [height, setHeight] = useState(16);
  const [isAnimating, setIsAnimating] = useState(false);
  const isDragging = useRef(false);
  const latestY = useRef(0);
  const { setDescription, setIsSaving } = useWriting();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    latestY.current = e.clientY;
    setIsAnimating(false);
    e.preventDefault(); // 드래그시 텍스트 선택 방지
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const diffY = e.clientY - latestY.current;
    latestY.current = e.clientY;

    setHeight(prevHeight => {
      const newHeight = Math.min(Math.max(prevHeight + diffY, 16), 300);
      return newHeight;
    });
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      setIsAnimating(true);
      isDragging.current = false;
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const isExpanded = height > 16;

  const debouncedSave = useCallback(
    (contentToSave: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(async () => {
        if (!session?.user?.token) return;
        setIsSaving(true);

        await callApi({
          url: `/api/v1/novel-rooms/${roomId}/chapters/${chapterId}`,
          method: 'PATCH',
          token: session.user.token,
          body: { title, description: contentToSave },
        });

        setIsSaving(false);
      }, 5000);
    },
    [roomId, chapterId, session?.user?.token, setIsSaving]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const currentText = e.currentTarget.innerText || '';
    setDescription(currentText);
    debouncedSave(currentText);
  };

  return (
    <motion.div
      animate={{ height, backgroundColor: isExpanded ? '#FFFFFF' : '#077D8A' }}
      transition={isAnimating ? { type: 'spring', stiffness: 200, damping: 20 } : { duration: 0 }}
      className="flex flex-col justify-between items-center w-full rounded-bl-[10px] rounded-br-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden"
      style={{ minHeight: '16px' }}
    >
      {/* 내용 */}
      {isExpanded && (
        <div className="py-[12px] px-[32px] text-black w-full flex-1">
          <h3 className="text-[#077D8A] text-[16px] font-[500]">회차 요약</h3>
          <div
            contentEditable={adminAccount.nickname === session?.user?.name}
            suppressContentEditableWarning
            onInput={handleInput}
            className="mt-[12px] h-full text-[#2D2D2D] outline-none text-[14px] font-[500] whitespace-pre-line"
          >
            {description}
          </div>
        </div>
      )}

      {/* 항상 제일 아래에 드래그 핸들러 */}
      <div
        onMouseDown={handleMouseDown}
        className="w-full h-[16px] flex bg-[#077D8A] justify-center items-center cursor-s-resize bg-transparent"
      >
        <Image src={'/images/white-bottom-polygon.svg'} width={16} height={8} alt="resize handle" />
      </div>
    </motion.div>
  );
};

export default ExpandableDescription;
