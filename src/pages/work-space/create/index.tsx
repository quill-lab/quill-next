import { useState } from 'react';
import { useRouter } from 'next/router';
import st from './work-space.module.scss';
import WorkSpace from './work-space';
import { Tooltip, WorkspaceCreationModal } from '@/components';
import WriterRecruitment from './writer-recruitment';
import { useMutation } from '@tanstack/react-query';
import { config } from '@/config/config';
import { CreateRoom } from '@/fetch/post';
import { useCreateNovelPost } from '@/stores/useCreateNovelPost.zst';
import Image from 'next/image';
import SpeechBubble from '@/images/speech-bubble.svg';

const pageComponentsMap: Record<number, React.ReactNode> = {
  0: <WorkSpace />,
  1: <WriterRecruitment />,
};

export default function WorkSpaceCreation() {
  const route = useRouter();
  const [pageIdx, setPageIdx] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const {
    type,
    title,
    subTitle,
    category,
    novelTag,
    actor,
    summary,
    bookCover,
    postTitle,
    postContent,
    openLink,
    novelChecking,
    postChecking,
  } = useCreateNovelPost();

  const { mutate } = useMutation({
    mutationKey: [config.apiUrl.createNovelRoom],
    mutationFn: CreateRoom,
    onSuccess(res) {
      route.replace('/work-space');
    },
    onError(res) {
      console.error(res);
    },
  });

  const handleClickButton = () => {
    if (type === 1) {
      console.log('novelChecking', novelChecking);
      if (!novelChecking()) {
        setModalOpen(true);
      }

      return;
    }

    const lastIdx = Object.keys(pageComponentsMap).length - 1;

    if (pageIdx < lastIdx) {
      if (!novelChecking()) {
        setPageIdx(prev => prev + 1);
      }
    }

    if (!postChecking()) {
      setModalOpen(true);
    }
  };

  const handleClickModalConfirm = () => {
    setModalOpen(false);
    mutate({
      title: title || undefined,
      type,
      category: category || undefined,
      character: actor || undefined,
      subTitle: subTitle || undefined,
      novelTags: novelTag,
      summary: summary || undefined,
      bookCover,
      attendContent: postContent || undefined,
      attendOpenKakaoLink: openLink || undefined,
      attendTitle: postTitle || undefined,
    });
  };

  const handleClickModalCancel = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={st.container}>
        <div className={`${st.contentContainer} mt-36`}>{pageComponentsMap[pageIdx]}</div>
        <div className={'flex justify-center items-center mt-8'}>
          <button type="button" className={`${st.nextBtn} blue-btn`} onClick={handleClickButton}>
            {pageIdx === 0 ? '다음' : '완료'}
          </button>
          <div className={'relative'}>
            <Image
              className={'ml-1'}
              onMouseOver={() => setShowTooltip(true)}
              onMouseOut={() => setShowTooltip(false)}
              src={SpeechBubble}
              alt="말풍선"
            />
            <div className={'absolute bottom-14'}>
              <Tooltip
                show={showTooltip}
                position={'right'}
                tooltipText={`소설공방 개설과 동시에 소설을 함께 쓰실\n작가를 모집하는 게시글이 업로드 됩니다.`}
              />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <WorkspaceCreationModal
          nextStep={handleClickModalConfirm}
          cancel={handleClickModalCancel}
        />
      )}
    </>
  );
}
