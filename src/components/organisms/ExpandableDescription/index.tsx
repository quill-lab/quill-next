'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const [isExpanded, setIsExpanded] = useState(false);
  const { setDescription, setIsSaving } = useWriting();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

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
      animate={{
        height: isExpanded ? 'auto' : '16px',
        backgroundColor: isExpanded ? '#FFFFFF' : '#077D8A',
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="flex flex-col justify-between items-center w-full rounded-bl-[10px] rounded-br-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden"
      style={{ minHeight: '16px' }}
    >
      {/* 내용 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="py-[12px] px-[32px] text-black w-full flex-1"
          >
            <div
              contentEditable={adminAccount.nickname === session?.user?.name}
              suppressContentEditableWarning
              onInput={handleInput}
              className="mt-[12px] h-full text-[#2D2D2D] outline-none text-[14px] font-[500] whitespace-pre-line"
            >
              {description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 토글 버튼 */}
      <button
        onClick={toggleExpanded}
        className="w-full h-[16px] flex bg-[#077D8A] justify-center items-center cursor-pointer hover:bg-[#066a75] transition-colors"
      >
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <Image
            src={'/images/white-bottom-polygon.svg'}
            width={16}
            height={8}
            alt="toggle button"
          />
        </motion.div>
      </button>
    </motion.div>
  );
};

export default ExpandableDescription;
