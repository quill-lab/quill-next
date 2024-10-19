import { GetOneNovelText } from '@/shared';
import { useUrlDatas } from '@/hooks/useUrlDatas';
import { useEffect, useRef, useState } from 'react';
import useNovelPublishModal from '@/stores/useNovelPublishModal';
import { useNovelChapter, useNovelRoom, useNovelTitleModal } from '@/stores';
import { useInfiniteQuery } from '@tanstack/react-query';
import { config } from '@/config/config';
import { getChatHistory, getOneNovelText } from '@/fetch/get';
import { useMutationWrap } from '@/hooks/reactQeuryWrapper';
import readJsonData from '@/shared/utils/readJsonData';
import eventBus from '@/shared/utils/eventBus';
import { ChatList } from '@/components/work-space/detail/ChatList';
import { ChatInputBox } from '@/components/work-space/detail/ChatInpuitBox';
import { NovelActionButtons } from '@/components/work-space/detail/NovelActionButtons';
import { NovelChatHeader } from '../NovelChatHeader';

export const NovelChatManager = ({ isShow = false }: { isShow: boolean }) => {
  const [allText, setAllText] = useState<GetOneNovelText[]>([]);

  const roomId = useUrlDatas<number>('room');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const novelPublishModal = useNovelPublishModal();
  const novelTitleModel = useNovelTitleModal();
  const novelRoom = useNovelRoom();
  const novelChapter = useNovelChapter();

  const { data, isSuccess, fetchNextPage } = useInfiniteQuery({
    queryKey: [
      config.apiUrl.getChatHistory({
        chapterId: novelRoom.lastChapterId,
        chunkSize: config.pageSize,
        pageNo: 1,
      }),
    ],
    queryFn: ({ pageParam = 1 }) =>
      getChatHistory({
        chapterId: novelRoom.lastChapterId,
        chunkSize: config.pageSize,
        pageNo: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data?.texts?.length > 0 ? allPages.length + 1 : null,
  });

  const { mutate: getNewChatDetail } = useMutationWrap({
    mutationFn: getOneNovelText,
    onSuccess(res) {
      setAllText(prevState => [...prevState, res.data]);
    },
  });

  const { mutate: getUpdateChatDetail } = useMutationWrap({
    mutationFn: getOneNovelText,
    onSuccess(res) {
      const text = allText.find(text => text.id === res.data.id);
      setAllText(prevState =>
        prevState.map(text => (text.id === res.data.id ? { ...text, ...res.data } : text))
      );
    },
  });

  const handleNewMessage = (res: any) => {
    const { textId } = readJsonData(res);
    getNewChatDetail(textId);
  };

  const handleUpdateMessage = (res: any) => {
    const { textId } = readJsonData(res);
    getUpdateChatDetail(textId);
  };

  useEffect(() => {
    eventBus.on(config.socketEventNM.updateChat, handleUpdateMessage);
    return () => eventBus.off(config.socketEventNM.updateChat, handleUpdateMessage);
  }, [handleUpdateMessage, roomId]);

  useEffect(() => {
    eventBus.on(config.socketEventNM.newChat, handleNewMessage);
    return () => eventBus.off(config.socketEventNM.newChat, handleNewMessage);
  }, [handleNewMessage, roomId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [allText]);

  useEffect(() => {
    if (isSuccess && data?.pages?.length > 0) {
      const chatsRes = data.pages.map(page => page.data);
      const chatList = chatsRes.flatMap(res => res.texts);
      setAllText(chatList);
    }
  }, [data?.pages, isSuccess]);

  return (
    <div className={`flex flex-col w-full mt-2 ${isShow ? 'flex' : 'hidden'}`}>
      <NovelChatHeader title={novelChapter.title} onEdit={novelTitleModel.show} />
      <ChatList chats={allText} chatContainerRef={chatContainerRef} />
      <ChatInputBox lastNovelNo={novelRoom.lastChapterId} />
      <NovelActionButtons onNext={fetchNextPage} onPublish={novelPublishModal.show} />
    </div>
  );
};
