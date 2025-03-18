'use client';

import { useCreateNovelPost } from '@/stores';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { config } from '@/config/config';
import { createCharacter, createRecruitments, CreateRoom } from '@/fetch/post';
import WorkSpace from '@/app/work-space/create/work-space';
import WriterRecruitment from '@/app/work-space/create/writer-recruitment';
import Image from 'next/image';
import SpeechBubble from '@/images/speech-bubble.svg';
import st from '@/app/work-space/create/work-space.module.scss';
import { Tooltip, WorkspaceCreationModal } from '@/components';
import { CreateRecruitments, CreateRoomArg } from '@/shared';
import { useSession } from 'next-auth/react';

const pageComponentsMap: Record<number, React.ReactNode> = {
  0: <WorkSpace />,
  1: <WriterRecruitment />,
};

export default function WorkSpaceCreateTemplate() {
  const route = useRouter();
  const { data: session } = useSession();
  const [pageIdx, setPageIdx] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const {
    type,
    title,
    subTitle,
    category,
    novelTag,
    summary,
    bookCover,
    postTitle,
    postContent,
    openLink,
    novelChecking,
    postChecking,
  } = useCreateNovelPost();

  const { mutateAsync: createRoom, data: createdRoom } = useMutation({
    mutationKey: [config.apiUrl.createNovelRoom],
    mutationFn: (data: { body: CreateRoomArg; token: string }) => CreateRoom(data.body, data.token),
    onSuccess(res) {
      return res;
    },
    onError(res) {
      console.error(res);
    },
  });

  const { mutateAsync: createRecruitmentsByRoomId, data: createdRecruitments } = useMutation({
    mutationKey: [config.apiUrl.createRecruitments],
    mutationFn: (data: { roomId: string; body: CreateRecruitments; token: string }) =>
      createRecruitments(data.roomId, data.body, data.token),
    onSuccess(res) {
      return res;
    },
    onError(res) {
      console.error(res);
    },
  });

  const handleClickButton = () => {
    if (type === 1) {
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

  const handleClickModalConfirm = async () => {
    setModalOpen(false);
    const createdRoom = await createRoom({
      body: {
        title: title,
        maxContributors: type,
        category: category,
        description: subTitle,
        tags: novelTag,
        synopsis: summary || null,
        coverImage: bookCover || null,
      },
      token: session?.user?.token!,
    });

    const createdRecruitment = await createRecruitmentsByRoomId({
      roomId: createdRoom.id,
      body: {
        title: postTitle,
        content: postContent,
        link: openLink,
      },
      token: session?.user?.token!,
    });

    console.log(createdRecruitment);
    route.replace('/work-space/create/complete');
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
