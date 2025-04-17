'use client';

import { PageHeader } from '@/components/PageHeader/PageHeader';
import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';
import { submitJoinRecruitment, toggleLike } from './action';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'react-toastify';

interface RecruitDetailTemplateProps {
  recruitData: {
    id: string;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
    persisted_at: Date | null;
    title: string | null;
    content: string | null;
    link: string | null;
    like: number;
    view: number;
    contributor_group_id: string | null;
    author_id: string | null;
    author: { name: string };
    contributor_group: {
      max_contributor_count: number;
      contributor_count: number;
      novels: { title: string };
    };
    isLike: boolean;
  };
}

const RecruitDetailTemplate = ({ recruitData }: RecruitDetailTemplateProps) => {
  const [isLiked, setIsLiked] = useState(recruitData.isLike);
  const [likeCount, setLikeCount] = useState(recruitData.like);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const { data: session } = useSession();
  const router = useRouter();
  const detailInfo: {
    key: '소설 제목' | '대표 작가' | '작가 정원' | '소설공방 개설일';
    content: string;
  }[] = [
    { key: '소설 제목', content: recruitData.contributor_group.novels.title },
    { key: '대표 작가', content: recruitData.author.name },
    {
      key: '작가 정원',
      content: `${recruitData.contributor_group.contributor_count}/${recruitData.contributor_group.max_contributor_count}`,
    },
    {
      key: '소설공방 개설일',
      content: recruitData.created_at
        ? dayjs(recruitData?.created_at).format('YYYY.MM.DD')
        : '2024.03.05',
    },
  ];

  const handleLikeToggle = async () => {
    if (!session?.user?.id) return;

    setIsLiked(prev => !prev);
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));

    try {
      await toggleLike(session.user.id, recruitData.id);
    } catch (error) {
      setIsLiked(prev => !prev);
      setLikeCount(prev => (isLiked ? prev + 1 : prev - 1));
      console.error('좋아요 토글 중 오류 발생:', error);
    }
  };

  const handleSubmitJoinRecruitment = async () => {
    const result = await submitJoinRecruitment(
      session?.user?.id,
      recruitData.id,
      session?.user?.email
    );
    if (result?.statusCode === 400) {
      toast.error('자신의 모집 공고에는 참가를 할 수 없습니다.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full px-[16px] flex flex-col items-center">
        <PageHeader bg="rgba(246, 248, 248, 0.50)" />
      </div>

      <div className="flex-grow flex justify-center w-full px-[8px]">
        <div className="w-full max-w-[600px] flex flex-col items-start gap-[32px]">
          <div>
            <div className="flex items-center gap-[16px]">
              <div className="gap-[4px] flex items-center">
                <Image src={'/images/view-icon.svg'} width={24} height={12} alt="view" />
                <p className="text-[#2d2d2d] text-[14px] font-[400] font-spoqa">
                  {recruitData.view}
                </p>
              </div>
              <div className="gap-[4px] flex items-center">
                <Image src={'/images/like-icon.svg'} width={16} height={14} alt="like" />
                <p className="text-[#2d2d2d] text-[14px] font-[400] font-spoqa">
                  {recruitData.like}
                </p>
              </div>
            </div>

            <div>
              <h2 className="mt-[16px] text-[#2d2d2d] text-[28px] font-[700] font-spoqa">
                {recruitData.title}
              </h2>
              <p className="mt-[4px] text-[#959595] text-[14px] font-[400] font-spoqa">
                {recruitData.created_at
                  ? dayjs(recruitData?.created_at).format('YYYY.MM.DD')
                  : '2024.03.05'}
              </p>
            </div>
          </div>

          <div className="py-[16px] gap-[32px] flex flex-col">
            {detailInfo.map(info => (
              <div className="flex gap-[16px]">
                <p className="text-[#2d2d2d] font-spoqa text-[16px] font-[500]">{info.key}</p>
                <p className="text-[#6C6C6C] text-[16px] font-[400] font-spoqa">{info.content}</p>
              </div>
            ))}

            <div className="max-w-[600px] py-[16px] flex flex-col gap-[16px]">
              <p className="text-[#2D2D2D] text-[16px] font-[500] font-spoqa">내용</p>
              <p className="text-[#6C6C6C] text-[16px] font-[400] font-spoqa leading-[26px] resize-none">
                {recruitData.content}
              </p>
            </div>

            <div className="py-[16px]">
              <p className="text-[#2D2D2D] font-spoqa text-[16px] font-[500]">오픈채팅링크</p>
              <p className="text-[#6C6C6C] font-[500] text-[16px]">{recruitData.link}</p>
            </div>
          </div>

          <div className="w-full flex gap-[16px] justify-center items-center">
            <button
              onClick={handleLikeToggle}
              className="flex items-center gap-[8px] bg-[#C9C9C9] rounded-[62px] py-[16px] px-[20px]"
            >
              <Image
                src={isLiked ? '/images/like-icon.svg' : '/images/not-like-icon.svg'}
                width={16}
                height={14}
                alt="like"
              />
              <p className="text-[#fff] text-[14px] font-[400] font-spoqa">{likeCount}</p>
            </button>

            <Dialog>
              <DialogTrigger className="bg-[#059EAF] rounded-[100px] py-[16px] px-[72px] text-[#fff] text-[14px] font-[500] font-spoqa">
                참여신청
              </DialogTrigger>
              <DialogOverlay className="bg-[#252525CC]">
                <DialogContent
                  className="p-0 sm:max-w-md bg-[#fff] flex flex-col items-center border-none"
                  style={{ borderRadius: '10px' }}
                >
                  <div className="text-center px-[60px] py-[66px]">
                    <h3 className="text-[#2D2D2D] text-[20px] font-[500] font-spoqa">
                      {recruitData.contributor_group.novels.title}
                    </h3>
                    <p className="text-[#6C6C6C] text-[14px] font-[400] font-spoqa">
                      소설공방 작가 참여를 신청하시겠습니까?
                    </p>
                  </div>
                  <div className="flex w-full">
                    <DialogClose
                      className="w-full py-[16px] bg-[#059EAF] text-[#fff] rounded-bl-[10px]"
                      onClick={handleSubmitJoinRecruitment}
                    >
                      확인
                    </DialogClose>
                    <DialogClose className="w-full py-[16px] bg-[#FFF] text-[#959595] border border-[0.5px] border-[#D9D9D9] rounded-br-[10px]">
                      취소
                    </DialogClose>
                  </div>
                </DialogContent>
              </DialogOverlay>
            </Dialog>

            {/* <Dialog>
              <DialogTrigger className="bg-[#059EAF] rounded-[100px] py-[16px] px-[72px] text-[#fff] text-[14px] font-[500] font-spoqa">
                참여신청
              </DialogTrigger>
              <DialogContent className="bg-[#fff] opacity-1 rounded-[10px]">
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account and
                    remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog> */}
            {/* <button
              onClick={handleSubmitJoinRecruitment}
              className="bg-[#059EAF] rounded-[100px] py-[16px] px-[72px] text-[#fff] text-[14px] font-[500] font-spoqa"
            >
              참여신청
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitDetailTemplate;
