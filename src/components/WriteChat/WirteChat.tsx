import Image from 'next/image';
import { ReactElement } from 'react';

import { config } from '@/config/config';
import { chatComplete } from '@/fetch/put';
import { GetOneNovelText } from '@/shared';
import { useMutationWrap } from '@/hooks/reactQeuryWrapper';
import lockIcon from '@/images/lock.svg';
import unLockIcon from '@/images/unlock.svg';

import st from './WriteChat.module.scss';

const chatStatus = {
  temp: '임시저장',
  complete: '완료',
} as const;
export default function WriteChat({
  chapterId,
  content,
  createdAt,
  id,
  status,
  updatedAt,
}: GetOneNovelText): ReactElement {
  const chatCmp = useMutationWrap({
    mutationKey: [config.apiUrl.chatComplete(id)],
    mutationFn: chatComplete,
  });
  return (
    <div className={st.chat}>
      <div className={st.chat_bar}>
        <p className={st.chat_nick}>닉네임</p>
        <p className={st.chat_status}>[{chatStatus[status]}]</p>
        <p className={st.chat_date}>{updatedAt}</p>
        <button
          type="button"
          disabled={status === 'complete'}
          onClick={() => {
            chatCmp.mutate({ chatId: id });
          }}
        >
          <Image src={status === 'complete' ? lockIcon : unLockIcon} alt="자물쇠 아이콘" />
        </button>
      </div>
      <p className={st.chat_content}>{content}</p>
    </div>
  );
}
