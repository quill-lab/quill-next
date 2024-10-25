import { WriteChatSendBox } from '@/components';
import { useNovelWriterListStore } from '@/stores/useWriterList';

export const ChatInputBox = ({ lastNovelNo }: { lastNovelNo: number }) => {
  const { writerList } = useNovelWriterListStore();

  const loginUser = writerList.find(writer => writer.isLoginUser);

  return <WriteChatSendBox lastNovelNo={lastNovelNo} isWritable={loginUser?.currentlyWriting} />;
};
