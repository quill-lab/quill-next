import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';

import WriteJoin from '@/components/modals/WriteJoin/WriteJoin';
import { config } from '@/config/config';
import { getWriterPostDetail } from '@/fetch/get';
import { setBoardLike, writerJoinReqest } from '@/fetch/post';
import { useMutationWrap, useQueryWrap } from '@/hooks/reactQeuryWrapper';
import { useUrlDatas } from '@/hooks/useUrlDatas';
import EyeIcon from '@/images/eye.svg';
import HeartRed from '@/images/heart-red.svg';

import styles from './recruit-post.module.scss';
import { dateChanger } from '@/shared/utils/dateChange';
import { GetWriterPostDetail } from '@/shared';

const handleJoinMessage = (data?: GetWriterPostDetail) => {
  if (!data) return { isDisable: true, message: '' };

  const { isAttend, currentAttendCnt, type } = data;

  if (isAttend) return { isDisable: true, message: '참여 신청한 공방입니다.' };
  if (currentAttendCnt === type) return { isDisable: true, message: '정원이 마감된 공방입니다.' };

  return { isDisable: false, message: '참여하기' };
};

const RecruitPost = () => {
  const postId = useUrlDatas<number>('postId');
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [isJoinDisabled, setIsJoinDisabled] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);

  const { data, refetch: refetchPostDetail } = useQueryWrap({
    queryKey: [config.apiUrl.getWriterPostDetail(postId)],
    queryFn: () => getWriterPostDetail({ roomId: postId }),
    enabled: !!postId,
    cacheTime: 0,
  });

  const novelLike = useMutationWrap({
    mutationKey: [config.apiUrl.setboardLike],
    mutationFn: setBoardLike,
    onSuccess() {
      setIsLikeClicked(true);
    },
  });

  const novelJoin = useMutationWrap({
    mutationKey: [config.apiUrl.writerJoinRequest],
    mutationFn: writerJoinReqest,
    onSuccess() {
      enqueueSnackbar('참여신청을 완료했습니다');
      setOpenModal(false);
      setIsJoinDisabled(true);
    },
    onError(err: number) {
      if (err === 409) {
        enqueueSnackbar('이미 신청한 소설공방입니다', { variant: 'error' });
      }
    },
  });

  const handleLikeClick = () => {
    novelLike.mutate({ novelRoomId: postId });
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalCancel = () => {
    setOpenModal(false);
  };

  const handleModalNextStep = () => {
    novelJoin.mutate({ novelRoomId: postId });
    if (novelJoin.isSuccess) {
      refetchPostDetail();
    }
    setOpenModal(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTools}>
          <div className={styles.headerTool}>
            <Image src={EyeIcon} alt="EyeIcon" />
            <span>{data?.data.viewCount}</span>
          </div>
          <div className={styles.headerTool}>
            <Image src={HeartRed} alt="HeartRed" />
            <span>{data?.data.hasLike}</span>
          </div>
        </div>
        <h2>{data?.data.boardTitle}</h2>
      </header>

      <main className={styles.main}>
        <ul className={styles.novelList}>
          <li className={styles.novelItem}>
            <span>소설 제목</span>
            <span>{data?.data.boardTitle}</span>
          </li>
          <li className={styles.novelItem}>
            <span>대표작가</span>
            <span>{data?.data.host.nickname}</span>
          </li>
          <li className={styles.novelItem}>
            <span>작가 정원</span>
            <span>
              {data?.data.currentAttendCnt}/{data?.data.type}
            </span>
          </li>
          <li className={styles.novelItem}>
            <span>소설공방 개설일</span>
            <span>{dateChanger(data?.data.createdAt as string | null)}</span>
          </li>
        </ul>

        <div className={styles.novelDescription}>
          <p>내용</p>
          <p>{data?.data.boardContent}</p>
        </div>

        <div className={styles.novelOpenChat}>
          <p>오픈채팅 링크</p>
          <p>{data?.data.boardOpenKakaoLink}</p>
        </div>
      </main>

      <footer className={styles.footer}>
        <button
          type="button"
          className={styles.button}
          disabled={data?.data.hasLike || isLikeClicked}
          onClick={handleLikeClick}
        >
          <Image src={HeartRed} alt="HeartRed" />
          <span>{isLikeClicked ? Number(data?.data.likeCount) + 1 : data?.data.likeCount}</span>
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={handleModalOpen}
          disabled={handleJoinMessage(data?.data).isDisable || isJoinDisabled}
        >
          {handleJoinMessage(data?.data).message}
        </button>
      </footer>

      {isOpenModal && <WriteJoin cancel={handleModalCancel} nextStep={handleModalNextStep} />}
    </div>
  );
};

export default RecruitPost;
