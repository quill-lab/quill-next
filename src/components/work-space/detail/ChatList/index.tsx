import React, { useEffect } from 'react';
import { GetOneNovelText } from '@/shared';
import Skel from '@/components/Skel/Skel';
import WriteChat from '@/components/WriteChat/WirteChat';

export const ChatList = ({
  chats,
  chatContainerRef,
}: {
  chats: GetOneNovelText[];
  chatContainerRef: React.RefObject<HTMLDivElement>;
}) => {
  // 컴포넌트가 마운트되거나 채팅이 업데이트될 때 스크롤을 아래로 이동
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]); // chats가 변경될 때마다 스크롤을 이동

  return (
    <div
      ref={chatContainerRef}
      className="flex flex-col rounded-[10px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-full h-[500px] mt-4 py-4 overflow-y-auto"
    >
      {chats.length === 0 ? (
        <Skel sx={{ width: '100%', height: 100 }} />
      ) : (
        chats.map(chat => <WriteChat {...chat} key={chat.id} />)
      )}
    </div>
  );
};
