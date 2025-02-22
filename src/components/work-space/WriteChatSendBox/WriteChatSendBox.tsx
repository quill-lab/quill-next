'use client';

import Image from 'next/image';
import { KeyboardEvent, ReactElement, useRef, useState } from 'react';

import { config } from '@/config/config';
import { newNovelText } from '@/fetch/post';
import { useMutationWrap } from '@/hooks/reactQeuryWrapper';
import chatSendPlane from '@/images/chat-send-plane.svg';

import st from './WriteChatSendBox.module.scss';

interface WriteChatSendBoxProps {
  lastNovelNo: number;
  isWritable: boolean | undefined | null;
}

export const WriteChatSendBox = ({ lastNovelNo, isWritable }: WriteChatSendBoxProps) => {
  const { mutate: sendNewChat } = useMutationWrap({
    mutationKey: [config.apiUrl.newNovelText],
    mutationFn: newNovelText,
  });

  const [text, setText] = useState('');

  const isSending = useRef(isWritable ?? false);

  const handleSendText = () => {
    if (lastNovelNo === 0 || text.trim() === '' || isSending.current) return; // 챕터 번호가 0이면 전송하지 않음

    isSending.current = true;
    sendNewChat(
      { content: text, chapterId: lastNovelNo },
      {
        onSuccess: () => {
          setText('');
        },
        onSettled: () => {
          isSending.current = false;
        },
      }
    );
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendText();
    }
  };

  return (
    <div className="flex flex-row w-full h-[120px] mt-[32px] rounded-[10px] bg-transparent shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <textarea
        value={text}
        onKeyDown={handleKeyDown}
        onChange={event => setText(event.target.value)}
        className="flex-1 resize-none rounded-l-[10px] border-none outline-none p-[16px_32px]"
        disabled={!isWritable}
        defaultValue={!isWritable ? '현재 작성 순서가 아닙니다.' : ''}
      />
      <button
        type="button"
        onClick={handleSendText}
        disabled={isSending?.current}
        className="flex items-center justify-center w-[84px] h-full bg-blue-500 rounded-r-[10px] border-none outline-none cursor-pointer hover:scale-110 transition-transform"
      >
        <Image src={chatSendPlane} alt="작성한 소설 채팅 보내기 버튼" />
      </button>
    </div>
  );
};
