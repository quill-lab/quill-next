'use client';

import { DraftText } from '@/shared/interface/chapter';
import callApi from '@/shared/utils/fetchWrapper';
import { useWriting } from '@/stores/useWriting';
import { useSession } from 'next-auth/react';
import { useParams, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

interface ChapterItemProps {
  text?: string;
  mine?: boolean;
  draftText?: DraftText;
  isEdited?: boolean;
  isWriting?: boolean;
}

const ChapterItem = ({
  text,
  draftText,
  isEdited = false,
  mine = false,
  isWriting = false,
}: ChapterItemProps) => {
  const { data: session } = useSession();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const editableRef = useRef<HTMLDivElement>(null);

  const params = useParams();
  const searchParams = useSearchParams();
  const roomId = params?.roomId;
  const chapterId = searchParams?.get('episode');
  const { setIsSaving, setDraftContent } = useWriting();

  const debouncedSave = useCallback(
    (contentToSave: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(async () => {
        if (!session?.user?.token) return;
        setIsSaving(true);

        await callApi({
          url: `/api/v1/novel-rooms/${roomId}/chapters/${chapterId}/draft-text`,
          method: 'PATCH',
          token: session.user.token,
          body: { content: contentToSave },
        });

        setIsSaving(false);
      }, 5000);
    },
    [roomId, chapterId, session?.user?.token, setIsSaving]
  );

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const currentText = e.currentTarget.innerText || '';
    setDraftContent(currentText);
    debouncedSave(currentText);
  };

  useEffect(() => {
    if (editableRef.current) {
      let combinedText = '';

      if (isEdited) {
        if (text && draftText?.content) {
          combinedText = text + draftText.content;
        } else {
          combinedText = draftText?.content ?? text ?? '';
        }
      } else {
        combinedText = draftText?.content ?? text ?? '';
      }

      editableRef.current.innerText = combinedText;
    }
  }, [isEdited, draftText?.content, text]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {isEdited ? (
        <div
          ref={editableRef}
          className={`w-full min-h-[168px] bg-[#E7F6F8] focus-within:bg-[#059EAF] focus-within:text-[#E7F6F8] focus-within:outline-none text-[14px] font-[400] leading-[22px] text-[#059EAF] px-[24px] py-[16px] rounded-[20px] ${
            mine ? 'rounded-br-[0px]' : 'rounded-bl-[0px]'
          } pt-[38px] pb-[12px] px-[32px] resize-none whitespace-pre-wrap`}
          contentEditable={true}
          onInput={handleInput}
          suppressContentEditableWarning={true}
        />
      ) : (
        <div
          className={`w-full min-h-[168px] bg-[#E7F6F8] focus-within:bg-[#059EAF] focus-within:text-[#E7F6F8] focus-within:outline-none text-[14px] font-[400] leading-[22px] text-[#059EAF] px-[24px] py-[16px] rounded-[20px] ${
            mine ? 'rounded-br-[0px]' : 'rounded-bl-[0px]'
          } pt-[38px] pb-[12px] px-[32px] resize-none whitespace-pre-wrap`}
        >
          {text}
        </div>
      )}
    </>
  );
};

export default ChapterItem;
